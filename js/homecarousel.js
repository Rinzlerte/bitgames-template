function homepageCarrousel(){
    if ( $('.home-carousel')) {
       $('.home-carousel').slick({
         dots: true,
         infinite: true,
         arrows: false,
         speed: 500,
         fade: true,
         cssEase: 'linear',
         autoplay: true,
         autoplaySpeed: 4000,
     });
    }
   }
   
homepageCarrousel();