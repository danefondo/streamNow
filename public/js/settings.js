$(document).ready(function () { 

    let coreURL =  'dashboard';
    let uploadData = {};

    function init_save_settings() {
        let core = 'accounts'

        $('.save_name_button').off('click');
        $('.save_name_button').on('click', function() {
            let data =  {};
            let button = $(this);
            let original_text = button.text();
            button.text('Saving...');

            let first_name = $('*[data-field="firstname"]');
            let last_name = $('*[data-field="lastname"]');
            data.first_name = first_name;
            data.last_name = last_name;
            let url = '/' + core + '/updateName';

            saveData(data, url, button, original_text);
        })

        $('.save_description_button').off('click');
        $('.save_description_button').on('click', function() {
            let data =  {};
            let button = $(this);
            let original_text = button.text();
            button.text('Saving...');

            let description = $('*[data-field="description"]');
            data.description = description;
            let url = '/' + core + '/updateDescription';

            saveData(data, url, button, original_text);
        })

        $('.save_pass_button').off('click');
        $('.save_pass_button').on('click', function() {

            let button = $(this);
            let data =  {};
            let original_text = button.text();
            let error_container = button.siblings('.inputErrorContainer');
            let success_container = button.siblings('.inputSuccessContainer');
            let modal_error_container = $('.passwordChangeErrorNotifier__accountSettings');
            let modal_error_text = modal_error_container.children('.passwordChangeError__accountSettings');

            success_container.hide();
            success_container.children('.inputSuccessText').text("");

            let password = $('*[data-field="password"]').val();
            let passconfirm = $('*[data-field="passconfirm"]').val();

            if (password !== passconfirm) {
                error_container.show();
                error_container.children('.inputErrorText').text("Passwords don't match!");
                return;
            } else if (!password || !passconfirm) {
                error_container.show();
                error_container.children('.inputErrorText').text("Passwords can't be empty!");
                return;
            } else {
                error_container.hide();
                error_container.children('.inputErrorText').text("");
            }

    
            let pass_modal = $('.modal__changePassword');

            pass_modal.show();


            function clear_currentpass_confirm(modal) {
                modal_error_container.siblings('.stream_input').val('');
                modal_error_container.hide();
                modal_error_text.text('');
                modal.hide();
                button.text(original_text);
            }
            
            $('.cancelChangePassword').off('click');
            $('.cancelChangePassword').on('click', function() {
                clear_currentpass_confirm(pass_modal);
            })
        
            $('.modalBackground__changePassword').off('click');
            $('.modalBackground__changePassword').on('click', function() {
                clear_currentpass_confirm(pass_modal);
            })
        
            // Press esc key to hide
            $(document).keydown(function(event) { 
              if (event.keyCode == 27) { 
                  if (pass_modal.length) {
                      let modalState = pass_modal.css('display');
                      if (modalState == "block") {
                        clear_currentpass_confirm(pass_modal);
                      }
                  }
              }
            });

            button.text('Saving...');

            let url = '/' + core + '/updatePassword';

            $('.confirmChangePassword').off('click');
            $('.confirmChangePassword').on('click', function() {
        
                let currentpass = $('*[data-field="currentpass"]').val();
                console.log("cp", currentpass);
                console.log("p", password);
                console.log("pc", passconfirm);
    
                data.password = password;
                data.passconfirm = passconfirm;
                data.currentpass = currentpass;            

                $.ajax({
                    data: data,
                    type: 'POST',
                    url: url,
                    success: function(response) {
                        //- reset modal, reset fields, reset errors, display success
                        button.text(original_text);
                        error_container.hide();
                        error_container.children('.inputErrorText').text("");
                        pass_modal.hide();
                        clear_currentpass_confirm(pass_modal);
                        success_container.show();
                        success_container.children('.inputSuccessText').text("Password successfully changed!");
                        modal_error_text.text("");
                        modal_error_container.hide();
                        $('*[data-field="password"]').val("");
                        $('*[data-field="passconfirm"]').val("");
                    },
                    error: function(err) {
                        console.log("err", err);
                        modal_error_text.text(err.responseJSON.message);
                        modal_error_container.show();
                        button.text(original_text);
                    }
                })
            });
        })

        $('.save_username_button').off('click');
        $('.save_username_button').on('click', function() {
            let data =  {};
            let button = $(this);
            let original_text = button.text();
            button.text('Saving...');

            let username = $('*[data-field="username"]');

            data.username = username;
            let url = '/' + core + '/updateUsername';

            saveData(data, url, button, original_text);
        })

        $('.save_email_button').off('click');
        $('.save_email_button').on('click', function() {
            let data =  {};
            let button = $(this);
            let original_text = button.text();
            button.text('Saving...');

            let email = $('*[data-field="email"]');

            data.email = email;
            let url = '/' + core + '/updateEmail';

            saveData(data, url, button, original_text);
        })

    }
    init_save_settings();

    function saveData(data, url, button, original_text) {
        $.ajax({
            data: data,
            type:'POST',
            url: url,
            success: function(response) {
                button.text(original_text);
            },
            error: function(err) {
                button.siblings('.inputErrorContainer').children('.inputErrorText').show().text(err.message);
            }
        });
    }



    function init_delete_confirm() {
        let delete_button = $('.deleteAccountButton');
        delete_button.off('click');
        delete_button.on('click', function() {

            let delete_modal = $('.modal__deleteAccount');

            delete_modal.show();
            
            $('.cancelPermaDeleteAccount').off('click');
            $('.cancelPermaDeleteAccount').on('click', function() {
                delete_modal.hide();
            })
        
            $('.modalBackground__deleteAccount').off('click');
            $('.modalBackground__deleteAccount').on('click', function() {
                delete_modal.hide();
            })
        
            // Press esc key to hide
            $(document).keydown(function(event) { 
              if (event.keyCode == 27) { 
                  if (delete_modal.length) {
                      let modalState = delete_modal.css('display');
                      if (modalState == "block") {
                        delete_modal.hide();
                      }
                  }
              }
            });

        
            init_delete_account();

        })
    }
    init_delete_confirm();

    function init_delete_account() {
        let core =  'accounts';
        let delete_button = $('.confirmPermaDeleteAccount');
        let delete_modal = $('.modal__deleteAccount');
        delete_button.off('click');
        delete_button.on('click', function() {

			$.ajax({
				type: 'DELETE',
				url: '/' + core + '/deleteAccount',
				success: function(response) {
					console.log('Account deleted. Redirecting.');
					window.location.href = '/';

				},
				error: function(err) {
                    delete_modal.hide();
                    alert("Failed to delete account. Refresh and try again.");
					//TODO: Display error message
				}
			})
            

        })
    }

    /* -------------------------------
        image upload
    -------------------------------*/

    function enableImageUpload() {
        let imageUploadWrap = $('.image-upload-wrap');

        imageUploadWrap.off('dragover');
        imageUploadWrap.on('dragover', function () {
            imageUploadWrap.addClass('image-dropping');
        });

        imageUploadWrap.off('dragleave');
        imageUploadWrap.on('dragleave', function () {
            imageUploadWrap.removeClass('image-dropping');
        });

        let fileUploadButton = $('.file-upload-btn');
        let fileUploadInput = $('.file-upload-input');

        fileUploadButton.off('click');
        fileUploadButton.on('click', function() {
            fileUploadInput.trigger( 'click' );
        })

        fileUploadInput.off('change');
        fileUploadInput.on('change', function() {

            readURL(this);
            // setup upload failed instead and set the image later and until then set uploading image

            const files = $(this).files;
            // const file = files[0];

            let file = $(this).prop('files')[0];
            let imageName = $(this).prop('files')[0].name;

            const imageBlock = $(this).closest('.imageBlock');
            const dateUpdated = new Date();

            uploadData.imageBlock = imageBlock;
            uploadData.dateUpdated = dateUpdated;
            uploadData.imageName = imageName;

            if (file === null) {
                return alert('No file selected.');
            }

            uploadData.file = file;
            uploadData.image_exists = true;
        
            if (uploadData.image_exists == true) {
                startImageUpload(uploadData);
            }

        });
    }
    enableImageUpload();

    function startImageUpload(uploadData) {
        getSignedRequest(uploadData);
    }

    function enableImageDelete() {
        let removeImage = $('.remove-image');
        removeImage.off('click');
        removeImage.on('click', function() {
            // let obj = this;
            console.log("yo");
            removeUpload();
        })
    }
    enableImageDelete();

    function disableImageDelete() {
        $('.remove-image').off('click');
    }

    function launchUploadingIcon() {

    }

    function toggleImageTitle() {
        let imagePreTitle = $('.image-pre-title');
        let imageTitle = $('.image-title');
        let imageUploadingTitle = $('.image-uploading-title');
        imagePreTitle.toggle();
        imageTitle.toggle();
        imageUploadingTitle.toggle();

        let imageUploadingButton = $('.remove-image');
        if (!imageUploadingButton.hasClass('disabled'))  { 
            imageUploadingButton.css('opacity', '0.6');
            imageUploadingButton.css('cursor', 'not-allowed');
            imageUploadingButton.addClass('disabled');
        } 
        else { 
            imageUploadingButton.css('opacity', '');
            imageUploadingButton.css('cursor', 'pointer');
            imageUploadingButton.removeClass('disabled');
        }
        
    }

    function readURL(input) {
        if (input.files && input.files[0]) {

            var reader = new FileReader();

            reader.onload = function(e) {

                $('.image-upload-wrap').hide();
                $('.image-upload-wrap').removeClass('show');

                $('.file-upload-image').attr('src', e.target.result);
                $('.file-upload-content').show();
                $('.file-upload-content').removeClass('hide');

                toggleImageTitle();

                $('.image-title').html(input.files[0].name);
            };

            reader.readAsDataURL(input.files[0]);
            return 

        } else {
            removeUpload();
        }
    }

    // function deleteImage() {
    //     let image = $('.imageBlock');
    //     image.find('.file-upload-image').removeAttr('src');
    //     $('.file-upload-input').val('')
    //     $('.file-upload-content').hide();
    //     $('.image-upload-wrap').show();
    //     disableImageDelete();
    //     enableImageUpload();
    // }

    function removeUpload() {
        console.log("Beginning image delete.");
        let image = $('.imageBlock');

        let imagePreTitle = $('.image-pre-title');
        let imageTitle = $('.image-title');
        let imageRemovingTitle = $('.image-removing-title');
        imagePreTitle.toggle();
        imageTitle.toggle();
        imageRemovingTitle.toggle();

        // image = '.imageBlock'
        let imageKey = image.attr('data-image-key');
        let dateUpdated = new Date(); 

        $.ajax({
            data: {
                imageKey: imageKey,
                dateUpdated: dateUpdated
            },
            type:'DELETE',
            url: '/' + coreURL + '/DeleteProfileImage',
            success: function(response) {
                imagePreTitle.toggle();
                imageTitle.toggle();
                imageRemovingTitle.toggle();        
                console.log("Deleted image from database.");
                image.removeAttr('data-image-key');
                image.removeAttr('data-image-url');
                image.removeAttr('data-image-name');
                image.find('.file-upload-image').removeAttr('src');
                $('.file-upload-input').val('')
                $('.file-upload-content').hide();
                $('.file-upload-content').removeClass('show');
                $('.image-upload-wrap').removeClass('hide');
                $('.image-upload-wrap').show();
                disableImageDelete();
                enableImageUpload();
            },
            error: function(err) {
                enableImageUpload();
                imageError("Failed to delete image from database.", err)
                // Display error not being able to delete note
            }
        });
    }

    function saveFileReferenceSuccess(uploadData, imageBlock) {
        let imageKey = uploadData.fileKey;
        let imageURL = uploadData.fileURL;
        let imageName = uploadData.imageName;
        imageBlock.attr('data-image-key', imageKey);
        imageBlock.attr('data-image-url', imageURL);
        imageBlock.attr('data-image-name', imageName);
        toggleImageTitle();
        enableImageDelete();		
    }

    function saveReference(uploadData) {
        let imageBlock = uploadData.imageBlock;
        delete uploadData.imageBlock;
        
        $.ajax({
            url: '/' + coreURL + '/saveProfileImageReference',
            type: 'POST',
            data: JSON.stringify(uploadData),
            processData: false,
            contentType: 'application/json',
            success: function(data) {
                console.log("saveref data", data);
                saveFileReferenceSuccess(uploadData, imageBlock);
            },
            error: function(err) {
                imageError("Could not save file reference.", err);
            }
        })
    }

    function imageError(consoleText, err) {
        console.log(consoleText, err);
    }

    function uploadFile(file, signedRequest, url, uploadData) {
        $.ajax({
            url: signedRequest,
            type: 'PUT',
            processData: false,
            contentType: false,
            data: file,
            success: function(data) {
                saveReference(uploadData);
            },
            error: function(err) {
                imageError("Failed to upload file.", err);
            }
        })
    }

    function getSignedRequest(uploadData) {
        // const fileName = file.name + '-' + Date.now().toString();
        // to not need to parse strings or remove spaces, etc:
        let file = uploadData.file;
        const fileName = Date.now().toString();
        const fileType = file.type;

        $.ajax({
            url: '/' + coreURL + `/sign-s3?file-name=${fileName}&file-type=${file.type}`,
            type: 'GET',
            data: {
                fileName: fileName,
                fileType: fileType
            },
            processData: false,
            contentType: false,
            success: function(data) {
                const response = data.returnData;
                const signedRequest = response.signedRequest;
                const responseURL = response.url;
                uploadData.fileKey = data.fileName;
                uploadData.fileURL = response.url;
                uploadFile(file, signedRequest, responseURL, uploadData);
            },
            error: function(err) {
                imageError("Could not get signed URL.", err);
            }
        })
    }


 })