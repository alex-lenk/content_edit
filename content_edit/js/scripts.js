$(document).ready(function () {
    $('.edit').editable({
        type: 'textarea',
        url: '/post',
        pk: 1,
        placement: 'bottom',
        title: 'Начните перевод'
    });

    //modify buttons style
    $.fn.editableform.buttons =
        '<button type="submit" class="btn btn-success editable-submit" title="созранить"><i class="glyphicon glyphicon-ok"></i></button>' +
        '<button type="button" class="btn editable-cancel" title="отмена"><i class="glyphicon glyphicon-remove"></i></button>';


    //ajax emulation
    $.mockjax({
        url: '/post',
        responseTime: 400,
        response: function (settings) {
            if (settings.data.value == 'err') {
                this.status = 500;
                this.responseText = 'Server-side error';
            } else {
                this.responseText = "";
            }
        }
    });


    /* Переход по ссылкам и вопрос о закрытии окна браузера */
    function Unloader() {

        var o = this;

        this.unload = function (evt) {
            var message = "Вы уверены, что хотите покинуть страницу оформления заказа?";
            if (typeof evt == "undefined") {
                evt = window.event;
            }
            if (evt) {
                evt.returnValue = message;
            }
            return message;
        };

        this.resetUnload = function () {
            $(window).off('beforeunload', o.unload);

            setTimeout(function () {
                $(window).on('beforeunload', o.unload);
            }, 2000);
        };

        this.init = function () {

            $(window).on('beforeunload', o.unload);

            $('a').on('click', function () {
                o.resetUnload
            });
            $(document).on('submit', 'form', function () {
                o.resetUnload
            });
            $(document).on('keydown', function (event) {
                if ((event.ctrlKey && event.keyCode == 116) || event.keyCode == 116) {
                    o.resetUnload;
                }
            });
        };
        this.init();
    }

    $(function () {
        if (typeof window.obUnloader != 'object') {
            window.obUnloader = new Unloader();
        }
    });


    /* Перехватываем нажатия: F5, CTRL+F5, CTRL+R, CTRL+SHIFT+R */
    document.onkeydown = function (e) {
        if (e.key === 'F5' || e.keyCode == 116 || // F5 or CTRL+F5
            (e.key === 'r' || e.key === 'R' || e.keyCode == 82) && e.ctrlKey // CTRL+R
        ) {
            return false;
        }
    };

    window.onload = function () {
        alert('Страница загрузилась, приступайте к переводу.');
    }
});
