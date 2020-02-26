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

#Create data json files
state_list.to_json('static/data/state_list.json')
state_data.to_json('static/data/state_data.json',orient='records')
facility_data.to_json('static/data/facility_data.json',orient='records')