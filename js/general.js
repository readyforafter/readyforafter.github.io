// JavaScript Document
var $ = jQuery.noConflict();
/* when particular class in view */
$.fn.isOnScreen = function(){
    var win = $(window);
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();

        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    };
/* for fade in animation */
function customanimation(){
	$(".animation-sec").each(function(index){  					
	    var res = ($(this).isOnScreen());
	        if(res == true){   
	        	$(this).addClass("animated"); 
	        }
    	});
}
/*on scroll link will be active*/
function scrollActive(){   
    $(".scroll-sec").each(function(ind, el) {
        if ($(window).scrollTop() > $(el).offset().top - $("header").outerHeight() - 1) {
            $("nav ul li a").removeClass('active');                    
            $("nav ul li a[href='#" + el.id + "']").addClass('active');                    
        }
        else{
            $("nav ul li a[href='#" + el.id + "']").removeClass('active');
        }        
    });
}
/* team section will convert into slider in mobile view */
function meetFamSlider(){
    if($(".menu-icon").css("display") == "block"){ 
         if($("#meet-the-fam.slick-initialized").length == 0){
            $("#meet-the-fam").slick({
                dots: true,
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 3000,
                responsive: [
                {
                    breakpoint: 640, 
                        settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: false
                    }
                }                
            ]

            });
         }
    }
    else{
        if($("#meet-the-fam.slick-initialized").length > 0){
            $("#meet-the-fam").slick("unslick");
        }
    }
}
$(document).ready(function(){
    //$('input,textarea').placeholder();
    $('.enumenu_ul').responsiveMenu({
        'menuIcon_text': '',
        onMenuopen: function() {}
    });
    customanimation();
	// Testimonial Slider
  	$(".testimonial-slider").slick({
	  	dots: true,
	  	infinite: true,
	  	slidesToShow: 1,
	  	slidesToScroll: 1,
	  	arrows: false,
	    autoplay: true,
	    autoplaySpeed: 3000,
        fade: true,
        adaptiveHeight: true
  	});
    // Sub header Slider
    $(".sub-header-slider").slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true
    });
  	// Join Us Slider
  	$(".join-us-slider").slick({
	  	dots: false,
	  	infinite: false,
	  	slidesToShow: 3,
	  	slidesToScroll: 1,
	  	arrows: true,
	    autoplay: true,
	    autoplaySpeed: 3000,
        responsive: [
                {
                    breakpoint: 767,
                        settings: {
                        slidesToShow: 2, 
                        slidesToScroll: 2,
                        dots: true,
                        arrows: false
                    }
                },
                {
                    breakpoint: 640, 
                        settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: false
                    }
                }

            ]
  	});
    
    meetFamSlider();
    
    // smooth scroll move sec
    $('a[href*=\\#]:not([href=\\#])').click(function (e) {
                var linkHref = $(this).attr("href");
                var idElement = linkHref.substr(linkHref.indexOf("#"));        
                var headerHeight = $("header").outerHeight(),
                    header_padding = parseInt($("header").css("padding-top"));
                $("nav ul li a").removeClass('active');
                $(this).addClass("active");
                if($("body").hasClass("desk")){
                    $('html, body').animate({
                        scrollTop: $(idElement).offset().top - headerHeight
                    }, 1000);
                }
                else{
                    $('html, body').animate({
                        scrollTop: $(idElement).offset().top + parseInt($(idElement).css("padding"))
                    }, 1000);
                }
                return false;           
    });  
    
    /* click on link menu will be closed */
    $("nav ul li a").on("click",function(){
        if($("body").hasClass("mob")){
            $(".menu-box").trigger("click");
        }        
    });


    $("#formReg-party").validate({
      ignore: [],
      rules: {
        name1:{ required: true},
        email1:{ required: true,email:true},
        message1:{ required: true,},
      },
      errorClass:'error',
      validClass:'valid',
      errorElement:'div',
      highlight: function (element, errorClass, validClass) { 
        $(element).addClass(errorClass).removeClass(validClass); 
      }, 
      unhighlight: function (element, errorClass, validClass) { 
        $(element).removeClass(errorClass).addClass(validClass);
      },
      messages: {
        // "interest[]":"Please Select Field Of Interest",
      },
      errorPlacement: function(error, element) {
        if($(element).is('input[type="checkbox"]')){
            error.insertAfter($(element).closest(".checkbox_main"));
        }else {
            error.insertAfter(element);
        }
    },
    submitHandler: function (form) { // for demo            
        var form_data = $("#formReg-party").serialize();
        var request = $.ajax({                        
                    url: "after-party-registration.php",
                    type: "POST",
                    data: form_data,
                    dataType: "json",
                    beforeSend: function () {
                        $('.submit-button').val('sending...').attr('disabled', 'disabled').addClass("btn-disabled");                    
                    }
                    , complete: function () {
                        $('.submit-button').val('Submit').removeAttr('disabled').removeClass("btn-disabled");
                    }
                    ,
                    success: function(r) {
                    if (r.type == "success") {
                              $('.submit-button').val('sending...').attr('disabled', 'disabled');
                            setTimeout(function () {
                                $('#formReg-party .successmsg').fadeIn();
                                $('#formReg-party')[0].reset();
                                $('.submit-button').val('Submit').removeAttr('disabled');
                                $(".valid").removeClass("valid");
                            }, 500);
                    } else if (r.type == "error") {
                        alert(r.message);
                    }
            },
            error: function() {
                //console.log('error msg');
            }
        });
        return false;
      }
  });

    $("#formReg-school").validate({
      ignore: [],
      rules: {
        name2:{ required: true},
        email2:{ required: true,email:true},
        message2:{ required: true,},
      },
      errorClass:'error',
      validClass:'valid',
      errorElement:'div',
      highlight: function (element, errorClass, validClass) { 
        $(element).addClass(errorClass).removeClass(validClass); 
      }, 
      unhighlight: function (element, errorClass, validClass) { 
        $(element).removeClass(errorClass).addClass(validClass);
      },
      messages: {
        // "interest[]":"Please Select Field Of Interest",
      },
      errorPlacement: function(error, element) {
        if($(element).is('input[type="checkbox"]')){
            error.insertAfter($(element).closest(".checkbox_main"));
        }else {
            error.insertAfter(element);
        }
    },
    submitHandler: function (form) { // for demo            
        var form_data = $("#formReg-school").serialize();
        var request = $.ajax({                        
                    url: "after-school-registration.php",
                    type: "POST",
                    data: form_data,
                    dataType: "json",
                    beforeSend: function () {
                        $('.submit-button').val('sending...').attr('disabled', 'disabled').addClass("btn-disabled");                    
                    }
                    , complete: function () {
                        $('.submit-button').val('Submit').removeAttr('disabled').removeClass("btn-disabled");
                    }
                    ,
                    success: function(r) {
                    if (r.type == "success") {
                              $('.submit-button').val('sending...').attr('disabled', 'disabled');
                            setTimeout(function () {
                                $('#formReg-school .successmsg').fadeIn();
                                $('#formReg-school')[0].reset();
                                $('.submit-button').val('Submit').removeAttr('disabled');
                                $(".valid").removeClass("valid");
                            }, 500);
                    } else if (r.type == "error") {
                        alert(r.message);
                    }
            },
            error: function() {
                //console.log('error msg');
            }
        });
        return false;
      }
  });

  $(".submit-button").click(function(){
      setTimeout(function(){
          $("form input.error").first().focus();
      },50) 
  });
}); // end of ready function

$(window).scroll(function(){
    customanimation();
    scrollActive();
    /* after some scroll amount header bg will change */
    if($(window).innerWidth() > 767){
        if($(this).scrollTop() > 50){
            $("#header").addClass("headerbg");
        }
        else{$("#header").removeClass("headerbg");}
    }
});

$(window).resize(function(){
   meetFamSlider();
});


