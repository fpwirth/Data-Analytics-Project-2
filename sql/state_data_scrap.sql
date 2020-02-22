
/*

  SELECT *
    FROM facility_emissions_by_year;
	
	
  SELECT * FROM state_list ORDER BY state;
  
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
	   )
  SELECT s.state,
  		 s.state_name,
		 r.region,
		 r.region_group,
		 std.year,
		 std.generation_mwh AS generation_mwh_total,
		 std.co2_mt AS co2_mt_total,
		 std.so2_mt AS so2_mt_total,
		 std.nox_mt AS nox_mt_total
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
	 AND std.year = swwd.state
	   


   


	