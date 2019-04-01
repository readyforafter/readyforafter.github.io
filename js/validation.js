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

        
        
        var form3 = "#formSub-platform";
        $(form3).validate({
            ignore: []
            , rules: {
                EMAIL2: {
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
                EMAIL: {
                    required: "Required field",
                    email: "Invalid email"
                , }
            }
            , errorPlacement: function (error, element) {
                error.insertAfter(element);
            }
            , submitHandler: function (form) {
                $.post("after-platform-registration.php", {
                    EMAIL: $("#EMAIL2").val(),
                }, function (data) {
                    var data1 = $.parseJSON(data);
                    console.log(data1);
                    if(data1 == 'success')
                        {
                            $('#response2').html('<h4>Thank you, you have been added to our mailing list.</h4>');
                            $('#formSub-platform')[0].reset();
                        }
                    else
                        {
                            $('#response2').html('<h4>Please try again.</h4>');
                        }
                    
                });
            }
        });

        var form4 = "#formSub-meet-team";
        $(form4).validate({
            ignore: []
            , rules: {
                EMAIL3: {
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
                EMAIL: {
                    required: "Required field",
                    email: "Invalid email"
                , }
            }
            , errorPlacement: function (error, element) {
                error.insertAfter(element);
            }
            , submitHandler: function (form) {
                $.post("meet-fam-registration.php", {
                    EMAIL: $("#EMAIL3").val(),
                }, function (data) {
                    var data1 = $.parseJSON(data);
                    console.log(data1);
                    if(data1 == 'success')
                        {
                            $('#response3').html('<h4>Thank you, you have been added to our mailing list.</h4>');
                            $('#formSub-meet-team')[0].reset();
                        }
                    else
                        {
                            $('#response3').html('<h4>Please try again.</h4>');
                        }
                    
                });
            }
        });

    });
})(jQuery);