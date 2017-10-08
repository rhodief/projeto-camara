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

		if (input.length >= minLength) {
			_waitAndSearch(_showResults);
		} else {
			_showResults(true);
		}

		function _waitAndSearch(callBack) {
			timeout = setTimeout(function () {
				_search(callBack);
			}, delay);
		}

		function _showResults(error, data) {
			var html = '<ul>';
			if (!error) {
				for (var i = 0; i < data.length; i++) {
					var name = data[i].name;
					var description = data[i].description || '';
					var breadCrumbs = '';
					if (data[i].breadCrumbs) {
						for (var j = 0; j < data[i].breadCrumbs.length; j++) {
							breadCrumbs += data[i].breadCrumbs[j].name + ' / ';
						}
					}
					html += '<li>';
					html += '<p class="directory">' + breadCrumbs + '</p>';
					html += '<p class="name">' + name + '</p>';
					html += '<p class="description">' + description + '</p>';
					html += '</li>'
				}
			}
			html += '</ul>';
			$('#ResultadoBusca').html(html);
		}

		function _search(callBack) {
			$.get(urlSiteMap, function () { }, 'json').done(function (data) {
				var error = false;
				//O Back-end que fará o trabalho de seleção. A função a seguir simulará o algoritmo do Back-end.
				_backendSearch(error, data, callBack);
			}).fail(function (error) {
				var data = null;
				error.customError = 'Ocorreu um erro. Recarregue a página e tente novamente';
				callBack(error, data);
			});
		}

		function _backendSearch(error, data, callBack) {
			_findRecursive(data.root, [{ name: 'HOME', url: '' }]);
			callBack(error, results);
		}


		function _findRecursive(data, breadCrumbs) {

			for (var i = 0; i < data.length; i++) {
				var index = i; var value = data[i]; var name = value.name; var desc = value.description || '';
				var nameSearch = _getMatch(input, name);
				if (nameSearch) {
					value.name = _applyHighlight(name, nameSearch);
				}
				var descSearch;
				if (desc) {
					descSearch = _getMatch(input, desc);
					if (descSearch) {
						value.description = _applyHighlight(desc, descSearch);
					}
				}
				if (nameSearch || descSearch) {
					value.breadCrumbs = breadCrumbs
					results.push(value);
				}
				if (Array.isArray(value.children)) {
					var newBread = breadCrumbs.slice();
					newBread.push({ name: name, url: '' });
					_findRecursive(value.children, newBread);
				}
			}
		}
		function _applyHighlight(value, matchArray) {
			var ret = '';
			for (var i = 0; i < matchArray.length; i++) {
				ret = value.split(matchArray[i]).join('<strong>' + matchArray[i] + '</strong>')
			}
			return ret;
		}

		function _getMatch(search, target) {
			var nameRegex = new RegExp(search, 'gi');
			return target.match(nameRegex);
		}
	});

	$('.side-menu .bt-menu').click(function () {
		$(this).toggleClass('act');
		$('.corner-menu').toggleClass('act').slideToggle();
	});

	$('.corner-menu > li.has-submenu > a').click(function () {
		sideSubmenu($(this));
		return false;
	});
	$('.corner-menu > li.has-submenu.act > a').each(function () {
		sideSubmenu($(this));
	});

	$('.settings-icon').click(function(){
		$(this).toggleClass('act').next('.site-settings').toggleClass('act');
		$('.toogle-show').fadeToggle();
		return false;
	});
	$('.font-size.less').click(function(){
		var size = $("html").css('font-size').replace('px', '');
		if (size > 12){
			$("html").css('font-size', (--size)+'px');
		}
		return false;
	});
	$('.font-size.more').click(function(){
		var size = $("html").css('font-size').replace('px', '');
		if (size < 20){
			$("html").css('font-size', (++size)+'px');
		}
		return false;
	});
	$('.font-size.reset').click(function(){
		var size = $("html").css('font-size').replace('px', '');
		$("html").css('font-size', '100%');
		return false;
	});
	$('.hight-contrast').click(function(){
		$("html").addClass('hight-contrast');
		$(this).addClass('act');
		return false;
	});
	$('.normal-contrast').click(function(){
		$("html").removeClass('hight-contrast');
		$('.box-contrast a').removeClass('act');
		return false;
	});
	$('.share-button').click(function(){
		$(this).parent().toggleClass('act').children('.box-options').slideToggle();
	});
	
	// ATALHOS DO TECLADO!!!
	var sectionIndex = 0;
	$('html').keydown(function (e) {
		//Alt + Shift + 
		var control = e.altKey && e.shiftKey;
		if (control && e.which == 48) {
			goToTop();
		}
		if (control && e.which == 49) {
			goToMenu();
		}
		if (control && e.which == 50) {
			goToEasyAccess();
		}
		if (control && e.which == 51) {
			goToSection(sectionIndex);
			(sectionIndex >= 4 ? sectionIndex = 0 : sectionIndex++);
		}
		if(control && e.which == 52){
			goToFooter();
		}

	});
	
	
	$('*[data-dialog-type]').on('click', function(e){
		/******
		// data-dialog-type[type, position]
		//// type: 1 = question (botao ok + cancelar)
		//// type: 2 = ok (somente botao ok)
		//// position: 0 = adiciona o dialogo apos o elemento
		//// position: 1 = posicao absoluta ao pai do elento clicado
		//// position: 2 = posicao fixa ao html
		******/	
		e.preventDefault();
		var dialogValues = $(this).attr('data-dialog-type').split(',');
		var buttons = '';
		var message = '';
		var acceptFunction = '';
		var cancelFunction = '';
		var positionClass = '';
		
		if ($(this).attr('data-dialog-accept-function') != ''){
			acceptFunction = 'onclick="'+$(this).attr('data-dialog-accept-function')+'"';
		}
		if ($(this).attr('data-dialog-cancel-function') != ''){
			cancelFunction = 'onclick="'+$(this).attr('data-dialog-cancel-function')+'"';
		}
		var acceptButton = '<button class="button accept invert-contrast" '+acceptFunction+'>Ok</button>'
		var cancelButton = '<button class="button cancel" '+cancelFunction+'>Cancelar</button>'
		$(this).addClass('target');
		if (dialogValues[0] == 1){
			buttons = acceptButton;
		}
		if (dialogValues[0] == 2){
			buttons = acceptButton+''+cancelButton;
		}
		if ($(this).attr('data-dialog-message') != ''){
			message = '<div class="box-text"><p class="message">'+$(this).attr('data-dialog-message')+'</p></div>'
		};
		$('.box-dialog, .bg-dialog').remove();
		if(dialogValues[1] == 0){
			positionClass = 'position-0';
		};
		if(dialogValues[1] == 1){
			positionClass = 'position-1';
		};
		if(dialogValues[1] == 2){
			positionClass = 'position-2';
		};
		var html = '<div class="box-dialog '+positionClass+'"><div class="center"><div class="middle shadow">'+message+'<div class="box-buttons">'+buttons+'</div></div></div></div><div class="bg-dialog"></div>';
		$(html).hide().insertAfter($(this)).fadeIn().parent().css('position', 'relative');
		//$(this).after(html).fadeIn().parent().css('position', 'relative');
	});
	
	moverRecomendados();
	menu_max_height();
	atualizaMinHeight();
	subItemHeight();
	imgColorChange();
});
$(window).resize(function (e) {
	moverRecomendados();
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

function blockScroll(e) {
	var scrollTo = null;
	if (e.type == 'mousewheel') {
		scrollTo = (e.originalEvent.wheelDelta * -1);
	}
	else if (e.type == 'DOMMouseScroll') {
		scrollTo = 40 * e.originalEvent.detail;
	}

	if (scrollTo) {
		e.preventDefault();
		$(this).scrollTop(scrollTo + $(this).scrollTop());
	}
}
function sideSubmenu(e) {
	if ($(e).hasClass('act')) {
		$('.corner-menu > li.has-submenu > a').removeClass('act').parent().removeClass('act').children('.submenu').slideUp();
	} else {
		$('.corner-menu > li.has-submenu > a').removeClass('act').parent().removeClass('act').children('.submenu').slideUp();
		$(e).addClass('act').parent().addClass('act').children('.submenu').slideDown();
	}
}
function moverRecomendados() {
	if ($(window).width() > 1023) {
		$('.box-see-too').appendTo('.box-side');
	} else {
		$('.box-see-too').appendTo('.article-sidebar > .center');
	}
}

function goToTop() {
	scrollToElement('#header');
	$('#logo').focus();
}

function goToMenu() {
	scrollToElement('#menu');
	$('#menu li a').first().focus()
}

function goToEasyAccess() {
	scrollToElement('#easy-access');
	$('#easy-access li a').first().focus();
}

function goToSection(index){
	var selector = '#section-' + (index + 1);
	scrollToElement(selector);
	$(selector + ' li a, ' + selector + ' button').first().focus();
}

function goToFooter(){
	scrollToElement('footer');
	$('footer .footer-links a').first().focus();
}

function scrollToElement(scrollToId) {
	var container = $('html, body'),
		scrollTo = $(scrollToId);
	animateScroll(container, scrollTo);
}


function scrollToDivPoint(containerEl, pointEl) {
	var container = $(container),
		scrollTo = $(pointEl);

	container.animate({
		scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
	});
}

function animateScroll(container, scrollTo){
	container.animate({
		scrollTop: scrollTo.offset().top
	});
}

function acceptButton(e){
	/*$(e).parent().parent().find('.target').removeClass('target').click();
	cancelButton($(e));*/
};
function cancelButton(e){
	$('.box-dialog').parent().css('position','').find('.target').removeClass('target');
	$('.box-dialog, .bg-dialog').fadeOut("normal", function() {
        $(this).remove();
    });
};