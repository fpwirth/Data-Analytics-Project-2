/*
Get a list of the keys so i don't have to type them out in the notebook
*/
  SELECT table_name,
  		 constraint_name
    FROM information_schema.table_constraints 
	  -- only constraints that start with 'FK', to get the foreign keys
   WHERE constraint_name LIKE 'fk%'
ORDER BY constraint_name;
   