

  UPDATE state_data
     SET co2_mt = 0
   WHERE co2_mt IS NULL;

  UPDATE state_data
     SET so2_mt = 0
   WHERE so2_mt IS NULL;

  UPDATE state_data
     SET nox_mt = 0
   WHERE nox_mt IS NULL;

/*

  SELECT * FROM public.state_greenhouse_emissions
   WHERE greenhouse_emissions IS NULL
*/   

/*

  UPDATE state_data
     SET co2_mt = 0
   WHERE co2_mt IS NULL;

*/     
   
   
   