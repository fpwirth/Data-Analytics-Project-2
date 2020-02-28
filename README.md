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
|5.     |Run the notebook "AQI.ipynb", this will load and clean the air quality data                        |
|6.     |Run the notebook "Raw Data Importing.ipynb", this will load and clean the EIA energy/emissions data|
|7.     |Run the notebook "import_data.ipynb", this will import the csv's, the outputs of the previous notebooks, and some additional metadata found in the raw-data folder|
|8.     |Open the site and enjoy!                                                                           |
|9.     |Run the views script "views.sql", this will create all of the views that will be used to chart data.  Also has a data fix for facility and adds US-total rows to air_quality and emissions datasets|
|10.    |Run the update_nulls.sql query, this will update some of the null values in the state data table|

### Link to Site
[Energy and Clean Air Analysis Dashboard](https://fpwirth.github.io/Data-Analytics-Project-2/)

### Images
!['Facility Dashboard Image not available'](/energy_emissions/static/images/facility_data_dashboard.png)\
*Dashboard screenshot*

!['Facility Pop-up Table Image not available'](/energy_emissions/static/images/pop_up_table_dashboard.png)\
*Pop-up data table screenshot*

!['ERD Image not available'](/energy_emissions/static/images/energy_db_ERD.png)\
*Database (energy_db) ERD*

### About the Measures
|Measure    |Description                                                                                                        |
|-----------|-------------------------------------------------------------------------------------------------------------------|
|Air quality metrics|We calculated good_days and bad_days percentages by aggregating AQI data.  The AQI data is captured by certain municipal regions in every state.  Each area's annual measurement includes the number of days that they measured air quality (not always 365).  The air quality rating was then given a categorical attribute (i.e. "hazardous", "moderate", "unhealthy", etc.).  To make it easier to visualize, we divided the days measured into just two categories: good and bad.  The good days were "good" and "moderate", bad days consisted of the 5 other categories.  The measure we charted is the volume weighted average of the percentage days that were good and bad by state.|
|Cooling/Heating Degree Days|Is the best way to correlate weather and energy.  An in depth explanation of the data can be found here: [NOAA Degree Days](https://www.weather.gov/key/climate_heat_cool) A brief definition: Degree days are based on the assumption that when the outside temperature is 65°F, we don't need heating or cooling to be comfortable. Degree days are the difference between the daily temperature mean, (high temperature plus low temperature divided by two) and 65°F. If the temperature mean is above 65°F, we subtract 65 from the mean and the result is Cooling Degree Days. If the temperature mean is below 65°F, we subtract the mean from 65 and the result is Heating Degree Days.|
|Facility Emissions data|This dataset has all power generating facilities in the country and the emissions (in metric tons) that they emitted by year.  This data is available from 2011 to 2018, and is in our Leaflet map, where each dot is a power facility.  The dot is sized by the amount of emissions.|
|Generation Data|The generation data is MWh, which is captured in our data by energy source.  There are 14 total categories of energy_source, which makes for a nice stacked area chart!|


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


