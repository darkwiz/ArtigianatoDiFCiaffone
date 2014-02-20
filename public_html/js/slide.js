$(document).ready(function(){
 $(window).load(function() {
              $('.flexslider').flexslider({
                useCSS: false,
                animation: "slide"
              });
            });
           $('#menu').slicknav({
		prependTo:'#mobile_menu'
});
});