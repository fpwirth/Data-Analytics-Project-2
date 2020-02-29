$( document ).ready(function() {
    // slider for year

    // input to display year on top
    var $year_selected = $('#year_selected');
    var $state_selected = $('#state_selected')/*.selectmenu()*/;

    // creaet the slider object
    var $year_slider = $("#year_slider").slider({
        orientation: "horizontal",
        range: "min",
        min: 1990,
        max: 2018,
        value: 2018,
        slide: function( event, ui ) {
            // set the value of the input to the value of the slider
            $year_selected.val( ui.value );
        }
    });
    $year_selected.val( $year_slider.slider( "value" ) );


    // filter_row floating div!
    $(window).scroll(function(e){ 
        var $el = $('#filter_row'); 
        var isPositionFixed = ($el.css('position') == 'fixed');
        if ($(this).scrollTop() > 250 && !isPositionFixed){ 
          $el.css({
              'position': 'fixed', 
              'top': '0px',
              'width': '66%',              
              'opacity': '.70',
              'background-color': 'darkgrey',
              'filter': 'alpha(opacity=70)'
           }); 
        }
        if ($(this).scrollTop() < 250 && isPositionFixed){
          $el.css({
              'position': 'static', 
            //   'top': '200px',
              'width': '100%',
              'background-color': 'transparent',              
              'opacity': '1'
            }); 
        } 
      });


    // couldn't get the url to work, or by opening csv. (I'm sorry you had to see this!)
    $state_selected.append(new Option('Alaska','AK')); 
    $state_selected.append(new Option('Alabama','AL')); 
    $state_selected.append(new Option('Arkansas','AR')); 
    $state_selected.append(new Option('Arizona','AZ')); 
    $state_selected.append(new Option('California','CA')); 
    $state_selected.append(new Option('Colorado','CO')); 
    $state_selected.append(new Option('Connecticut','CT')); 
    $state_selected.append(new Option('Delaware','DE')); 
    $state_selected.append(new Option('Florida','FL')); 
    $state_selected.append(new Option('Georgia','GA')); 
    $state_selected.append(new Option('Hawaii','HI')); 
    $state_selected.append(new Option('Iowa','IA')); 
    $state_selected.append(new Option('Idaho','ID')); 
    $state_selected.append(new Option('Illinois','IL')); 
    $state_selected.append(new Option('Indiana','IN')); 
    $state_selected.append(new Option('Kansas','KS')); 
    $state_selected.append(new Option('Kentucky','KY')); 
    $state_selected.append(new Option('Louisiana','LA')); 
    $state_selected.append(new Option('Massachusetts','MA')); 
    $state_selected.append(new Option('Maryland','MD')); 
    $state_selected.append(new Option('Maine','ME')); 
    $state_selected.append(new Option('Michigan','MI')); 
    $state_selected.append(new Option('Minnesota','MN')); 
    $state_selected.append(new Option('Missouri','MO')); 
    $state_selected.append(new Option('Mississippi','MS')); 
    $state_selected.append(new Option('Montana','MT')); 
    $state_selected.append(new Option('North Carolina','NC')); 
    $state_selected.append(new Option('North Dakota','ND')); 
    $state_selected.append(new Option('Nebraska','NE')); 
    $state_selected.append(new Option('New Hampshire','NH')); 
    $state_selected.append(new Option('New Jersey','NJ')); 
    $state_selected.append(new Option('New Mexico','NM')); 
    $state_selected.append(new Option('Nevada','NV')); 
    $state_selected.append(new Option('New York','NY')); 
    $state_selected.append(new Option('Ohio','OH')); 
    $state_selected.append(new Option('Oklahoma','OK')); 
    $state_selected.append(new Option('Oregon','OR')); 
    $state_selected.append(new Option('Pennsylvania','PA')); 
    $state_selected.append(new Option('Rhode Island','RI')); 
    $state_selected.append(new Option('South Carolina','SC')); 
    $state_selected.append(new Option('South Dakota','SD')); 
    $state_selected.append(new Option('Tennessee','TN')); 
    $state_selected.append(new Option('Texas','TX')); 
    $state_selected.append(new Option('United States (Total)','US'));     
    $state_selected.append(new Option('Utah','UT')); 
    $state_selected.append(new Option('Virginia','VA')); 
    $state_selected.append(new Option('Vermont','VT')); 
    $state_selected.append(new Option('Washington','WA')); 
    $state_selected.append(new Option('Wisonsin','WI')); 
    $state_selected.append(new Option('West Virginia','WV')); 
    $state_selected.append(new Option('Wyoming','WY')); 
    $state_selected.append(new Option('Washington DC','DC')); 
    
    // set initial value to US (total)
    $state_selected.val('US');

    // dialog for system messages
    var $sysmessage_dialog = $('#sysmessage_dialog').dialog({
        autoOpen: false,
        modal: true,
        dialogClass: "alert",
        buttons: [
            {
            text: "Ok",
            class: "ui-button ui-widget ui-corner-all",
            click: function() {
                $sysmessage_dialog.dialog('close');

            }
            }
        ]

    });

    // span for message text
    var $message_text = $('#message_text');

    // get url for link to aqi data
    var aqi_url = $('#aqiUrl').val();
    // initialize the datatable, which pulls the json from the url
    var $airQualityTable = $('#airQualityTable').DataTable({
        'ajax': {
            url: aqi_url,
            dataSrc: 'data'
        },
        // providing user friendly column names
        columns: [
            { title: "State"},
            { title: "Year"},
            { title: "CBSA Code"},
            { title: "Days With AQI"},
            { title: "Good Days"},
            { title: "Moderate Days"},
            { title: "Unhealthy Days"},
            { title: "Unhealthy Sensitive Days"},
            { title: "Very Unhealthy Days"},
            { title: "Hazardous Days"}
        ]
    })

    // adding click function to the link to data anchor 
    $('#linkAirQuality').click(function() {

        // opening the dialog that contains the air quality data
        $airQualityTableDialog.dialog('open');

    })

    // defining the air quality dialog, which contains the datatable object
    var $airQualityTableDialog = $('#airQualityTableDialog').dialog({
        autoOpen: false,
        modeal: true,
        position: { 
            my: "center", 
            at: "top" 
        },
        width: "66%",
        maxWidth: "768px",
        height: "auto",
        buttons: [
            {
                // just a boring close button
                text: "Close",
                class: "ui-button ui-widget ui-corner-all",
                click: function() {
                    $airQualityTableDialog.dialog('close');
                }
            }
        ]
    })

    // defining the dialoog for the greenhouse emissions table
    var $greenhouseTableDialog = $('#greenhouseTableDialog').dialog({
        autoOpen: false,
        modeal: true,
        position: { 
            my: "center", 
            at: "top" 
        },
        width: "66%",
        maxWidth: "768px",
        height: "auto",
        buttons: [
            {
                // boring close again
                text: "Close",
                class: "ui-button ui-widget ui-corner-all",
                click: function() {
                    $greenhouseTableDialog.dialog('close');
                }
            }
        ]
    });


    // get the url to the greenhouse emissions
    var greenhouse_url = $('#emissionUrl').val();
    // initialiize the greenhouse emissions Data table, which pulls json data from url
    var $greenhouseTable = $('#greenhouseTable').DataTable({
        'ajax': {
            url: greenhouse_url,
            dataSrc: 'data'
        },
        // column names
        columns: [
            { title: "State"},
            { title: "Year"},
            { title: "Greenhouse Emissions"}
        ]
    })

    // click function for link to greenhouse emissions data
    $('#linkGreenhouse').click(function() {

        // opening the greenhouse emissions dialog and table
        $greenhouseTableDialog.dialog('open');

    })

    // defining the dialoog for the state generation table
    var $stateGenerationTableDialog = $('#stateGenerationTableDialog').dialog({
        autoOpen: false,
        modeal: true,
        position: { 
            my: "center", 
            at: "top" 
        },
        width: "66%",
        maxWidth: "768px",
        height: "auto",
        buttons: [
            {
                // boring close again
                text: "Close",
                class: "ui-button ui-widget ui-corner-all",
                click: function() {
                    $stateGenerationTableDialog.dialog('close');
                }
            }
        ]
    });


    // get the url to the state generation data
    var stateGeneration_url = $('#stateGenerationUrl').val();
    // initialiize the state generation Data table, which pulls json data from url
    var $stateGenerationTable = $('#stateGenerationTable').DataTable({
        'ajax': {
            url: stateGeneration_url,
            dataSrc: 'data'
        },
        // column names
        columns: [
            { title: "State"},
            { title: "Year"},
            { title: "Energy Source"},            
            { title: "Generation (MWh)"},
            { title: "% of Total Generation"}
        ]
    })

    // click function for link to state generation data
    $('#linkEnergySrouce').click(function() {

        // opening the state generation dialog and table
        $stateGenerationTableDialog.dialog('open');

    })
    // add the same click function to the other plotly chart's reference to generation raw data
        // this is mainly due to lazyness
    $('#linkGeneration').click(function() {

        // opening the greenhouse emissions dialog and table
        $stateGenerationTableDialog.dialog('open');

    })
    
    // defining the dialoog for the degree day table
    var $degreeTableDialog = $('#degreeTableDialog').dialog({
        autoOpen: false,
        modeal: true,
        position: { 
            my: "center", 
            at: "top" 
        },
        width: "66%",
        maxWidth: "768px",
        height: "auto",
        buttons: [
            {
                // boring close again
                text: "Close",
                class: "ui-button ui-widget ui-corner-all",
                click: function() {
                    $degreeTableDialog.dialog('close');
                }
            }
        ]
    });


    // get the url to the degree day data
    var degree_url = $('#degreeUrl').val();
    // initialiize the degree day Data table, which pulls json data from url
    var $degreeTable = $('#degreeTable').DataTable({
        'ajax': {
            url: degree_url,
            dataSrc: 'data'
        },
        // column names
        columns: [
            { title: "Region"},
            { title: "States in Region"},
            { title: "Year"},            
            { title: "Cooling Degree Days"},
            { title: "Heating Degree Days"}
        ]
    })

    // click function for link to degree day data
    $('#linkCooling').click(function() {

        // opening the degree days dialog and table
        $degreeTableDialog.dialog('open');

    })    

    // defining the dialog for the facility/state emissions data
    var $facilityStateTableDialog = $('#facilityStateTableDialog').dialog({
        autoOpen: false,
        modeal: true,
        position: { 
            my: "center", 
            at: "top" 
        },
        width: "66%",
        maxWidth: "768px",
        height: "auto",
        buttons: [
            {
                // boring close again
                text: "Close",
                class: "ui-button ui-widget ui-corner-all",
                click: function() {
                    $facilityStateTableDialog.dialog('close');
                }
            }
        ]
    });


    // get the url to the facility/state emissions data
    var facility_state_url = $('#facilityStateUrl').val();
    // initialiize the facility/state emissions Data table, which pulls json data from url
    var $facilityStateTable = $('#facilityStateTable').DataTable({
        'ajax': {
            url: facility_state_url,
            dataSrc: 'data'
        },
        // column names
        columns: [
            { title: "State"},
            { title: "Year"},            
            { title: "Total Power Facility Emissions"}
        ]
    })

    // click function for link to degree day data
    $('#linkFacility').click(function() {

        // opening the degree days dialog and table
        $facilityStateTableDialog.dialog('open');

    })    

});