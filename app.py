###########################
### Import dependencies ###
###########################

import os
from flask import Flask, jsonify, render_template, redirect, request
import pandas as pd
import psycopg2
import psycopg2.extras

######################
### Database setup ###
######################

databasekey = os.environ.get('keysql')
hostname = 'localhost'
username = 'postgres'
password = databasekey
database = 'energy_db'
connection = psycopg2.connect(host=hostname, user=username, password=password, dbname=database )

# Save all references needed to to the views
state_list = pd.read_sql_query('select * from "state_list"',con=connection)
state_data = pd.read_sql_query('select * from "state_data_by_year"',con=connection)
facility_data = pd.read_sql_query('select * from "facility_emissions_by_year"',con=connection)
aqi_data = pd.read_sql_query('select state, year, cbsa_code, days_with_aqi, good_days, moderate_days, unhealthy_days, unhealthy_sensitive_days, very_unhealthy_days, hazardous_days, aqi_max, aqi_90_percentile, aqi_median FROM air_quality ORDER BY state, year',con=connection)
greenhouse_data = pd.read_sql_query('select state, year, greenhouse_emissions from state_greenhouse_emissions order by state, year', con=connection)
state_generation_data = pd.read_sql_query('select state, year, energy_source, generation_mwh, generation_percent from state_generation_by_year', con=connection)
degree_data = pd.read_sql_query('select region, state_list, year, cooling_degree_days, heating_degree_days from region_degreedays_by_year', con=connection)
facility_state_data = pd.read_sql_query('select state, year, total_facility_emissions from state_facility_emissions_by_year',con=connection)

#####################
# Flask Setup
#####################

app = Flask(__name__)

####################
# Flask Routes
####################

@app.route("/")
def home():
    """Main page"""
    return render_template ("index.html")

@app.route("/data/state_list")
def statelist():
    """Return information related to states"""
    return state_list.to_json()

@app.route("/data/facility_data")
def facilitydata():
    """Return information related to facility data"""
    return facility_data.to_json(orient='records')

@app.route("/data/state_data")
def statedata():
    """Return information related to state data"""
    return state_data.to_json(orient='records')

@app.route("/data/aqi_data")
def aqidata():
    """Return information related to air quality data"""
    return aqi_data.to_json(orient='split', index=False)

@app.route("/data/greenhouse_data")
def greenhousedata():
    """Return information related to greenhouse emissions data"""
    return greenhouse_data.to_json(orient='split', index=False)

@app.route("/data/state_generation_data")
def stategenerationdata():
    """Return information related to state generation data by energy source data"""
    return state_generation_data.to_json(orient='split', index=False)

@app.route("/data/degree_data")
def degreedata():
    """Return information related to heating/cooling degree days data"""
    return degree_data.to_json(orient='split', index=False)

@app.route("/data/facility_state_data")
def facilitystatedata():
    """Return information related to facility emissions aggregated by state data"""
    return facility_state_data.to_json(orient='split', index=False)


if __name__ == '__main__':
    app.run()

