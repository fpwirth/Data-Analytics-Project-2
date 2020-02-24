# Data-Analytics-Project-2
## by Lourdes Rodriguez Milano, Philip Wirth and Michael Dowlin
## 2/15/20

### Description
The focus of this project is looking at electricity generation and emissions to see if there is a relationship with temperature and air quality by region in the US.  Our rationale is that with climate change, our transition from coal to cleaner fuels and our changing EPA rules we should see some interesting trends over these last few years.  Questions we are hoping to answer include: is our air getting cleaner, are different parts of the country faring better or worse, is there a relationship between emissions and temperature? 

### Steps to Recreate Environment
|Step # |Step Description                                                                                   |
|-------|---------------------------------------------------------------------------------------------------|
|1.     |Clone the repository to your computer.                                                             |
|2.     |Start a session of PostgresSQL administrator                                                       |
|3.     |Create a database called "energy_db"                                                               |
|4.     |Run the ddl sql script "energy_db_ddl", this will create all of the tables, keys/indexes.|
|5.     |Run the views script "views.sql", this will create all of the views that will be used to chart data.|
|6.     |Run the notebook "AQI.ipynb", this will load and clean the air quality data                        |
|7.     |Run the notebook "Raw Data Importing.ipynb", this will load and clean the EIA energy/emissions data|
|8.     |Run the notebook "import_data.ipynb", this will import the csv's, the outputs of the previous notebooks, and some additional metadata found in the raw-data folder|
|9.     |Open the site and enjoy!                                                                           |

### Link to Site
[Energy and Clean Air Analysis Dashboard](https://fpwirth.github.io/Data-Analytics-Project-2/)

### Images
!['Facility Dashboard Image not available'](/energy_emissions/static/images/facility_data_dashboard.png)\
*Facility data dashboard screenshot*

!['ERD Image not available'](/energy_emissions/static/images/energy_db_ERD.png)\
*Database (energy_db) ERD*

### Contents
| File                        | Description                                                                                     |
|-----------------------------|-------------------------------------------------------------------------------------------------|
|energy_emissions\assets\images\energy_db_ERD.png     |ERD of our energy_db postgresSQL database.  Our semi-relational view of energy data, weather data and air quality by state and/or region|
|notebooks\AQI.ipynb          |Jupyter notebook that imports and cleans the air quality data by state.                          |
|notebooks\group_analysis.ipynb         |scrap notebook, just checking the datasets out       |
|notebooks\import_data.ipynb            |Notebook that will import all of the csv files in the "Clean Data Files" folder|
|notebooks\Raw Data Importing.ipynb|Notebook that imports all of the EIA data|
|sql\energy_db_ddl                  |Data definition language (ddl) for the energy_db database.  Run this script to create all the necessary tables/keys/views in the postgreSQL database.|
|sql\foreign_key_list.sql           |script to retrieve all foreign keys that exist in the database, helpful info when dropping and adding the indexes.  |
|sql\views.sql  |script to create all of the views that will be used by the flask app|


