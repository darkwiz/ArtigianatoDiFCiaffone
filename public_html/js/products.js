/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var DisplayProduct =
{       
        myConfig : {
                close:'#close',
                product: '.product_link',
                target: '.products',
                selected: undefined
         },  
         updateMyConfig: function( newConfig ) {
            if ( typeof newConfig === "object" ) {
              this.myConfig = newConfig;
            }
          },
         getProduct: function (event) {
              event.preventDefault();
              return $.ajax({
	             url: this.myConfig.selected.attr("href"),
	             type: 'GET',
	             dataType: 'html'
                });
         },
         showProduct: function (response) {
             if (this.myConfig.selected.parent("div").hasClass("selected")) {
                    this.myConfig.selected.parent(".grid_4").removeClass("selected").animate({opacity: 1});
                    $(".product_big").slideUp( 500, function(){ $(this).remove(); });
                 } else {
                     $(".selected").removeClass("selected").animate({opacity: 1});
                     $(".product_big").slideUp( 500, function(){ $(this).remove(); });
                     this.myConfig.selected.parent(".grid_4").addClass("selected").animate({opacity: .6});
                     $(response).prependTo(this.myConfig.target).addClass("product_big").hide().delay(350).slideDown(500);
                     DisplayProduct.scrollUp();
                 }
                $(this.myConfig.close).click( function(event){
                       DisplayProduct.closeProduct(event);
                });
                
         },
         closeProduct: function (event) {
             event.preventDefault();
             $(".product_big").slideUp( 500, function(){ $(this).remove();});
             $(".selected").removeClass("selected").animate({opacity: 1});
         },
         scrollUp: function() {
             $('html, body').animate({
                                    scrollTop: $("#top").offset().top
                    }, 2000);
         }
};


$(function() {
   $(DisplayProduct.myConfig.product).click( function(event){
       DisplayProduct.updateMyConfig({ 
                close:'#close',
                product: '.product_link',
                target: '.products',
                selected: $(this) });
       DisplayProduct.getProduct(event)
               .done(
                    function (response){
                        DisplayProduct.showProduct(response);
                    })
               .fail( function () {
                    alert("Non ancora disponibile");
                    return false;
               }); 
        });
     
   });
   
   
      
   
            
            