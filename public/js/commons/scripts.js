$(document).ready(function(){
	$('.bt-menu').click(function(){
		if($(this).hasClass('act')){
			fecharMenu();
		}else{
			abrirMenu();
		}
		return false;
	});
	$('.bg-menu').click(function(){
		fecharMenu();
	});
	$('.main-menu > li > a').click(function(){
		if($(this).hasClass('act')){
			$('.main-menu > li > a').removeClass('act').parent().removeClass('act').children('.submenu').slideUp();
		}else{
			$('.main-menu > li > a').removeClass('act').parent().removeClass('act').children('.submenu').slideUp();
			$(this).addClass('act').parent().addClass('act').children('.submenu').slideDown();
		}
		return false;
	});
	/*$('.bt-submenu').click(function(){
		$(this).toggleClass('act').parent().toggleClass('act').next('.submenu').slideToggle();
		return false;
	});*/
	$('.bt-search').click(function(){
		if($(this).hasClass('act')){
			fecharBusca();
		}else{
			abrirBusca();
		}
		return false;
	});
	$('.bg-search').click(function(){
		fecharBusca();
	});
	$('.menu-easy-access > li > a').click(function(){
		$('.menu-subitem > li').removeClass('act').children('.subitems-list').hide();
		abrirSubitem($(this));
		var firstChild = $('.menu-subitem > li:first-child > a');
		abrirSubitemList(firstChild);
		return false;
	});
	$('.bg-easy-access').click(function(){
		fecharSubitem();
	});
	$('.menu-subitem > li > a').click(function(){
		abrirSubitemList($(this));
		return false;
	});
	$('.notification .close').click(function(){
		$(this).parent().slideUp();
		return false;
	});
	
	
	menu_max_height();
});
$(window).resize(function (e) {
	menu_max_height();
});

function abrirMenu(){
	$('.bt-menu').addClass('act');
	$('.bg-menu').addClass('act').fadeIn();
	$('.header .menu').slideDown();
	fecharSubitem();
}
function fecharMenu(){
	$('.bt-menu').removeClass('act');
	$('.bg-menu').removeClass('act').fadeOut();
	$('.header .menu').slideUp();
}
function menu_max_height(){
	$('.header .menu').css('max-height', $(window).height() - $('.header').innerHeight());
}
function abrirBusca(){
	$('.bt-search').addClass('act');
	$('.bg-search').addClass('act').fadeIn();
	$('.box-search').css({'width': '100%','overflow':'none'});
	$('#buscarPortal').focus();
}
function fecharBusca(){
	$('.bt-search').removeClass('act');
	$('.bg-search').removeClass('act').fadeOut();
	$('.box-search').css({'width': '0','overflow': 'hidden'});
}
function abrirSubitem(e){
	if($(e).parent().hasClass('act')){
		$('.menu-easy-access > li').removeClass('act').children('.subitem').hide();
		$('.bg-easy-access').fadeOut();
	}else{
		$('.menu-easy-access > li').removeClass('act').children('.subitem').hide();
		$(e).parent().addClass('act').children('.subitem').show();
		$('.bg-easy-access').fadeIn();
	}
}
function fecharSubitem(){
	$('.menu-easy-access > li').removeClass('act').children('.subitem').slideUp();
	$('.bg-easy-access').fadeOut();
}
function abrirSubitemList(e){
	if($(e).parent().hasClass('act')){
		$('.menu-subitem > li').removeClass('act').children('.subitems-list').hide();
	}else{
		$('.menu-subitem > li').removeClass('act').children('.subitems-list').hide();
		$(e).parent().addClass('act').children('.subitems-list').show();
	}
}