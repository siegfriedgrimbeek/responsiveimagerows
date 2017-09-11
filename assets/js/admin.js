jQuery(document).ready(function(e) {
    var $ = jQuery;

    (function() {
        tinymce.PluginManager.add('rir_plugin', function(editor, url) {

            // Add a button that opens a window
            editor.addButton('rir_button_key', {

                
                title: 'Add Row of Images',
                //In js folder, not great, need to fix
                //image : url + '/btn-icon.png',
                icon: true,
                classes: 'rir-custom-btn',

                onclick: function() {
                    // Open window
                    editor.windowManager.open({
                        title: 'Insert Images ',

                        body: [{
                            type: 'label', text: 'Select up to five images which will be inserted in a row.',
                            classes: 'rir-header'
                        },{
                            type: 'label', text: 'If you would like more than one row, just insert another after you have inserted a row.',
                            classes: 'rir-subheader'
                        }, {
                            type: 'textbox',
                            name: 'imageOne',
                            label: 'Image One',
                            classes: 'rir-image-uploader'

                        }, {
                            type: 'textbox',
                            name: 'imageTwo',
                            label: 'Image Two',
                            classes: 'rir-image-uploader'

                        }, {
                            type: 'textbox',
                            name: 'imageThree',
                            label: 'Image Three',
                            classes: 'rir-image-uploader'

                        }, {
                            type: 'textbox',
                            name: 'imageFour',
                            label: 'Image Four',
                            classes: 'rir-image-uploader'

                        }, {
                            type: 'textbox',
                            name: 'imageFive',
                            label: 'Image Five',
                            classes: 'rir-image-uploader'

                        }],
                        onsubmit: function(e) {

                            var dataObject = e.data;
                            var gridCount = 0;
                            var i;

                            for (i in dataObject) {
                                if (dataObject.hasOwnProperty(i)) {
                                    if (dataObject[i] != "") {
                                        gridCount++;
                                    }
                                }
                            }


                            if ((dataObject.imageOne != "") || (dataObject.imageTwo != "") || (dataObject.imageThree != "") || (dataObject.imageFour != "") || (dataObject.imageFive != "")) {

                                var content = "[rir_row class=\"rir-row\"]";

                                if (dataObject.imageOne != "") {
                                    content += "[rir_item class=\"rir-cols-" + gridCount + "\"]<img src=\"" + dataObject.imageOne + "\" class=\"alignnone\"/>[/rir_item]";
                                }

                                if (dataObject.imageTwo != "") {
                                    content += "[rir_item class=\"rir-cols-" + gridCount + "\"]<img src=\"" + dataObject.imageTwo + "\" class=\"alignnone\"/>[/rir_item]";
                                }

                                if (dataObject.imageThree != "") {
                                    content += "[rir_item class=\"rir-cols-" + gridCount + "\"]<img src=\"" + dataObject.imageThree + "\" class=\"alignnone\"/>[/rir_item]";
                                }

                                if (dataObject.imageFour != "") {
                                    content += "[rir_item class=\"rir-cols-" + gridCount + "\"]<img src=\"" + dataObject.imageFour + "\" class=\"alignnone\"/>[/rir_item]";
                                }

                                if (dataObject.imageFive != "") {
                                    content += "[rir_item class=\"rir-cols-" + gridCount + "\"]<img src=\"" + dataObject.imageFive + "\" class=\"alignnone\"/>[/rir_item]";
                                }

                                content += "[/rir_row]";

                                editor.insertContent(content);

                            }

                        }

                    });

                    $('.mce-rir-image-uploader').click(function(e) {
                        e.preventDefault();

                        var $upload_button = $(this);

                        //Extend the wp.media object
                        custom_uploader = wp.media.frames.file_frame = wp.media({
                            title: 'Choose Image',
                            button: {
                                text: 'Choose Image'
                            },
                            multiple: false
                        });

                        var count = 0;

                        //When a file is selected, grab the URL and set it as the text field's value
                        custom_uploader.on('select', function() {
                            var attachment = custom_uploader.state().get('selection').first().toJSON();
                            $upload_button.val(attachment.url);
                            count++;
                        });


                        //Open the uploader dialog
                        custom_uploader.open();

                    });

                    var inputWidth = $('.mce-rir-image-uploader').width() - 40;

                    $('.mce-rir-image-uploader').each(function(){
                        
                        $(this).width(inputWidth);
                        $(this).after("<span class=\"dashicons dashicons-no-alt rir-clear-input\"></span>");
                        
                        $(this).after("<span class=\"dashicons dashicons-arrow-up-alt2\"></span>");
                        $(this).click(function(){
                           
                        });

                    });

                    $(document.body).on('click','.rir-clear-input', function(e) {
                           $(this).siblings().val("");
                    });
                }

            });

        });

    })();


});
