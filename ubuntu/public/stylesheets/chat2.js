jQuery(function(){
    jQuery(".panel.panel-chat > .panel-heading > .chatMinimize").click(function(){
        if(jQuery(this).parent().parent().hasClass('mini'))
        {
            jQuery(this).parent().parent().removeClass('mini').addClass('normal');

            jQuery('.panel.panel-chat > .panel-body').animate({height: "250px"}, 500).show();

            jQuery('.panel.panel-chat > .panel-footer').animate({height: "75px"}, 500).show();
        }
        else
        {
            jQuery(this).parent().parent().removeClass('normal').addClass('mini');

            jQuery('.panel.panel-chat > .panel-body').animate({height: "0"}, 500);

            jQuery('.panel.panel-chat > .panel-footer').animate({height: "0"}, 500);

            setTimeout(function() {
                jQuery('.panel.panel-chat > .panel-body').hide();
                jQuery('.panel.panel-chat > .panel-footer').hide();
            }, 500);


        }

    });
    jQuery(".panel.panel-chat > .panel-heading > .chatClose").click(function(){
        jQuery(this).parent().parent().remove();
    });
})