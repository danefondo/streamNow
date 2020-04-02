let uploadData = {};

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

        saveFileReferenceSuccess(uploadData, imageBlock);

    });
}
enableImageUpload();

function startImageUpload(file, uploadData) {
    getSignedRequest(file, uploadData);
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

function deleteImage(){
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
    let imageKey = uploadData.fileName;
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
        url: '/' + coreURL + '/saveFileReference',
        type: 'POST',
        data: JSON.stringify(uploadData),
        processData: false,
        contentType: 'application/json',
        success: function(data) {
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

function getSignedRequest(file, uploadData) {
    // const fileName = file.name + '-' + Date.now().toString();
    // to not need to parse strings or remove spaces, etc:
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
            uploadData.fileName = data.fileName;
            uploadData.fileURL = response.url;
            uploadFile(file, signedRequest, responseURL, uploadData);
        },
        error: function(err) {
            imageError("Could not get signed URL.", err);
        }
    })
}