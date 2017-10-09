(function () {
    'use strict';

    angular.module('dialog', []);
})();

(function () {
    'use strict';

    angular
        .module ('dialog')
        .directive ('dialog', dialog);

    dialog.$inject = ['$compile'];

    function dialog($compile) {
        var directive = {
            link: link,
            scope:{
                onOk:'&',
                onCancel:'&'
            },
            restrict: 'E',
            template: '<div></div>',
            replace: true
        };

        function link(scope, element, attrs) {
            var newElement;
            scope.cancelButton = cancelButton;
            scope.okButton = okButton;
            element.bind('click', function(e){
                var dialogValues = element.attr('type').split(',');
                var buttons = '';
                var message = '';
                var acceptFunction = '';
                var cancelFunction = '';
                var positionClass = '';
                
                if (element.attr('on-ok') != ''){
                    acceptFunction = 'ng-click="okButton()"';
                }
                if (element.attr('ok-cancel') != ''){
                    cancelFunction = 'ng-click="cancelButton()"';
                }
                var acceptButton = '<button class="button accept invert-contrast" '+acceptFunction+'>Ok</button>'
                var cancelButton = '<button class="button cancel" '+cancelFunction+'>Cancelar</button>'
                element.addClass('target');
                if (dialogValues[0] == 1){
                    buttons = acceptButton;
                }
                if (dialogValues[0] == 2){
                    buttons = acceptButton+''+cancelButton;
                }
                if (element.attr('message') != ''){
                    message = '<div class="box-text"><p class="message">'+element.attr('message')+'</p></div>'
                };
                angular.element(document.querySelector('.box-dialog, .bg-dialog')).remove();
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
                newElement = $compile(html)(scope);
                newElement.hide().insertAfter(element).fadeIn().parent().css('position', 'relative');
            });

            function okButton(){
                if(scope.onOk) scope.onOk();
                close();
            }

            function cancelButton(){
                if(scope.onCancel) scope.onCancel();
                close();
            }

            function close(){
                angular.element(document.querySelector('.box-dialog')).parent().css('position', '').find('.target').removeClass('target');
                angular.element(document.querySelector('.box-dialog, .bg-dialog')).fadeOut("normal", function() {
                    newElement.remove();
                });
            };
            
        }
        
        return directive;
    }

})();

