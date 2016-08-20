Place the folder "content edit" in the root of the site.
Then, follow the instructions below:



---=== Insert the style tag in the "head" ===---

    <script src="content_edit/js/jquery.js"></script>
    <!-- Optional. If you have connected "jquery" plugin, this plug is not necessary. -->

    <link rel="stylesheet" href="content_edit/css/editable.css">



---=== Insert scripts before the closing "body" ===---

    <script src="content_edit/js/editable.js"></script>

    <script>
        $(document).ready(function () {
            $('.edit').editable({
                type: 'textarea',
                url: '/post',
                pk: 1,
                placement: 'bottom',
                title: 'Enter comments'
            });

            //modify buttons style
            $.fn.editableform.buttons =
                    '<button type="submit" class="btn btn-success editable-submit"><i class="glyphicon glyphicon-ok"></i></button>' +
                    '<button type="button" class="btn editable-cancel"><i class="glyphicon glyphicon-remove"></i></button>';


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
        });
    </script>
