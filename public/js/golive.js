$('.go_live_button').hide();

// don't take it too seriously
// all problems, from religion to war...
// comes from taking it seriously
// and that comes from resistance to the end of it
// none of the nonsense has any hold over you if you aren't so invested, don't care so much for it all

$(document).ready(function () {	

    let coreURL =  'dashboard';
    let uploadData = {};

    function create_live_stream(stream_data) {

        stream_data.date_created = new Date();

        $.ajax({
            url: '/dashboard/createLiveStream',
            type: 'POST',
            data: stream_data,
            success: function(data) {
                let stream_id = data.stream_id;
                window.location.href = "/watch/" + stream_id;
            },
            error: function(err) {
                imageError("Could not save file reference.", err);
            }
        })
    }

    function init_start_live_confirm_modal() {
        let go_live_button = $('.go_live');
        let start_live_modal = $('.startLiveModal');

        go_live_button.off('click');
        go_live_button.on('click', function() {
            let stream_data = check_inputs_not_empty();
            console.log("data", stream_data);
            if (stream_data.errors !== true) {
                if (uploadData.image_exists == true) {
                    $('.go_live').text("Uploading thumbnail...");
                    startImageUpload(uploadData, stream_data);
                    // pass image key etc to stream_data to insert into stream 
                } else {
                    create_live_stream(stream_data);
                }
                // start_live_modal.show();
                // populate_confirm_live_modal(stream_data);
            } else {
                // in future, scroll to first error
                window.scrollTo(0, 0);
                return;
            }

        })

		$('.cancel_start_live').off('click');
		$('.cancel_start_live').on('click', function() {
            start_live_modal.hide();
            reset_confirm_live_modal()
		})
		
		$('.startLiveBackground').off('click');
		$('.startLiveBackground').on('click', function() {
            start_live_modal.hide();
            reset_confirm_live_modal()
		})

		// Press esc key to hide
		$(document).keydown(function(event) { 
			if (event.keyCode == 27) { 
				if (start_live_modal.length) {
					let modalState = start_live_modal.css('display');
					if (modalState == "block") {
                        start_live_modal.hide();
                        reset_confirm_live_modal()
					}
				}
			}
		});
    }
    init_start_live_confirm_modal();

    function get_stream_data() {
        let stream_data = {};
        stream_data.stream_name = $('.stream_name').val();
        stream_data.stream_description = $('.stream_description').val();
        let tags = $('#input-tags')[0].selectize.items;
        // stringified because server-side ran into problems otherwise;
        stream_data.stream_tags = JSON.stringify(tags);
        stream_data.stream_video_id = $('.stream_video_id_input').val();
        return stream_data;
    }

    function populate_confirm_live_modal(stream_data) {
        $('.stream_name_text').text(stream_data.stream_name);
        $('.stream_description_text').text(stream_data.stream_description);
        let tags = stream_data.stream_tags;
        console.log("tags",  tags);
        for (var i=0; i<tags.length; i++) {
            let tag_block = $('<div>', {'class': 'tag_block'});
            let tag_text = $('<div>', {'class': 'tag_text'});
            tag_text.text("#" + tags[i]);
            tag_block.append(tag_text);
            $('.stream_tags').append(tag_block);
            let image = $('.imageBlock').attr('src');
            // $('.startLiveModal').find('.file-upload-image').attr('src', uploadData.file);
            $('.startLiveModal').find('.file-upload-image').attr('src', image);
        }
        $('.stream_video_id').text(stream_data.stream_video_id);
        // tags.each(function(index, tag) {
        //     let tag_block = $('<div>', {'class': 'tag_block'});
        //     let tag_text = $('<div>', {'class': 'tag_text'});
        //     tag_text.text(tag);
        //     tag_block.append(tag_text);
        //     $('.stream_tags').append(tag_block);
        // })
        //- for each tag in array
    }

    function reset_confirm_live_modal() {
        $('.stream_tags').empty();
    }

    function display_error(input_div) {
        let container = input_div.closest('.stream_input_container');
        let errorContainer = container.find('.inputErrorContainer');
        let errorText = container.find('.inputErrorText');
        errorContainer.css('display', 'block');
        errorText.text("Cannot be empty.");
    }

    function check_inputs_not_empty() {
        $('.inputErrorContainer').hide();
        $('.inputErrorText').text('');
        $('.generalErrorContainer').hide();
        let stream_data  = get_stream_data();
        let errors = false;
        if (!stream_data.stream_name) {
            errors = true;
            let input_div = $('.stream_name');
            console.log(1);
            display_error(input_div);
        }
        if (!stream_data.stream_description) {
            errors = true;
            let input_div = $('.stream_description');
            console.log(2);
            display_error(input_div);
        }
        if (stream_data.stream_tags.length == 0) {
            errors = true;
            let input_div = $('#input-tags');
            console.log(3);
            display_error(input_div);
        }
        if (!stream_data.stream_video_id) {
            errors = true;
            let input_div = $('.stream_video_id_input');
            console.log(4);
            display_error(input_div);
        }

        if (errors == true) {
            $('.generalErrorContainer').show();
            stream_data.errors = true;
        } else {
            stream_data.errors = false;
        }

        return stream_data;
    }

	$('#input-tags').selectize({
        maxItems: 3,
        plugins: ['drag_drop'],
		delimiter: ' ',
		persist: false,
		create: function(input) {
			return {
				value: input,
				text: input
			}
		}
    });

    $('.timepicker').timepicker({
        timeFormat: 'h:mm p',
        interval: 15,
        minTime: '12:00am',
        maxTime: '11:55pm',
        defaultTime: 'now',
        startTime: '12:00am',
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });

    $('[data-toggle="datepicker"]').datepicker({
        date: new Date()
      });

      $('.subArea').on('click', function() {
          $('.schedule_container').toggleClass('hidden');
      })

    //   $('.getShit').on('click', function() {
    //     let values = $('#input-tags')[0].selectize.items;
    //       console.log("stuff: ", values);
    //   })

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

        saveFileReferenceSuccess(uploadData, imageBlock);

    });
}
enableImageUpload();

function startImageUpload(uploadData, stream_data) {
    getSignedRequest(uploadData, stream_data);
}

function enableImageDelete() {
    let removeImage = $('.remove-image');
    removeImage.off('click');
    removeImage.on('click', function() {
        // let obj = this;
        deleteImage();
    })
}

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

        $('.file-upload-image').attr('src', e.target.result);
        $('.file-upload-content').show();

        toggleImageTitle();

        $('.image-title').html(input.files[0].name);
    };

    reader.readAsDataURL(input.files[0]);
    return 

  } else {
    deleteImage();
  }
}

function deleteImage() {
    let image = $('.imageBlock');
    image.find('.file-upload-image').removeAttr('src');
    $('.file-upload-input').val('')
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
    disableImageDelete();
    enableImageUpload();
}

function removeUpload(image) {
    console.log("Beginning image delete.");

    // image = '.imageBlock'
    let imageKey = image.attr('data-image-key');
    let dateUpdated = new Date(); 

    $.ajax({
        data: {
            imageKey: imageKey,
            dateUpdated: dateUpdated
        },
        type:'DELETE',
        url: '/' + coreURL + '/DeleteImage',
        success: function(response) {
            console.log("Deleted image from database.");
            image.removeAttr('data-image-key');
            image.removeAttr('data-image-url');
            image.removeAttr('data-image-name');
            image.find('.file-upload-image').removeAttr('src');
            $('.file-upload-input').val('')
            $('.file-upload-content').hide();
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

function saveReference(uploadData, stream_data) {
    let imageBlock = uploadData.imageBlock;
    delete uploadData.imageBlock;
    
    $.ajax({
        url: '/' + coreURL + '/saveFileReference',
        type: 'POST',
        data: JSON.stringify(uploadData),
        processData: false,
        contentType: 'application/json',
        success: function(data) {
            console.log("saveref data", data);
            stream_data.thumbnail_id = data.image_id;
            create_live_stream(stream_data);
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

function uploadFile(file, signedRequest, url, uploadData, stream_data) {
    $.ajax({
        url: signedRequest,
        type: 'PUT',
        processData: false,
        contentType: false,
        data: file,
        success: function(data) {
            saveReference(uploadData, stream_data);
        },
        error: function(err) {
            imageError("Failed to upload file.", err);
        }
    })
}

function getSignedRequest(uploadData, stream_data) {
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
            stream_data.thumbnail_key = uploadData.fileKey;
            stream_data.thumbnail_url = uploadData.fileURL;
            stream_data.thumbnail_name = uploadData.imageName;
            uploadFile(file, signedRequest, responseURL, uploadData, stream_data);
        },
        error: function(err) {
            imageError("Could not get signed URL.", err);
        }
    })
}

});