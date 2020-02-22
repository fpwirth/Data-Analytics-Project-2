SELECT * FROM state_data_by_year

SELECT energy_source
  FROM state_data
GROUP BY energy_source
ORDER BY energy_source

  SELECT *
    FROM state_data
  WHERE energy_source = 'Other Gases (Billion BTU)'