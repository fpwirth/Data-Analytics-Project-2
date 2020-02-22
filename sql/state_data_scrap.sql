
/*

  SELECT *
    FROM facility_emissions_by_year;
	
  SELECT * FROM state_greenhouse_emissions
  
  SELECT * FROM state_list ORDER BY state;
  
  SELECT * FROM region_degree_days
  
*/

/*
"Coal"
"Geothermal"
"Geothermal (Billion Btu)"
"Hydroelectric Conventional"
"Natural Gas"
"Nuclear"
"Other"
"Other Biomass"
"Other Gases"
"Other Gases (Billion Btu)"
"Petroleum"
"Pumped Storage"
"Solar Thermal and Photovoltaic"
"Total"
"Wind"
"Wood and Wood Derived Fuels"
*/


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
	   ),
		 state_air_quality_by_year
	  AS 
	   (
		  SELECT aq.state,
				 aq.year,
				 ROUND(SUM(good_days + moderate_days)/(SUM(days_with_aqi)*1.00),3) * 100 AS good_days_percent,
				 ROUND(SUM(unhealthy_days + unhealthy_sensitive_days + very_unhealthy_days + hazardous_days)
					   /(SUM(days_with_aqi)*1.00),3) * 100 AS bad_days_percent
			FROM air_quality aq
		GROUP BY aq.state,
				 aq.year
	   )	   
  SELECT s.state,
  		 s.state_name,
		 r.region,
		 r.region_group,
		 std.year,
		 RANK() OVER (PARTITION BY s.state ORDER BY std.year) AS state_year_rank,
		 saqby.good_days_percent,
		 saqby.bad_days_percent,
		 std.generation_mwh AS generation_mwh_total,
		 sge.greenhouse_emissions,
		 rdd.heating_degree_days,
		 rdd.cooling_degree_days,
		 std.co2_mt AS co2_mt_total,
		 std.so2_mt AS so2_mt_total,
		 std.nox_mt AS nox_mt_total,
		 scd.consumption AS consumption_coal,
		 scd.generation_mwh AS generation_mwh_coal,
		 scd.co2_mt AS co2_mt_coal,
		 scd.so2_mt AS so2_mt_coal,
		 scd.nox_mt AS nox_mt_coal,
		 snd.consumption AS consumption_ng,
		 snd.generation_mwh AS generation_mwh_ng,
		 snd.co2_mt AS co2_mt_ng,
		 snd.so2_mt AS so2_mt_ng,
		 snd.nox_mt AS nox_mt_ng,
		 sptd.consumption AS consumption_petro,
		 sptd.generation_mwh AS generation_mwh_petro,
		 sptd.co2_mt AS co2_mt_petro,
		 sptd.so2_mt AS so2_mt_petro,
		 sptd.nox_mt AS nox_mt_petro,		 
		 sod.generation_mwh AS generation_mwh_other,
		 sod.co2_mt AS co2_mt_other,
		 sod.so2_mt AS so2_mt_other,
		 sod.nox_mt AS nox_mt_other,
		 sobd.generation_mwh AS generation_mwh_other_biomass,
		 sobd.co2_mt AS co2_mt_other_biomass,
		 sobd.so2_mt AS so2_mt_other_biomass,
		 sobd.nox_mt AS nox_mt_other_biomass,
		 sogd.consumption AS consumption_other_gas,
		 sogd.generation_mwh AS generation_mwh_other_gas,
		 sogd.co2_mt AS co2_mt_other_gas,
		 sogd.so2_mt AS so2_mt_other_gas,
		 sogd.nox_mt AS nox_mt_other_gas,	
		 sgd.generation_mwh AS generation_mwh_geothermal,
		 sgd.co2_mt AS co2_mt_other_geothermal,
		 sgd.so2_mt AS so2_mt_other_geothermal,
		 sgd.nox_mt AS nox_mt_other_geothermal,	
		 swwd.generation_mwh AS generation_mwh_wind_wood,
		 swwd.co2_mt AS co2_mt_other_wind_wood,
		 swwd.so2_mt AS so2_mt_other_wind_wood,
		 swwd.nox_mt AS nox_mt_other_wind_wood,		 
		 sncd.generation_mwh AS generation_mwh_nuclear,
		 spd.generation_mwh AS generation_mwh_pumped,
		 ssd.generation_mwh AS generation_mwh_solar,
		 swd.generation_mwh AS generation_mwh_wind,
		 shd.generation_mwh AS generation_mwh_hydro
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
	 AND std.year = rdd.year INNER JOIN state_air_quality_by_year saqby
	  ON s.state = saqby.state
	 AND std.year = saqby.year
	 


   


	