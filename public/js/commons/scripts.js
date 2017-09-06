$(document).ready(function(){
	$('.header .bt-menu').click(function(){
		if($(this).hasClass('act')){
			fecharMenuHeader();
		}else{
			abrirMenuHeader();
		}
		return false;
	});
	$('.footer .bt-menu').click(function(){
		if($(this).hasClass('act')){
			fecharMenuFooter();
		}else{
			abrirMenuFooter();
		}
		return false;
	});
	$('.bg-menu').click(function(){
		fecharMenuHeader();
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
	atualizaMinHeight();
});
$(window).resize(function (e) {
	menu_max_height();
	atualizaMinHeight();
});

function abrirMenuHeader(){
	$('.header .bt-menu').addClass('act');
	$('.header .bg-menu').addClass('act').fadeIn();
	$('.header .menu').slideDown();
	fecharSubitem();
}
function fecharMenuHeader(){
	$('.header .bt-menu').removeClass('act');
	$('.header .bg-menu').removeClass('act').fadeOut();
	$('.header .menu').slideUp();
}
function abrirMenuFooter(){
	$('.footer .bt-menu').addClass('act');
	$('.footer .menu').slideDown();
	fecharSubitem();
}
function fecharMenuFooter(){
	$('.footer .bt-menu').removeClass('act');
	$('.footer .menu').slideUp();
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
function atualizaMinHeight(){
	$('.h-window').css('min-height',$(window).height());
}