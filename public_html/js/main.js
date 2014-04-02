/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var DisplayProduct =
{       
        mySelect: undefined,
        myBig: undefined,

        myConfig : {
                close:'#close',
                product: '.product_link',
                target: '.products',
                big: ".product_big",
                thumbs: ".thumb_photo img"
         },  
         updateMyConfig: function( newConfig ) {
            if ( typeof newConfig === "object" ) {
              this.myConfig = newConfig;
            }
          },
         getProduct: function (event) {
              event.preventDefault();
              return $.ajax({
	             url: this.mySelect.data("source"),
	             type: 'GET',
	             dataType: 'html'
                });
         },
         showProduct: function (response) {
             var $big = $(this.myConfig.big);
             if (this.mySelect.parent("div").hasClass("selected")) {
                    this.mySelect.parent(".p_box").removeClass("selected").animate({opacity: 1});
                    $big.slideUp( 500, function(){ $(this).remove(); });
                 } else {
                     $(".selected").removeClass("selected").animate({opacity: 1});
                     $big.slideUp( 500, function(){ $(this).remove(); });
                     this.mySelect.parent(".p_box").addClass("selected").animate({opacity: .6});
                     $(response).prependTo(this.myConfig.target).addClass("product_big").hide().delay(350).slideDown(500);
                     DisplayProduct.scrollUp();
                 }
                $(this.myConfig.close).click( function(event){
                       DisplayProduct.closeProduct(event);
                });
                
         },
         closeProduct: function (event) {
             event.preventDefault();
             $(this.myConfig.big).slideUp( 500, function(){ $(this).remove();});
             $(".selected").removeClass("selected").animate({opacity: 1});
         },
         scrollUp: function() {
             $('html, body').animate({
                                    scrollTop: $("#top").offset().top
                    }, 1500);
         },
         swapImage: function() {
             var thmb = this.myBig;
             var src = this.myBig.prop("src");
             $('.product_img_container img').fadeOut(400,function(){
                thmb.prop("src", $(this).prop("src").replace('big','small'));
             $(this).fadeIn(400)[0].src = src.replace('small','big');
            });
         }
};


$(function() {
     $('#menu').slicknav({
		prependTo:'#mobile_menu'
    });
    
   $(DisplayProduct.myConfig.product).click( function(event){
       DisplayProduct.mySelect = $(this);
       DisplayProduct.getProduct(event)
               .done(
                    function (response){
                        DisplayProduct.showProduct(response);
                        $(".thumb_photo img").on("click", function(){
                            DisplayProduct.myBig = $(this);
                            DisplayProduct.swapImage();
                         });
                    })
               .fail( function () {
                    alert("Non ancora disponibile");
                    return false;
               }); 
        });
    
    
   });
   
   
      
   
            
            