
  --fixing missing facility id
  UPDATE facility
     SET latitude = 29.487663,
	 	 longitude = -94.983031
   WHERE facility_id = '1012447';
   