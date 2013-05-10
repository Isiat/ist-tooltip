;(function($, window, undefined){

  //Plugin tooltip
  //use $(".tooltip").istTooltip();
  $.fn.istTooltip = function(opts) {
   var defaults = {
      // setting your default values for options
      separation: 5,
      orientation: 'auto', // 'auto','top-center'
      fixTop: 0,
      fixLeft: 0
   };
    // extend the options from defaults with user's options
   var options = $.extend(defaults, opts || {});
   return this.each(function(i,el){ // jQuery chainability
          // do plugin stuff
          $(el).each(function(i){
          var $elTooltip = $(this);
          $elTooltip.hover(
            function(){
              var $item = $(this);
              var position = $item.offset();
              var itemW = $item.width();
              var itemH = $item.height();
              var windowW = $(window).width();
              var separateTooltip = options.separation;
              var positionHorizontal = false;
              var classExtra = $item.data('option');
              $('<div id="tooltip_'+i+'" class="content_tooltip '+classExtra+'"><span></span><strong>'+$item.text()+'</strong></div>').appendTo('body');
              var left = 0;
              var top = 0;
              var tooltipW = $('#tooltip_'+i).outerWidth();
              var tooltipH = $('#tooltip_'+i).outerHeight();
              if(options.orientation === 'top-center'){
                 left =  (position.left - (tooltipW / 2 )) + options.fixLeft;
                 top = (position.top - tooltipH) + options.fixTop ;
              }else {
                if(positionHorizontal){
                    left = parseInt(itemW,10)+parseInt(position.left,10) +separateTooltip;
                    top = position.top;
                  } else {
                    left = position.left + (parseInt(itemW,10) / 2 );
                    top = position.top + parseInt(itemH,10) + separateTooltip;
                  }
                  if((parseInt(itemW,10)+parseInt(position.left,10)+parseInt(tooltipW,10)) > windowW) {
                    if(positionHorizontal){
                      left = parseInt(position.left,10) - parseInt(tooltipW,10) - separateTooltip - (parseInt(itemW,10) / 2 );
                      top = position.top;
                    } else {
                      left = parseInt(position.left,10) - parseInt(tooltipW,10) - separateTooltip;
                      top = position.top + parseInt(itemH,10) + separateTooltip;
                    }
                    $('#tooltip_'+i).addClass('right');
                  }
              }
              $('#tooltip_'+i).css({
                'position' : 'absolute',
                'top' : top,
                'left' : left,
                'z-index': 11100
              });
            },
            function(){
               $('#tooltip_'+i).remove();
            }
          );
        });
   });
  };
})(jQuery, window);