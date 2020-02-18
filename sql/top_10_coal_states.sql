/*

Just looking at the top 10 states that generate the most electricity with Coal as the fuel source.

*/

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
   WHERE energy_source = 'Coal'
     
   
   