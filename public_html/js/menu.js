/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var DisplaySubmenu =
{
        myConfig : {
                url: './partials/_submenu.html',
                button: '#products_cat',
                target: '.menu-lev-2'
            },
        reportGet: function (data) {
                    console.log( data );
             },
               
                
         getSubmenu: function () {
              return $.ajax({
	             url: this.myConfig.url,
	             type: 'GET',
	             dataType: 'html'
                });
         },
         showSubmenu: function (event) {
                     event.preventDefault();
//                   console.log("Prevented on " + event.target.tagName);
                     if ( $( this.myConfig.target ).is( ":hidden" ) ) {
                             $( this.myConfig.target  ).slideDown( "slow" );
                             $("span.arrow").html("▼");
                                } else {
                                $( this.myConfig.target ).slideUp( "slow" );
                             $("span.arrow").html("►");
                }
         }

};


$(function() {
    DisplaySubmenu.getSubmenu().done(
        function (response){
               $(DisplaySubmenu.myConfig.target).html(response);
               $(DisplaySubmenu.myConfig.button).click( function(event) {
                   DisplaySubmenu.showSubmenu(event);}
               );
    });
    
     var stickyHeaderTop = $('#stickyheader').offset().top;
      var stickySubmenuTop = $('#stickysubmenu').offset().top;
 
        $(window).scroll(function(){
                if( $(window).scrollTop() > stickyHeaderTop || $(window).scrollTop() > stickySubmenuTop) {
                        $('#stickyheader').css({position: 'fixed', top: '0px'});
                        $('#stickysubmenu').css({position: 'fixed', top: '46px'});
                        $('#stickyalias').css('display', 'block');
                } else {
                        $('#stickyheader').css({position: 'static', top: '0px'});
                        $('#stickysubmenu').css({position: 'static', top: '46px'});
                        $('#stickyalias').css('display', 'none');
                }
        });
//    $(window).resize(function () {
//                    $(DisplaySubmenu.myConfig.target).hide();
//            });
});

