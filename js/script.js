$(document).ready(function () {
    var maxMsgLength = 500;

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').show();
        } else {
            $('.scrollup').hide();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    $('#goToInfo').on('click', function () {
        $('#nav-info-tab').tab('show');
        scrollUpToTop();
    });

    $('#goToGallery').on('click', function () {
        $('#nav-gallery-tab').tab('show');
        scrollUpToTop();
    });

    $('#goToContact').on('click', function () {
        $('#nav-contact-tab').tab('show');
        scrollUpToTop();
    });

    function scrollUpToTop() {
        $('html,body').scrollTop(0);
    }

    $('#charNum').text(function () {
        verifyMsgMaxLength();
    });

    $('#msg').keyup(function () {
        verifyMsgMaxLength();
    });

    $('.alert').hide();

    $('form').on('reset', function (e) {
        setTimeout(function () {
            verifyMsgMaxLength()
            $('.alert').hide();
            $('form *').css("border-color", "#ced4da");
        }, 0);
    });

    $('form').on('submit', function () {
        scrollUpToTop();
        $('.alert').hide();
        if (!validateForm()) {
            $('.alert-danger').fadeIn(500)
            return false;
        } else {
            $('.alert-success').fadeIn(500).fadeOut(4000);
            
            //like submitting
            $(':input', 'form')
                .not(':button, :submit, :reset, :hidden')
                .val('')
                .removeAttr('checked')
                .removeAttr('selected');

            verifyMsgMaxLength();
            return false;
        }
    });


    // przycisk uaktywnia sie gdy jest prawidlowy formularz
    // $('button[type=submit').prop('disabled', true);

    // $('form').on('change', function(){
    //     if (validateForm()) {
    //         $('button[type=submit').prop('disabled', false);
    //     }
    // });


    $(".hamburger").click(function () {
        $("nav").toggle(500);
    });

    checkResize();

    $(window).resize(checkResize);

    // #### functions #####

    function checkResize(){
        if (jQuery(".hamburger").css('display') == 'block') {
            $("nav").hide();
            $("nav").click(function () {
                $("nav").toggle(500);
            });
        }else{
            $("nav").css('display','flex');
            $( "nav" ).unbind( "click" );
        }
    }


    function verifyMsgMaxLength() {
        var max = maxMsgLength;
        var len = $('#msg').val().length;
        if (len >= max) {
            $('#charNum').text(' Osiągnąłeś limit ' + max + ' znaków');
        } else {
            var char = max - len;
            if (char == 1) {
                $('#charNum').text(char + ' znak został');
            } else if (char > 1 && char < 5) {
                $('#charNum').text(char + ' znaki zostały');
            } else {
                $('#charNum').text(char + ' znaków zostało');
            }

        }
    }

    function validateForm() {
        var firstName = $('#name');
        var lastName = $('#lastName');
        var email = $('#email');
        var msg = $('#msg');
        var isValid = true;
        if (firstName.val().length < 1) {
            isValid = false;
            $(firstName).css("border-color", "red");
        } else {
            $(firstName).css("border-color", "#ced4da");
        }
        if (lastName.val().length < 1) {
            isValid = false;
            $(lastName).css("border-color", "red");
        } else {
            $(lastName).css("border-color", "#ced4da");
        }
        if (email.val().length < 1) {
            isValid = false;
            $(email).css("border-color", "red");
        } else {
            $(email).css("border-color", "#ced4da");
        }
        if (msg.val().length < 1) {
            isValid = false;
            $(msg).css("border-color", "red");
        } else {
            $(msg).css("border-color", "#ced4da");
        }

        return isValid;
    }
});