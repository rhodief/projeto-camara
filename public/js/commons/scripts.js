$(document).ready(function () {
	$('.header .bt-menu').click(function () {
		if ($(this).hasClass('act')) {
			fecharMenuHeader();
		} else {
			abrirMenuHeader();
		}
		return false;
	});
	$('.footer .bt-menu').click(function () {
		if ($(this).hasClass('act')) {
			fecharMenuFooter();
		} else {
			abrirMenuFooter();
		}
		return false;
	});
	$('.bg-menu').click(function () {
		fecharMenuHeader();
	});
	$('.main-menu > li > a').click(function () {
		if ($(this).hasClass('act')) {
			$('.main-menu > li > a').removeClass('act').parent().removeClass('act').children('.submenu').slideUp();
		} else {
			$('.main-menu > li > a').removeClass('act').parent().removeClass('act').children('.submenu').slideUp();
			$(this).addClass('act').parent().addClass('act').children('.submenu').slideDown();
		}
		return false;
	});
	/*$('.bt-submenu').click(function(){
		$(this).toggleClass('act').parent().toggleClass('act').next('.submenu').slideToggle();
		return false;
	});*/
	$('.bt-search').click(function () {
		abrirSubitem($('.search-form > a'));
		$('#buscarPortal').focusin();
		return false;
	});
	$('.menu-easy-access > li > a').click(function () {
		$('.menu-subitem > li').removeClass('act').children('.subitems-list').hide();
		abrirSubitem($(this));
		var firstChild = $('.menu-subitem > li:first-child > a');
		abrirSubitemList(firstChild);
		return false;
	});
	$('.bg-easy-access').click(function () {
		fecharSubitem();
	});
	$('.menu-subitem > li > a').click(function () {
		abrirSubitemList($(this));
		return false;
	});
	$('.notification .close').click(function () {
		$(this).parent().slideUp();
		return false;
	});

	var timeout;
	$('#buscarPortal').keyup(function (e) {
		clearTimeout(timeout);
		var delay = 500;
		var minLength = 3;
		var urlSiteMap = 'js/commons/sitemap.json';
		var input = this.value; var results = [];

		if (input.length >= minLength){
			_waitAndSearch(_showResults);
		}else{
			_showResults(true);
		} 

		function _waitAndSearch(callBack) {
			timeout = setTimeout(function () {
				_search(callBack);
			}, delay);
		}

		function _showResults(error, data) {
			var html = '<ul>';
			if(!error){
				for(let i=0;i<data.length;i++){
					var name = data[i].name;
					var description = data[i].description || '';
					var breadCrumbs = '';
					if(data[i].breadCrumbs){
						for(let j=0; j<data[i].breadCrumbs.length;j++){
							breadCrumbs+= data[i].breadCrumbs[j].name + ' / ';
						}
					} 
					html+= '<li>';
					html+= '<p class="directory">' + breadCrumbs + '</p>';
					html+= '<p class="name">' + name + '</p>';
					html+= '<p class="description">' + description + '</p>';
					html+= '</li>'
				}
			}
			html+= '</ul>';
			$('#ResultadoBusca').html(html);
		}

		function _search(callBack){
			$.get(urlSiteMap, function(){}, 'json').done(function(data){
				var error = false;
				//O Back-end que fará o trabalho de seleção. A função a seguir simulará o algoritmo do Back-end.
				_backendSearch(error, data, callBack);
			}).fail(function(error){
				var data = null;
				error.customError = 'Ocorreu um erro. Recarregue a página e tente novamente';
				callBack(error, data);
			});
		}

		function _backendSearch(error, data, callBack){
			_findRecursive(data.root, [{name:'HOME', url:''}]);
			callBack(error, results);
		}

		
		function _findRecursive(data, breadCrumbs){

			for(let i=0; i<data.length;i++){
				var index = i; var value = data[i]; var name = value.name; var desc = value.description || '';
				var nameSearch = _getMatch(input, name);
				if(nameSearch){
					value.name = _applyHighlight(name, nameSearch);
				}
				var descSearch;
				if(desc){
					descSearch = _getMatch(input, desc);
					if(descSearch){
						value.description = _applyHighlight(desc, descSearch);
					}
				}
				if(nameSearch || descSearch){
					value.breadCrumbs = breadCrumbs
					results.push(value);
				}
				if(Array.isArray(value.children)){
					var newBread = breadCrumbs.slice();
					newBread.push({name:name, url:''});
					_findRecursive(value.children, newBread);
				}
			}
		}
		function _applyHighlight(value, matchArray){
			var ret = '';
			for(let i = 0; i<matchArray.length;i++){
				ret = value.split(matchArray[i]).join('<strong>' + matchArray[i] + '</strong>')
			}
			return ret;
		}

		function _getMatch(search, target){
			var nameRegex = new RegExp(search, 'gi');
			return target.match(nameRegex);
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

$(document).mouseup(function (e) {
	var container = $('.menu .main-menu > li');
	if (!container.is(e.target) && container.has(e.target).length === 0) {
		$('.main-menu > li > a').removeClass('act').parent().removeClass('act').children('.submenu').slideUp();
	}
});

function abrirMenuHeader() {
	$('.header .bt-menu').addClass('act');
	$('.header .bg-menu').addClass('act').fadeIn();
	$('.header .menu').slideDown();
	fecharSubitem();
}
function fecharMenuHeader() {
	$('.header .bt-menu').removeClass('act');
	$('.header .bg-menu').removeClass('act').fadeOut();
	$('.header .menu').slideUp();
}
function abrirMenuFooter() {
	$('.footer .bt-menu').addClass('act');
	$('.footer .menu').slideDown();
	fecharSubitem();
}
function fecharMenuFooter() {
	$('.footer .bt-menu').removeClass('act');
	$('.footer .menu').slideUp();
}
function menu_max_height() {
	$('.header .menu').css('max-height', $(window).height() - $('.header').innerHeight());
}
function subItemHeight() {
	$('.subitem').css('max-height', $(window).height() - $('.header').innerHeight());
}
function fecharBusca() {
	$('.bt-search').removeClass('act');
	$('.box-search').css({ 'width': '0', 'overflow': 'hidden' });
}
function abrirSubitem(e) {
	if ($(e).parent().hasClass('act')) {
		$('.menu-easy-access > li').removeClass('act').children('.subitem').hide();
		$('.bg-easy-access').fadeOut();
		bodyScrollEnable();
	} else {
		$('.menu-easy-access > li').removeClass('act').children('.subitem').hide();
		$(e).parent().addClass('act').children('.subitem').show();
		$('.bg-easy-access').fadeIn();
		bodyScrollDisable();
	}
}
function fecharSubitem() {
	$('.menu-easy-access > li').removeClass('act').children('.subitem').slideUp();
	$('.bg-easy-access').fadeOut();
	bodyScrollEnable();
}
function abrirSubitemList(e) {
	if ($(e).parent().hasClass('act')) {
		$('.menu-subitem > li').removeClass('act').children('.subitems-list').hide();
	} else {
		$('.menu-subitem > li').removeClass('act').children('.subitems-list').hide();
		$(e).parent().addClass('act').children('.subitems-list').show();
		$('.subitem.transmissoes').css('min-height', $(e).parent().children('.subitems-list').innerHeight() + $(e).innerHeight() + 6);
	}
}
function atualizaMinHeight() {
	$('.h-window').css('min-height', $(window).height());
}
function bodyScrollDisable() {
	$('body').addClass('no-scroll');
}
function bodyScrollEnable() {
	$('body').removeClass('no-scroll');
}

function toggleDropdown(e) {
	$(e).parent().children('.dropdown').toggleClass('act');
	return false;
};