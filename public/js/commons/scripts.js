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
		abrirSubitem($('.search-form > a'));
		$('#buscarPortal').focusin();
		return false;
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

	var timeout;
	$('#buscarPortal').keyup(function(e){
		var delay = 500;
		var results;
		var value = this.value;

		if(value.length > 3){
			_waitAndSearch(_showResults);
		}

		function _waitAndSearch(callBack){
			setTimeout(function(){ alert("Hello") }, 3000);
		}

		function _showResults(results){

		}
	})
	
	menu_max_height();
	atualizaMinHeight();
	subItemHeight();
});
$(window).resize(function (e) {
	menu_max_height();
	atualizaMinHeight();
	subItemHeight();
});

$(document).mouseup(function(e) 
{
    var container = $('.menu .main-menu > li');
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
		$('.main-menu > li > a').removeClass('act').parent().removeClass('act').children('.submenu').slideUp();
    }
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
function subItemHeight(){
	$('.subitem').css('max-height', $(window).height() - $('.header').innerHeight());
}
function fecharBusca(){
	$('.bt-search').removeClass('act');
	$('.box-search').css({'width': '0','overflow': 'hidden'});
}
function abrirSubitem(e){
	if($(e).parent().hasClass('act')){
		$('.menu-easy-access > li').removeClass('act').children('.subitem').hide();
		$('.bg-easy-access').fadeOut();
		bodyScrollEnable();
	}else{
		$('.menu-easy-access > li').removeClass('act').children('.subitem').hide();
		$(e).parent().addClass('act').children('.subitem').show();
		$('.bg-easy-access').fadeIn();
		bodyScrollDisable();
	}
}
function fecharSubitem(){
	$('.menu-easy-access > li').removeClass('act').children('.subitem').slideUp();
	$('.bg-easy-access').fadeOut();
	bodyScrollEnable();
}
function abrirSubitemList(e){
	if($(e).parent().hasClass('act')){
		$('.menu-subitem > li').removeClass('act').children('.subitems-list').hide();
	}else{
		$('.menu-subitem > li').removeClass('act').children('.subitems-list').hide();
		$(e).parent().addClass('act').children('.subitems-list').show();
		$('.subitem.transmissoes').css('min-height', $(e).parent().children('.subitems-list').innerHeight() + $(e).innerHeight() + 6);
	}
}
function atualizaMinHeight(){
	$('.h-window').css('min-height',$(window).height());
}
function bodyScrollDisable(){
	$('body').addClass('no-scroll');
}
function bodyScrollEnable(){
	$('body').removeClass('no-scroll');
}

function toggleDropdown(e){
	$(e).parent().children('.dropdown').toggleClass('act');
	return false;
};