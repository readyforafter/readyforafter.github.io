jQuery.noConflict();
(function ($) {
    $(function () {
       /* $("input[type='text']").keypress(function (e) {
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                //display error message
                return false;
            }
        });*/
        jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Letters only please"); 
        
        jQuery.validator.addMethod("phone", function(value, element) {
        return this.optional(element) || /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value);
    }, "Please enter valid phone number");

        var form1 = "#pop-up-form-reg";
        $(form1).validate({
            ignore: []
            , rules: {
                FNAME1: {
                    required: true                    
                }
                , LNAME1: {
                    required: true                   
                }
                , EMAIL1: {
                    required: true
                    , email: true
                }
            }
            , errorClass: 'error'
            , validClass: 'valid'
            , errorElement: 'span'
            , highlight: function (element, errorClass, validClass) {
                $(element).addClass(errorClass).removeClass(validClass);
            }
            , unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass(errorClass).addClass(validClass);
            }
            , messages: {
                FNAME: {
                    required: "Required field"
                }
                , LNAME: {
                    required: "Required field"
                    
                }
                , EMAIL: {
                    required: "Required field",
                    email: "Invalid email"
                , }
            }
            , errorPlacement: function (error, element) {
                error.insertAfter(element);
            }
            , submitHandler: function (form) {
                $.post("pop-up-form-registration.php", {
                    FNAME: $("#FNAME1").val()
                    , LNAME: $("#LNAME1").val()
                    , EMAIL: $("#EMAIL1").val(),
                    // PHONE:$('#PHONE').val(),
                }, function (data) {
                    var data1 = $.parseJSON(data);
                    console.log(data1);
                    if(data1 == 'success')
                        {
                            $('#response1').html('<h4 class="thankyou_msg">Thank you, you have been added to our mailing list.</h4>');
                            $('#pop-up-form-reg')[0].reset();
                            setTimeout(function(){
                                $(".thankyou_msg").fadeOut();
                            },3000);
                        }
                    else
                        {
                            $('#response1').html('<h4>Please try again.</h4>');
                        }
                    
                });
            }
        });

        var form3 = "#formSub-platform";
        $(form3).validate({
            ignore: []
            , rules: {
                FNAME3: {
                    required: true                    
                }
                , LNAME3: {
                    required: true                   
                }
                , EMAIL3: {
                    required: true
                    , email: true
                }
            }
            , errorClass: 'error'
            , validClass: 'valid'
            , errorElement: 'span'
            , highlight: function (element, errorClass, validClass) {
                $(element).addClass(errorClass).removeClass(validClass);
            }
            , unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass(errorClass).addClass(validClass);
            }
            , messages: {
                FNAME: {
                    required: "Required field"
                }
                , LNAME: {
                    required: "Required field"
                    
                }
                , EMAIL: {
                    required: "Required field",
                    email: "Invalid email"
                , }
            }
            , errorPlacement: function (error, element) {
                error.insertAfter(element);
            }
            , submitHandler: function (form) {
                $.post("after-platform-registration.php", {
                    FNAME: $("#FNAME3").val()
                    , LNAME: $("#LNAME3").val()
                    , EMAIL: $("#EMAIL3").val(),
                    // PHONE:$('#PHONE').val(),
                }, function (data) {
                    var data1 = $.parseJSON(data);
                    console.log(data1);
                    if(data1 == 'success')
                        {
                            $('#response3').html('<h4>Thank you, you have been added to our mailing list.</h4>');
                            $('#formSub-platform')[0].reset();
                        }
                    else
                        {
                            $('#response3').html('<h4>Please try again.</h4>');
                        }
                    
                });
            }
        });

       var form4 = "#formSub-meet-team";
        $(form4).validate({
            ignore: []
            , rules: {
                FNAME4: {
                    required: true                    
                }
                , LNAME4: {
                    required: true                   
                }
                , EMAIL4: {
                    required: true
                    , email: true
                }
            }
            , errorClass: 'error'
            , validClass: 'valid'
            , errorElement: 'span'
            , highlight: function (element, errorClass, validClass) {
                $(element).addClass(errorClass).removeClass(validClass);
            }
            , unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass(errorClass).addClass(validClass);
            }
            , messages: {
                FNAME: {
                    required: "Required field"
                }
                , LNAME: {
                    required: "Required field"
                    
                }
                , EMAIL: {
                    required: "Required field",
                    email: "Invalid email"
                , }
            }
            , errorPlacement: function (error, element) {
                error.insertAfter(element);
            }
            , submitHandler: function (form) {
                $.post("meet-fam-registration.php", {
                    FNAME: $("#FNAME4").val()
                    , LNAME: $("#LNAME4").val()
                    , EMAIL: $("#EMAIL4").val(),
                    // PHONE:$('#PHONE').val(),
                }, function (data) {
                    var data1 = $.parseJSON(data);
                    console.log(data1);
                    if(data1 == 'success')
                        {
                            $('#response4').html('<h4>Thank you, you have been added to our mailing list.</h4>');
                            $('#formSub-meet-team')[0].reset();
                        }
                    else
                        {
                            $('#response4').html('<h4>Please try again.</h4>');
                        }
                    
                });
            }
        });

    });
})(jQuery);