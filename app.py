# Flask app

###########################
### Import dependencies ###
###########################

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template, redirect, request
import pandas as pd
import psycopg2
import psycopg2.extras

######################
### Database setup ###
######################

hostname = 'localhost'
username = 'postgres'
password = 'Pandas'
database = 'energy_db'

connection = psycopg2.connect(host=hostname, user=username, password=password, dbname=database )

# Save all references needed to to the views
state_list = pd.read_sql_query('select * from "state_list"',con=connection)
state_data = pd.read_sql_query('select * from "state_data_by_year"',con=connection)
facility_data = pd.read_sql_query('select * from "facility_emissions_by_year"',con=connection)

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

    return jsonify(state_list)

@app.route("/data/facility_data")
def facilitydata():
    """Return information related to facility data"""

    return jsonify(facility_data)

@app.route("/data/state_data")
def statedata():
    """Return information related to state data"""

    return jsonify(state_data)

if __name__ == '__main__':
    app.run(debug=True)

