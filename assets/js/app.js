// A $( document ).ready() block.
$( document ).ready(function() {
    // slider for year

    // input to display year on top
    var $year_selected = $('#year_selected');

    // creaet the slider object
    var $year_slider = $("#year_slider").slider({
        orientation: "vertical",
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

    // filter reset button (sets options back to default)
    var $filter_reset = $('#filter_reset').button().click(function(d) {

        // set the message an open the dialog
        $message_text.text('Under construction, not ready yet!')

        // open the dialog
        $sysmessage_dialog.dialog('open');
    })
});