// JavaScript Document
(function($){
    var goToTopTime;
    $.fn.goToTop=function(options){
        var opts = $.extend({},$.fn.goToTop.def,options);
        var $window=$(window);
        $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'); // opera fix
        //$(this).hide();
        var $this=$(this);
        clearTimeout(goToTopTime);
        goToTopTime=setTimeout(function(){
            var controlLeft;
            if ($window.width() > opts.pageHeightJg * 2 + opts.pageWidth) {
                controlLeft = ($window.width() - opts.pageWidth) / 2 + opts.pageWidth + opts.pageWidthJg;
            }else{
                controlLeft = $window.width()- opts.pageWidthJg-$this.width();
            }
            var cssfixedsupport = !$.support.opacity && !$.support.style && window.XMLHttpRequest == undefined;//判断是否ie6
            var controlTop=$window.height() - $this.height()-opts.pageHeightJg;
            controlTop=cssfixedsupport ? $window.scrollTop() + controlTop : controlTop;
            var shouldvisible=( $window.scrollTop() >= opts.startline )? true : false;

            if (shouldvisible){
                $this.stop().fadeIn(500);
            }else{
                $this.stop().fadeOut(500);
            }

            $this.css({
                position: cssfixedsupport ? 'absolute' : 'fixed',
                top: controlTop,
                left: controlLeft
            });
        },30);

        $(this).click(function(event){
            $body.stop().animate( { scrollTop: $(opts.targetObg).offset().top}, opts.duration);
            $(this).blur();
            event.preventDefault();
            event.stopPropagation();
        });
    };
})(jQuery);