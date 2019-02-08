/*
|||||
|||||	READY
|||||
*/
$(document).ready(function(e) {
	// menu effect	
	if($(window).width()>=1100){
		hc_menu_effect();
	}else{
		hc_menu_mobile_effect();
	}

	// Menu
	$('a.hc_main_menu').click(function(){
		window.location.hash = "#"+$(this).attr('id');		
		hc_menu_effect();
	});
	// Menu Mobile
	$('a.hc_main_menu_mb').click(function(){
		window.location.hash = "#"+$(this).attr('id').replace('_mb','');		
		hc_menu_mobile_effect();
	});
	// Menu Mobile
	$('#mobile_menu_icon').click(function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			hc_menu_mobile_show(false);
		}else{
			$(this).addClass('active');
			hc_menu_mobile_show(true);
		}
	});
	// Scroll Top Event
	$(document).scroll(hc_scroll_event);
    // Slide
	hc_slider_setup();
	$(window).resize(hc_slider_setup);
});

/*
|||||
|||||	SLIDER
|||||
*/
var hc_slider_load = 0;
var hc_slider_max = 0;
var hc_slider_time;
var hc_slider_running=false;

// Chạy Slide
function hc_slide_to(next) {
    clearTimeout(hc_slider_time);
    var _n = hc_slider_load;
    if (next) {
        _n++;
        if (_n > hc_slider_max) _n = 1;
    } else {
        _n--;
        if (_n < 1) _n = hc_slider_max;
    }
    $('#slider_desc_' + hc_slider_load).stop().animate({ opacity: 0 }, 200, function () {
        $(this).css('display','none');
    });
    $('#slider_title_' + hc_slider_load).stop().animate({ opacity: 0 }, 200, function () {
        $(this).css('display', 'none');
        $('#slider_img_' + hc_slider_load).stop().animate({ opacity: 0 }, 1000, function () {
            $('#slider_img_' + _n).stop().animate({ opacity: 0.8 }, 1000, function () {
                $('#slider_desc_' + +_n).css('display', 'block').stop().animate({ opacity: 1 }, 1000);
                $('#slider_title_' + +_n).css('display', 'block').stop().animate({ opacity: 1 }, 1000, function () {
                    hc_slider_load = _n;
                    hc_slider_time = setTimeout("hc_slide_to(true)", 10000);
                });
            });
        });
    });
}

// Cài đặt thông số
function hc_slider_setup() {
    hc_slider_max = $('.slider_img').length;
    hc_slider_load = 0;
    $('.slider_img').each(function (index, element) {       
        $(element).HCLoad(function () {
            hc_slider_load++;
        });
    });
    hc_slider_time = setInterval("hc_slider_wait()", 100);
}
// Chờ ảnh
var _start_wait_counting = 0;
function hc_slider_wait() {
    if (hc_slider_load == hc_slider_max) {
		console.log('>> Đã load hết hình');
        clearInterval(hc_slider_time);
        hc_slider_resize();
    }else{
		_start_wait_counting++;
		if(_start_wait_counting>=50){
			console.log('>> Chờ quá 10 giây');
			clearInterval(hc_slider_time);
			hc_slider_load = hc_slider_max;
        	hc_slider_resize();
		}
	}
}
// Gán vị trí
function hc_slider_resize() {
    var hc_w = $(window).width();
    var hc_h = $(window).height();
    $('.slider_img').each(function () {
        $(this).css('width','100%');
        if ($(this).height() < hc_h) {
            $(this).css('width','auto').css('height','100%')
            .css('top', '0px').css('left', ((hc_w - $(this).width()) / 2) + 'px');
        } else {
            $(this).css('top', ((hc_h - $(this).height()) / 2) + 'px').css('left', '0px');
        }
    });
    $('.slider_title').css('margin-top', (hc_h/3) + 'px');

    if (!hc_slider_running) {        
        hc_slider_running = true;
        hc_slider_load = 1;
        $('#hc_slide').css('background-image', 'none').css('background-color', '#666');
        $('#slider_img_1').css('opacity', '0.8');
        $('#slider_title_1').css('display', 'block').css('opacity', '1');
        $('#slider_desc_1').css('display', 'block').css('opacity', '1');
        hc_slider_time = setTimeout("hc_slide_to(true)", 10000);
    }
}
jQuery.fn.extend({
    HCLoad: function (handler) {
        return this.each(function () {
            if (this.complete) {
                handler.call(this);
            } else {
                $(this).load(handler);
            }
        });
    }
});


/*
|||||
|||||	CROLL EVENT
|||||
*/
function hc_scroll_event(){
	var scrolltop = $(document).scrollTop();
	var div = 250;
	// Data
	var _hc_slide = 0;
	var _hc_advertising = $('#hc_advertising').position().top;
	//var _hc_price = $('#hc_price').position().top;
	var _hc_hospital = $('#hc_hospital').position().top;
	var _hc_sponsor = $('#hc_sponsor').position().top;
	var _hc_contact = $('#hc_contact').position().top;
	// Slide
	if(scrolltop<_hc_advertising-div){
		hc_change_menu_to('slide');
	}
	// Advertising
	else if(scrolltop>_hc_advertising-div && scrolltop < _hc_hospital-div){
		hc_change_menu_to('advertising');
	}
	// Price
	/*
	else if(scrolltop>_hc_price-div && scrolltop < _hc_hospital-div){
		hc_change_menu_to('price');
	} */
	// hospital
	else if(scrolltop>_hc_hospital-div && scrolltop < _hc_sponsor-div){
		hc_change_menu_to('hospital');
	}
	// sponsor
	else if(scrolltop>_hc_sponsor-div && scrolltop < _hc_contact-div){
		hc_change_menu_to('sponsor');
	}
	// Contact
	else{
		hc_change_menu_to('contact');
	}	
}
function hc_change_menu_to(hash){
	$('a.hc_main_menu_mb').removeClass('active');
	$('#'+hash+'_mb').addClass('active');
	$('a.hc_main_menu').removeClass('active');
	$('#'+hash).addClass('active');
	window.location.hash = '#'+hash;
}

/*
|||||
|||||	MENU MOBILE SHOW & EFFECT
|||||
*/

function hc_menu_mobile_show(show){
	var top_menu_height = $('#hc_top_menu').outerHeight();
	if(show){
		$('#mobile_menu_pane').stop().css('top',top_menu_height+'px').animate({
			right:'0px'
		},200,'linear');
	}
	else
	{
		$('#mobile_menu_pane').stop().css('top',top_menu_height+'px').animate({
			right:'-250px'
		}, 200, 'linear');
	}
}
function hc_menu_mobile_effect(){
	var top_menu_height = $('#hc_top_menu').outerHeight();
	var hash = window.location.hash;
	if(hash.length==0){
		hash = "#slide";
	}
	window.location.hash = hash;
	hash = hash.split('#')[1];
	var target_id = "hc_"+hash;
	var target_top = $('#'+target_id).position().top-top_menu_height;
	$("html, body").stop().animate({
		scrollTop:target_top
	},500,'linear');	
	$('a.hc_main_menu_mb').removeClass('active');
	$('#'+hash+'_mb').addClass('active');
	$('a.hc_main_menu').removeClass('active');
	$('#'+hash).addClass('active');	
}

/*
|||||
|||||	MENU EFFECT
|||||
*/
function hc_menu_effect(){
	var top_menu_height = $('#hc_top_menu').outerHeight();
	var hash = window.location.hash;
	if(hash.length==0){
		hash = "#slide";
	}
	window.location.hash = hash;
	hash = hash.split('#')[1];
	var target_id = "hc_"+hash;
	var target_top = $('#'+target_id).position().top-top_menu_height;
	$("html, body").stop().animate({
		scrollTop:target_top
	},500,'linear');	
	$('a.hc_main_menu').removeClass('active');
	$('#'+hash).addClass('active');
	$('a.hc_main_menu_mb').removeClass('active');
	$('#'+hash+'_mb').addClass('active');	
}