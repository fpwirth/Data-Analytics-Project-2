// A $( document ).ready() block.
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

    // couldn't get the url to work, or by opening csv.  hard-coding states (I'm sorry you had to see this)
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
    
    $state_selected.val('US');

    // $state_selected.selectmenu("refresh");

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

    var aqi_url = "static/data/air_quality_data.json";
    var $airQualityTable = $('#airQualityTable').DataTable({
        'ajax': {
            url: aqi_url,
            dataSrc: 'data'
        },
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

    $('#linkAirQuality').click(function() {

        $airQualityTableDialog.dialog('open');

    })

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
                text: "Close",
                class: "ui-button ui-widget ui-corner-all",
                click: function() {
                    $airQualityTableDialog.dialog('close');
                }
            }
        ]
    })

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
                text: "Close",
                class: "ui-button ui-widget ui-corner-all",
                click: function() {
                    $greenhouseTableDialog.dialog('close');
                }
            }
        ]
    });

    var greenhouse_url = "static/data/greenhouse_data.json";
    var $greenhouseTable = $('#greenhouseTable').DataTable({
        'ajax': {
            url: greenhouse_url,
            dataSrc: 'data'
        },
        columns: [
            { title: "State"},
            { title: "Year"},
            { title: "Greenhouse Emissions"}
        ]
    })

    $('#linkGreenhouse').click(function() {

        $greenhouseTableDialog.dialog('open');

    })


});