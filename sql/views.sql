/*
SQL Views

Description:
This script will create all of the views that are used to produce the datasets for the various jsons 
	that will be created by the Flask application and returned to the dashboard

*/

--drop views if they exist
DROP VIEW IF EXISTS top_10_coal_state_stats;
DROP VIEW IF EXISTS facility_emissions_by_year;
DROP VIEW IF EXISTS facility_list;
DROP VIEW IF EXISTS state_list;
DROP VIEW IF EXISTS state_data_by_year;

-- create views for analysis, charting, drop-down lists, pop-ups and...fun

-- state list (for drop downs, and metadata for pop-ups)
	-- the view uses common table expressions (CTEs) to make things faster and more readable
CREATE VIEW state_list
AS
	  -- this CTE returns total emissions by state and year, also has a rank so we can pull
	  	-- by most recent year, or 2nd most recent year, etc.
	WITH state_facility_emissions_by_year
	  AS
	   (
		  SELECT f.state,
				 fe.year,
				 SUM(fe.emissions_mt) as total_facility_emissions,
				 RANK() OVER (PARTITION BY f.state ORDER BY fe.year DESC) AS recent_year_rank
			FROM facility_emissions fe inner join facility f
		      ON fe.facility_id = f.facility_id
		GROUP BY f.state,
				 fe.year
	   ),
	  -- this CTE returns any state that has air quality data, gets the % of good, medium and bad days
	  	-- bad days is a combination of the rest of the AQI columns
		-- also has a rank function so we can get most recent year, etc.
		 state_air_quality_by_year
	  AS 
	   (
		  SELECT aq.state,
				 aq.year,
				 RANK() OVER (PARTITION BY aq.state ORDER BY aq.year DESC) AS recent_year_rank,
				 ROUND(SUM(good_days)/(SUM(days_with_aqi)*1.00),3) * 100 AS good_days_percent,
				 ROUND(SUM(moderate_days)/(SUM(days_with_aqi)*1.00),3) * 100 AS moderate_days_percent,
				 ROUND(SUM(unhealthy_days + unhealthy_sensitive_days + very_unhealthy_days + hazardous_days)
					   /(SUM(days_with_aqi)*1.00),3) * 100 AS unhealthy_days_percent
			FROM air_quality aq
		GROUP BY aq.state,
				 aq.year
	   ),
	  -- this CTE returns any state that has a facility, and the number of facilities in that state
	     state_facility_count
	  AS
	   (
		  SELECT f.state,
				 COUNT(*) AS facility_count
			FROM facility f
		GROUP BY f.state		   
	   )
  SELECT s.state,
  		 s.state_name,
		 r.region,
		 r.region_group,
		 sfc.facility_count,
		 sfeby1.year AS year_most_recent,
		 sfeby1.total_facility_emissions AS emissions_most_recent,
		 saqby1.good_days_percent AS good_days_pct_most_recent,
		 saqby1.moderate_days_percent AS moderate_days_pct_most_recent,	
		 saqby1.unhealthy_days_percent AS unhealthy_days_pct_most_recent,
		 sfeby2.year AS year_2nd_most_recent,
		 sfeby2.total_facility_emissions AS emissions_2nd_most_recent,
		 saqby2.good_days_percent AS good_days_pct_2nd_most_recent,
		 saqby2.moderate_days_percent AS moderate_days_pct_2nd_most_recent,	
		 saqby2.unhealthy_days_percent AS unhealthy_days_pct_2nd_most_recent,		 
		 sfeby3.year AS year_3rd_most_recent,
		 sfeby3.total_facility_emissions AS emissions_3rd_most_recent,
		 saqby3.good_days_percent AS good_days_pct_3rd_most_recent,
		 saqby3.moderate_days_percent AS moderate_days_pct_3rd_most_recent,	
		 saqby3.unhealthy_days_percent AS unhealthy_days_pct_3rd_most_recent		 
    FROM state s INNER JOIN state_region sr
	  ON s.state = sr.state INNER JOIN region r
	  ON sr.region = r.region LEFT OUTER JOIN state_facility_count sfc
	  ON s.state = sfc.state LEFT OUTER JOIN state_facility_emissions_by_year sfeby1
	  ON s.state = sfeby1.state LEFT OUTER JOIN state_facility_emissions_by_year sfeby2
	  ON s.state = sfeby2.state LEFT OUTER JOIN state_facility_emissions_by_year sfeby3
	  ON s.state = sfeby3.state LEFT OUTER JOIN state_air_quality_by_year saqby1
	  ON s.state = saqby1.state LEFT OUTER JOIN state_air_quality_by_year saqby2
	  ON s.state = saqby2.state LEFT OUTER JOIN state_air_quality_by_year saqby3
	  ON s.state = saqby3.state
	  -- limit the CTE's by the rank to grab the last three years of total facility emissions
   WHERE sfeby1.recent_year_rank = 1
     AND sfeby2.recent_year_rank = 2
	 AND sfeby3.recent_year_rank = 3
     AND saqby1.recent_year_rank = 1
	 AND saqby2.recent_year_rank = 2
	 AND saqby3.recent_year_rank = 3;

-- facility list (for drop downs, and metadata for pop-ups)
CREATE VIEW facility_list
AS
  SELECT f.facility_id,
  		 f.latitude,
		 f.longitude,
  		 f.frs_id,
		 f.facility_name,
		 f.state,
		 s.state_name,
		 r.region,
		 r.region_group
    FROM facility f INNER JOIN state s
	  ON f.state = s.state INNER JOIN state_region sr
	  ON s.state = sr.state INNER JOIN region r
	  ON sr.region = r.region;
	  
-- facility emissions by year dataset (for charting)
CREATE VIEW facility_emissions_by_year
AS
  SELECT f.facility_id,
  		 f.latitude,
		 f.longitude,
  		 f.frs_id,
		 f.facility_name,
		 f.state,
		 s.state_name,
		 r.region,
		 r.region_group,
		 fe.year,
		 fe.emissions_mt
    FROM facility f INNER JOIN state s
	  ON f.state = s.state INNER JOIN state_region sr
	  ON s.state = sr.state INNER JOIN region r
	  ON sr.region = r.region INNER JOIN facility_emissions fe
	  ON f.facility_id = fe.facility_id;	  

-- simple dataset, just curious
CREATE VIEW top_10_coal_state_stats
AS
    WITH top_10_coal_states
	  AS
	   (
		  SELECT state,
				 generation_mwh
			FROM state_data
		   WHERE generation_mwh IS NOT NULL	
			 AND energy_source = 'Coal'
			 AND year = 2018
			 AND state <> 'US'
		ORDER BY generation_mwh DESC
		   LIMIT 10
	   )
  SELECT SD.state,
  		 SD.year,
		 SD.generation_mwh,
		 SD.co2_mt,
		 SD.so2_mt,
		 SD.nox_mt
	FROM top_10_coal_states TOP INNER JOIN state_data SD
	  ON TOP.state = SD.state
   WHERE energy_source = 'Coal';
   
-- State data view!
CREATE VIEW state_data_by_year
AS
    WITH state_coal_data
	  AS
	   (
		  SELECT sd.state,
				 sd.year,
				 sd.co2_mt,
				 sd.so2_mt,
				 sd.nox_mt,
				 sd.consumption,
				 sd.generation_mwh
			FROM state_data sd
		   WHERE sd.energy_source = 'Coal'		   
	   ),
		 state_geothermal_data
	  AS
	   (
		  SELECT sd.state,
				 sd.year,
				 sd.co2_mt,
				 sd.so2_mt,
				 sd.nox_mt,
				 sd.consumption,
				 sd.generation_mwh
			FROM state_data sd
		   WHERE sd.energy_source = 'Geothermal'		   
	   ),	   
		 state_geothermal_btu_data
	  AS
	   (
		  SELECT sd.state,
				 sd.year,
				 sd.co2_mt,
				 sd.so2_mt,
				 sd.nox_mt,
				 sd.consumption,
				 sd.generation_mwh
			FROM state_data sd
		   WHERE sd.energy_source = 'Geothermal (Billion Btu)'		   
	   ),	   
		 state_hydro_data
	  AS
	   (
		  SELECT sd.state,
				 sd.year,
				 sd.co2_mt,
				 sd.so2_mt,
				 sd.nox_mt,
				 sd.consumption,
				 sd.generation_mwh
			FROM state_data sd
		   WHERE sd.energy_source = 'Hydroelectric Conventional'		   
	   ),	   
		 state_ng_data
	  AS
	   (
		  SELECT sd.state,
				 sd.year,
				 sd.co2_mt,
				 sd.so2_mt,
				 sd.nox_mt,
				 sd.consumption,
				 sd.generation_mwh
			FROM state_data sd
		   WHERE sd.energy_source = 'Natural Gas'		   
	   ),	   
		 state_nuclear_data
	  AS
	   (
		  SELECT sd.state,
				 sd.year,
				 sd.co2_mt,
				 sd.so2_mt,
				 sd.nox_mt,
				 sd.consumption,
				 sd.generation_mwh
			FROM state_data sd
		   WHERE sd.energy_source = 'Nuclear'		   
	   ),	   
		 state_other_data
	  AS
	   (
		  SELECT sd.state,
				 sd.year,
				 sd.co2_mt,
				 sd.so2_mt,
				 sd.nox_mt,
				 sd.consumption,
				 sd.generation_mwh
			FROM state_data sd
		   WHERE sd.energy_source = 'Other'		   
	   ),	   
		 state_otherbio_data
	  AS
	   (
		  SELECT sd.state,
				 sd.year,
				 sd.co2_mt,
				 sd.so2_mt,
				 sd.nox_mt,
				 sd.consumption,
				 sd.generation_mwh
			FROM state_data sd
		   WHERE sd.energy_source = 'Other Biomass'		   
	   ),	   
		 state_othergas_data
	  AS
	   (
		  SELECT sd.state,
				 sd.year,
				 sd.co2_mt,
				 sd.so2_mt,
				 sd.nox_mt,
				 sd.consumption,
				 sd.generation_mwh
			FROM state_data sd
		   WHERE sd.energy_source = 'Other Gases'		   
	   ),	   
		 state_othergas_btu_data
	  AS
	   (
		  SELECT sd.state,
				 sd.year,
				 sd.co2_mt,
				 sd.so2_mt,
				 sd.nox_mt,
				 sd.consumption,
				 sd.generation_mwh
			FROM state_data sd
		   WHERE sd.energy_source = 'Other Gases (Billion Btu)'		   
	   ),	   
		 state_petro_data
	  AS
	   (
		  SELECT sd.state,
				 sd.year,
				 sd.co2_mt,
				 sd.so2_mt,
				 sd.nox_mt,
				 sd.consumption,
				 sd.generation_mwh
			FROM state_data sd
		   WHERE sd.energy_source = 'Petroleum'		   
	   ),	   
		 state_pumped_data
	  AS
	   (
		  SELECT sd.state,
				 sd.year,
				 sd.co2_mt,
				 sd.so2_mt,
				 sd.nox_mt,
				 sd.consumption,
				 sd.generation_mwh
			FROM state_data sd
		   WHERE sd.energy_source = 'Pumped Storage'		   
	   ),	   
		 state_solar_data
	  AS
	   (
		  SELECT sd.state,
				 sd.year,
				 sd.co2_mt,
				 sd.so2_mt,
				 sd.nox_mt,
				 sd.consumption,
				 sd.generation_mwh
			FROM state_data sd
		   WHERE sd.energy_source = 'Solar Thermal and Photovoltaic'		   
	   ),	   
		 state_wind_data
	  AS
	   (
		  SELECT sd.state,
				 sd.year,
				 sd.co2_mt,
				 sd.so2_mt,
				 sd.nox_mt,
				 sd.consumption,
				 sd.generation_mwh
			FROM state_data sd
		   WHERE sd.energy_source = 'Wind'		   
	   ),	   
		 state_wind_wood_data
	  AS
	   (
		  SELECT sd.state,
				 sd.year,
				 sd.co2_mt,
				 sd.so2_mt,
				 sd.nox_mt,
				 sd.consumption,
				 sd.generation_mwh
			FROM state_data sd
		   WHERE sd.energy_source = 'Wood and Wood Derived Fuels'		   
	   ),	   
		 state_total_data
	  AS
	   (
		  SELECT sd.state,
				 sd.year,
				 sd.co2_mt,
				 sd.so2_mt,
				 sd.nox_mt,
				 sd.consumption,
				 sd.generation_mwh
			FROM state_data sd
		   WHERE sd.energy_source = 'Total'		   
	   )		   
  SELECT s.state,
  		 s.state_name,
		 r.region,
		 r.region_group,
		 std.year,
		 std.generation_mwh AS generation_mwh_total,
		 sge.greenhouse_emissions,
		 rdd.heating_degree_days,
		 rdd.cooling_degree_days,
		 std.co2_mt AS co2_mt_total,
		 std.so2_mt AS so2_mt_total,
		 std.nox_mt AS nox_mt_total,
		 scd.generation_mwh AS generation_mwh_coal,
		 scd.co2_mt AS co2_mt_coal,
		 scd.so2_mt AS so2_mt_coal,
		 scd.nox_mt AS nox_mt_coal,
		 sgd.generation_mwh AS generation_mwh_geothermal,
		 sgbd.generation_mwh AS generation_mwh_geothermal_btu,
		 shd.generation_mwh AS generation_mwh_hydro,
		 snd.generation_mwh AS generation_mwh_ng,
		 snd.co2_mt AS co2_mt_ng,
		 snd.so2_mt AS so2_mt_ng,
		 snd.nox_mt AS nox_mt_ng,
		 sncd.generation_mwh AS generation_mwh_nuclear,
		 sod.generation_mwh AS generation_mwh_other,
		 sod.co2_mt AS co2_mt_other,
		 sod.so2_mt AS so2_mt_other,
		 sod.nox_mt AS nox_mt_other,
		 sobd.generation_mwh AS generation_mwh_other_biomass,
		 sogd.generation_mwh AS generation_mwh_other_gas,
		 sogbd.generation_mwh AS generation_mwh_other_gas_btu,
		 spd.generation_mwh AS generation_mwh_pumped,
		 ssd.generation_mwh AS generation_mwh_solar,
		 swd.generation_mwh AS generation_mwh_wind,
		 sptd.generation_mwh AS generation_mwh_petro,
		 sptd.co2_mt AS co2_mt_petro,
		 sptd.so2_mt AS so2_mt_petro,
		 sptd.nox_mt AS nox_mt_petro,
		 swwd.generation_mwh AS generation_mwh_wind_wood
    FROM state s INNER JOIN state_region sr
	  ON s.state = sr.state INNER JOIN region r
	  ON sr.region = r.region INNER JOIN state_total_data std
	  ON s.state = std.state LEFT OUTER JOIN state_coal_data scd
	  ON s.state = scd.state 
	 AND std.year = scd.year LEFT OUTER JOIN state_geothermal_data sgd
	  ON s.state = sgd.state 
	 AND std.year = sgd.year LEFT OUTER JOIN state_geothermal_btu_data sgbd
	  ON s.state = sgbd.state 
	 AND std.year = sgbd.year LEFT OUTER JOIN state_hydro_data shd
	  ON s.state = shd.state 
	 AND std.year = shd.year LEFT OUTER JOIN state_ng_data snd
	  ON s.state = snd.state 
	 AND std.year = snd.year LEFT OUTER JOIN state_nuclear_data sncd
	  ON s.state = sncd.state 
	 AND std.year = sncd.year LEFT OUTER JOIN state_other_data sod
	  ON s.state = sod.state 
	 AND std.year = sod.year LEFT OUTER JOIN state_otherbio_data sobd
	  ON s.state = sobd.state 
	 AND std.year = sobd.year LEFT OUTER JOIN state_othergas_data sogd
	  ON s.state = sogd.state 
	 AND std.year = sogd.year LEFT OUTER JOIN state_othergas_btu_data sogbd
	  ON s.state = sogbd.state 
	 AND std.year = sogbd.year LEFT OUTER JOIN state_pumped_data spd
	  ON s.state = spd.state 
	 AND std.year = spd.year LEFT OUTER JOIN state_solar_data ssd
	  ON s.state = ssd.state 
	 AND std.year = ssd.year LEFT OUTER JOIN state_wind_data swd
	  ON s.state = swd.state 
	 AND std.year = swd.year LEFT OUTER JOIN state_petro_data sptd
	  ON s.state = sptd.state 
	 AND std.year = sptd.year LEFT OUTER JOIN state_wind_wood_data swwd
	  ON s.state = swwd.state 
	 AND std.year = swwd.year INNER JOIN state_greenhouse_emissions sge
	  ON s.state = sge.state
	 AND std.year = sge.year INNER JOIN region_degree_days rdd
	  ON r.region = rdd.region
	 AND std.year = rdd.year;
	