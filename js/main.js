$(document).ready(function(){


    if ($('.wrap__slider').length) {

        $('.wrap__slider').bxSlider({
            speed           : 1500,
            onSliderLoad    : function(){

            }
        });

    }

    Cufon.replace(".banner_title, " +
        ".slideshow_text_sale, nav ul li a," +
        ".feautures_descr_title div," +
        ".categories_title," +
        ".h1," +
        ".category_count_button," +
        ".cart_order a," +
        ".feedback_submit_btn," +
        ".header_form_enter," +
        ".fancy_show_controls a," +
        ".jobs_file_view," +
        ".jobs_submit_link, " +
        ".orange_title," +
        "authorize_submit_btn",

    {hover: true, fontFamily: 'DIN Pro Medium'});

    Cufon.replace('.contacts_title,' +
        '.address_direction span',

        {fontFamily: 'HelveticaC'});


    /* --------- carousel ---------*/

    $('.carousel_wrap ul').jcarousel({
        scroll: 1,
        wrap: "circular"
    });

    $(".carousel_controls a").on("click",function(){
        var tmpStr = '';
        if($(this).hasClass("carousel_control_left")){
            tmpStr = 'jcarousel-prev';
        } else {
            tmpStr = 'jcarousel-next';
        }
        $(this).closest(".carousel").find("."+tmpStr).trigger("click");
        return false
    });

    /* --------- hidden submits ---------*/

    clickOnSubmit('.category_count_button,' +
        '.cart_order_submit,' +
        '.feedback_submit_btn,' +
        '.form_arrow,' +
        '.jobs_form_submit');

    /* --------- header login form ---------*/

    $('.header_form_enter').on('click', function(){

        if(!$(this).hasClass('slided')) {
            $('.header_slide_inner').stop(true, true).animate({'left': "0"}, 300);
            $(this).addClass('slided');

        } else {
            $('.header_slide_inner').stop(true, true).animate({'left': "-205px"}, 300);
            $(this).removeClass('slided');
        }

        return false;
    });

    $(document).on('click', function(e){

        if($(e.target).closest('.header_join_slide').length) return;

        $('.header_slide_inner').stop(true, true).animate({'left': "-205px"}, 300);
        $('.header_form_enter').removeClass('slided');

        e.stopPropagation();
    });

    /* --------- products border ---------*/

    $('.products li:nth-child(3n)').css({
        'background' : 'transparent',
        'padding-right' : '0'
    });

    /* --------- rating ---------*/

    $('.category_rating_count').each(function(){
        var filled = $(this).find('.filled');

        switch (true) {

            case filled.length <= 9 && filled.length > 6 :
                filled.css('background', '#568f57').end()
                        .closest('.category_order_rating').find('.category_rating_amount')
                        .css('color', '#568f57').text('много');
                break;

            case filled.length <= 6 && filled.length > 3 :
                filled.css('background', '#fa7a14').end()
                    .closest('.category_order_rating').find('.category_rating_amount')
                    .css('color', '#fa7a14').text('есть');
                break;

            case filled.length <= 3 && filled.length > 0 :
                filled.css('background', '#cc0000').end()
                    .closest('.category_order_rating').find('.category_rating_amount')
                    .css('color', '#cc0000').text('мало');
                break;

            case filled.length == 0 :
                $(this).closest('.category_order_rating').find('.category_rating_amount').text('нет');
                break;
        }
    });

    /* --------- border separate ---------*/

    var itemCount = $('.cells_view .category_list_item');
    var resqueItem = '<li class="border_separate"></li>';

    if (itemCount.length % 4 == 0) {
        $('.cells_view > ul > li:nth-child(4n)').after(resqueItem);

    } else {
        $('.cells_view > ul > li:nth-child(4n)').after(resqueItem);
        $('.cells_view .category_list').css('border-bottom', '1px solid #D8D9DF')
    }


    $('.coming_list > li:nth-child(3n)').after(resqueItem);

    /* --------- dot dot dot ---------*/

    if ($('.cells_view').length) {
        $('.cells_view .category_list_descript').dotdotdot();
    }

    if ($('.coming_list').length) {
        $('.coming_list li a').dotdotdot();
    }

    /* --------- table border ---------*/


    $('.cart_table tr').each(function(){
        $(this).find('td').last().css({
            'border-right' : '0 none', 'vertical-align' : 'middle'
        });

    });


    /* --------- ezmark ---------*/

    if($('.cart_table').length) {
        $('.cart_table input[type="checkbox"]').ezMark();
    }

    /* --------- accordeon ---------*/

    $('.jobs_title_vacancy, .jobs_title_rollback').on('click', function(e){
        var section =  $(this).closest('li');
        var fullWrap = $(this).closest('ul');

        fullWrap.find('li .jobs_title_rollback span').text('').parent().removeClass('tr_down');
        $('.jobs_form').hide();

        if (!$(this).parent().hasClass('click')) {
            fullWrap.find('.click').removeClass('click');
////
//            if ($(e.target).hasClass('jobs_title_rollback')) {
//                return false
//            }

            section.find('.jobs_title_rollback span').text('свернуть').parent().addClass('tr_down');
            $(this).parent().addClass('click');
        } else {

            $(this).closest('li').find('.jobs_title_rollback span').text(' ').parent().removeClass('tr_down');
            $(this).parent().removeClass('click');
        }

        accordeon($(this));

        return false;
    });


    $('.categories_item_title a').on('click', function(){
        $('.just_clicked').removeClass('just_clicked');
        $('.categories_sublist_popup').hide();

        accordeon($(this));

        if (!$(this).parent().hasClass('opened')) {
            $(this).closest('ul').find('.categories_item_title.opened').removeClass('opened');
            $(this).parent().addClass('opened');

        } else {
            $(this).parent().removeClass('opened');

        }

        return false;
    });

    $('.accordeon_list > li.open_as_default').addClass('active')
        .find('.accordeon_content').show()
        .end().find('.categories_item_title').addClass('opened');



    /* --------- vacancy form ---------*/

    $('.jobs_form').hide();

    var vacancyForm = $('.jobs .jobs_form').clone();

    $('.jobs_item_response').on('click', function(){

        $('.jobs_form').hide();

        $(this).closest('.jobs_response_wrap').append(vacancyForm)
            .find('.jobs_form').stop(true, true).fadeIn();

        Cufon.refresh();

        return false
    });

    $('.wrapper').on('click', '.jobs_responce_link', function(){

        $(this).closest('.jobs_form').stop(true, true).fadeOut(250);

        return false
    });

    $(document).on('click', function(e){
        if ($(e.target).closest('.jobs_form').length) return;

        $('.jobs_form').fadeOut(250);
        e.stopPropagation();
    });


    /* --------- main_slide_show ---------*/

    var randomListActive = getRandomInt(0, $('.slideshow_list > li').length - 1);

    $('.slideshow_list > li').eq(randomListActive).addClass('active');

    $('.slideshow_list').find('.active').siblings().hide();

    $('.slideshow_right').on('click', function(){
        var curSlide = $(this).closest('.slideshow').find('.active');

        if(curSlide.next().length) {
            curSlide.stop(true, true).fadeOut(600).removeClass('active')
                .next().addClass('active').stop(true, true).fadeIn(600);
        } else {
            curSlide.stop(true, true).fadeOut(600).removeClass('active');
            $(this).closest('.slideshow').find('li').first().addClass('active').stop(true, true).fadeIn(600);
        }

        return false

    });

    $('.slideshow_left').on('click', function(){
        var curSlide = $(this).closest('.slideshow').find('.active');

        if(curSlide.prev().length) {
            curSlide.stop(true, true).fadeOut(600).removeClass('active')
                .prev().addClass('active').stop(true, true).fadeIn(600);
        } else {
            curSlide.stop(true, true).fadeOut(600).removeClass('active');
            $(this).closest('.slideshow').find('li').last().addClass('active').stop(true, true).fadeIn(600);
        }

        return false
    });

    var flag = false;
    var count = 5;

    function auto() {
        if (flag == true) {
            $('.slideshow_right').click();
            flag = false;
            

        } else {
            if (count == 0) {
                flag = true;
                count = 5;
            } else {
                flag = false;
                count = count - 1;
            };
        };

        setTimeout(auto, 1000);
    };



    $('.slideshow_right, .slideshow_left').on('click', function(){
        count = 5;
    });


    setTimeout(auto, 2000);

    /* --------- minified slide show ---------*/

    function miniSlider(el, imgPath, changeImg) {
        if (!el.closest('li').hasClass('active')) {
            el.closest('li').addClass('active').siblings().removeClass('active');
            changeImg.find('.category_full_wrap img')
                .stop(true, true).fadeOut(200, function(){
                    $(this).attr('src', imgPath).fadeIn(200);
                });
        }
    }

    $('.category_mini_item').on('click', function(){
        var el = $(this),
            imgPath = $(this).find('img').attr('src'),
            changeImg = $(this).closest('.category_list_show');
        miniSlider(el, imgPath, changeImg)
        return false;
    });

    $('.item_colors_list a').on('click', function(){
        var el = $(this),
            imgPath = $(this).attr('href'),
            changeImg = $('.category_list_show');
        miniSlider(el, imgPath, changeImg)
        return false;
    });

    $('.fancy_show_next').on('click', function(){
        var minifiedPics =  $(this).closest('.fancypop').find('.category_mini_list');
        var curClicked =  minifiedPics.find('.active');


        if (!minifiedPics.find('li.active').length) {
            minifiedPics.find('li').first().find('.category_mini_item').trigger('click');
        } else {
            if (curClicked.next().length) {
                curClicked.next()
                    .find('.category_mini_item').trigger('click');
            } else {
                minifiedPics.find('li').first().find('.category_mini_item').trigger('click');
            }
        }

        return false
    });


    $('.fancy_show_prev').on('click', function(){
        var minifiedPics =  $(this).closest('.fancypop').find('.category_mini_list');
        var curClicked =  minifiedPics.find('.active');

        if (!minifiedPics.find('li.active').length) {
            minifiedPics.find('li').last().find('.category_mini_item').trigger('click');
        } else {
            if (curClicked.prev().length) {
                curClicked.prev()
                    .find('.category_mini_item').trigger('click');
            } else {
                minifiedPics.find('li').last().find('.category_mini_item').trigger('click');
            }
        }

        return false
    });

    /* --------- filter_arrows ---------*/

    $('.filter_types li a').on('click', function(){
        var item = $(this).closest('li');

        item.toggleClass('up down');
        return false
    });

    /* --------- side pop up ---------*/

    $('.categories_sublist_popup').hide();

    $('.categories_item_sublist > li > .categories_sublist_inner > .categories_inner_title').on('click', function(){
        var popUp = $(this).closest('li').find('.categories_sublist_popup');

        if(!$(this).hasClass('just_clicked')) {

            if (window.navigator.userAgent.indexOf('MSIE 8.0') < 0) {
                $('.categories_sublist_popup').stop(true, true).fadeOut();
                popUp.stop(true, true).fadeIn();
            } else {
                // для ИЕ8, баги со всплывашкой
                $('.categories_sublist_popup').stop(true, true).hide();
                popUp.stop(true, true).show();
            }

            $(this).addClass('just_clicked');
        } else {

            if (window.navigator.userAgent.indexOf('MSIE 8.0') < 0) {
                popUp.stop(true, true).fadeOut();
            } else {
                popUp.stop(true, true).hide();
            }
            $(this).removeClass('just_clicked');
        }

        return false;
    });


    $('.categories_popup_close').on('click', function(){

        if (window.navigator.userAgent.indexOf('MSIE 8.0') < 0) {
            $(this).closest('.categories_sublist_popup').stop(true, true).fadeOut();
        } else {
            $(this).closest('.categories_sublist_popup').stop(true, true).hide();
        }

        $('.categories_inner_title').removeClass('just_clicked');

        return false;
    });

    //скроллпейн
    $('.product_slide_scrollpane').each(function() {
        var ulWidth = 0;
        $(this).find('ul:first > li').each(function () {
            ulWidth += ($(this).outerWidth(true) + 5);
        });
        $(this).find('ul:first').width(ulWidth);
        $(this).jScrollPane({
            horizontalDragMinWidth: 103,
            horizontalDragMaxWidth: 103
        });

        var api = $(this).data('jsp');
        $(this).bind(
            'mousewheel',
            function (event, delta, deltaX, deltaY) {
                api.scrollByX(delta * -50);
                return false;
            });
    });

    $(document).on('click', function(e){
        if ($(e.target).closest('.categories_sublist_popup').length) {
            return
        }

        if (window.navigator.userAgent.indexOf('MSIE 8.0') < 0) {
            $('.categories_sublist_popup').stop(true, true).fadeOut();
        } else {
            $('.categories_sublist_popup').stop(true, true).hide();
        }


        $('.categories_inner_title').removeClass('just_clicked');
        e.stopPropagation();
    });

    /* --------- fancybox ---------*/

    if($('.category_list .category_show_full').length || $('.category_show_full').length) {

        $('.category_list .category_show_full, .item .category_show_full').fancybox({
            padding     : 0,
            fitToView	: false,
            autoResize	: true,
            closeClick	: false,
            openEffect	: 'none',
            closeEffect	: 'none',
            autoHeight  :  true,
            autoWidth   :  true
        });
    }

    if ($('#authorize_popup').length) {
        $('.header_registration').fancybox({
            padding     : 0,
            fitToView	: false,
            autoResize	: true,
            closeClick	: false,
            openEffect	: 'none',
            closeEffect	: 'none',
            autoHeight  :  true,
            autoWidth   :  true,
            afterShow  : function () {
                if (!$('.authorize_submit_btn canvas').length) {
                    Cufon.replace(".authorize_submit_btn", {fontFamily: 'DIN Pro Medium'});
                }
            }
        });
    }


    $('.fancy_close').on('click', function(){
        $('.fancybox-close').trigger('click');
        return false;
    });

    $('.authorize_submit_btn').on('click', function () {
        $(this).parent().find('input').trigger('click');
    });


    /* --------- placeholder ---------*/

    $('input[placeholder], textarea[placeholder]').placeholder();

    $('.footer_studio_logo > a').removeAttr('href');

    /* --------- input file ---------*/

    $('.wrapper').on('click', '.jobs_file_view, .jobs_fake_input', function(){
        $(this).closest('.jobs_form_field').find('.jobs_file_input').trigger('click');
        
        return false
    });

    $('.wrapper').on('change', '.jobs_file_input', function(){
        var fileName = $(this).val();

        if (window.navigator.userAgent.indexOf('MSIE') > 0) {
          fileName = fileName.substr(12, fileName.length);
        }

        $(this).closest('.jobs_form_field').find('.jobs_fake_input').val(fileName);
    });

});

function clickOnSubmit (links) {
    var direction = $(links);

    direction.on('click', function(){
        $(this).parent().find('input[type="submit"]').trigger('click');
        return false
    });
}

function accordeon (click_link) {
    var obj = click_link;
    var accordeonWrap =  obj.closest('li');
    var accordeonContent = accordeonWrap.find('.accordeon_content');

    if (!accordeonWrap.hasClass('active')) {
        obj.closest('.accordeon').find('.accordeon_content').stop(false, true).slideUp();
        accordeonContent.stop(false, true).slideDown();
        accordeonWrap.addClass('active').siblings().removeClass('active');
    } else {
        accordeonContent.stop(false, true).slideUp();
        accordeonWrap.removeClass('active');
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




