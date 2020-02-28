#Import dependencies
import os
import pandas as pd
import psycopg2
import psycopg2.extras

#Database setup
databasekey = os.environ.get('keysql')
hostname = 'localhost'
username = 'postgres'
password = databasekey
database = 'energy_db'
connection = psycopg2.connect(host=hostname, user=username, password=password, dbname=database )

#Save all references needed to to the views
state_list = pd.read_sql_query('select * from "state_list"',con=connection)
state_data = pd.read_sql_query('select * from "state_data_by_year"',con=connection)
facility_data = pd.read_sql_query('select * from "facility_emissions_by_year"',con=connection)
aqi_data = pd.read_sql_query('select state, year, cbsa_code, days_with_aqi, good_days, moderate_days, unhealthy_days, unhealthy_sensitive_days, very_unhealthy_days, hazardous_days, aqi_max, aqi_90_percentile, aqi_median FROM air_quality ORDER BY state, year',con=connection)
greenhouse_data = pd.read_sql_query('select state, year, greenhouse_emissions from state_greenhouse_emissions order by state, year', con=connection)
state_generation_data = pd.read_sql_query('select state, year, energy_source, generation_mwh, generation_percent from state_generation_by_year', con=connection)
degree_data = pd.read_sql_query('select region, state_list, year, cooling_degree_days, heating_degree_days from region_degreedays_by_year', con=connection)
facility_state_data = pd.read_sql_query('select state, year, total_facility_emissions from state_facility_emissions_by_year',con=connection)

#Create data json files
state_list.to_json('static/data/state_list.json')
state_data.to_json('static/data/state_data.json',orient='records')
facility_data.to_json('static/data/facility_data.json',orient='records')
aqi_data.to_json('static/data/air_quality_data.json',orient='split', index=False)
greenhouse_data.to_json('static/data/greenhouse_data.json',orient='split', index=False)
state_generation_data.to_json('static/data/state_generation_data.json',orient='split', index=False)
degree_data.to_json('static/data/degree_data.json',orient='split', index=False)
facility_state_data.to_json('static/data/facility_state_data.json',orient='split', index=False)

#All done!
print('ALL DONE!')