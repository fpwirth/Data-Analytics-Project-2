// drop down select

$( "#year_slider" ).slider({
    orientation: "vertical",
    range: "min",
    min: 1990,
    max: 2018,
    value: 2018,
    slide: function( event, ui ) {
      $( "#year_selected" ).val( ui.value );
    }
  });
  $( "#year_selected" ).val( $( "#year_slider" ).slider( "value" ) );
