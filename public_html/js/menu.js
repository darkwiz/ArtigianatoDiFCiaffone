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
                target: '.menu-lev-2',
                stickyheader: '#stickyheader'
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
                             $( this.myConfig.target ).slideDown( "slow" );
                             $("span.arrow").html("▼");
                                } else {
                                $( this.myConfig.target ).slideUp( "slow" );
                             $("span.arrow").html("►");
                }
         },
         scrollMenu: function (stickyHeaderTop) {
             if( $(window).scrollTop() > stickyHeaderTop) {
                        $('#stickyheader').css({position: 'fixed', top: '0px'});
                        $('#stickysubmenu').css({position: 'fixed', top: '50px'});
                        $('#stickyalias').css('display', 'block');
                } else {
                        $('#stickyheader').css({position: 'static', top: '0px'});
                        $('#stickysubmenu').css({position: 'static', top: '50px'});
                        $('#stickyalias').css('display', 'none');
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
        var stickyHeaderTop = $( DisplaySubmenu.myConfig.stickyheader ).offset().top;
        $(window).scroll(function(){
            DisplaySubmenu.scrollMenu(stickyHeaderTop);
        });
});

