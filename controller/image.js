let Image = require('../models/image');
const aws = require('aws-sdk');

aws.config.update({
    accessKeyId: "AKIARKLMM5TMEHGOSNJC",
    secretAccessKey: "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",
    region: "us-east-1" 
});

const s3 = new aws.S3();
const S3_BUCKET = 'curata';

const imageController = {
    async signS3(req, res) {
        const fileName = req.query['file-name'];
        const fileType = req.query['file-type'];
      
      
          const s3Params = {
              Bucket: S3_BUCKET,
              Key: fileName,
              Expires: 60,
              ContentType: fileType,
              ACL: 'public-read'
          };
      
          s3.getSignedUrl('putObject', s3Params, function(err, data) {
              if (err) {
                  console.log(err);
                  return res.end();
              }
      
              const returnData = {
                  signedRequest: data,
                  url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
              };
              // res.write(returnData);
              // res.write(JSON.stringify(returnData));
              res.json({
                  returnData: returnData,
                  fileName: fileName
              });
              res.end();
          })
    },

    async uploadSingleImage(req, res) {

        try {
            singleUpload(req, res, function(err) {
                if (err) {
                    console.log('error', err);
                    res.json({ err: err });
                } else {
                    //  If file not found
                    if (req.file == undefined) {
                        res.json('Error: No file selected!');
                    } else {
                        // If success
                        const imageName = req.file.key;
                        const imageLocation = req.file.location; // url of the uploaded image
    
                        let image = new Image();
                        image.imageKey = imageName;
                        image.imageURL = imageLocation;

						image.save(function(err) {
							if (err) {
								return console.log(err);
							}
                        });
                        
        
                        res.json({
                            image: imageName,
                            location: imageLocation
                        })
                    }
                }
            });
        } catch(error) {
			console.log("error", error);
			res.status('500').json({
				message: "An error occurred while uploading image." 
			});  
        }
    },

    async saveFileReference(req, res) {
        try {        
            let image = new Image();
            image.imageKey = req.body.fileKey;
            image.imageURL = req.body.fileURL;
            image.imageName = req.body.imageName;
    
            await image.save();
            let image_id = image._id;

            res.json({
                imageKey: imageKey,
                imageURL: imageURL,
                image_id: image_id
            })
        } catch(error) {
            console.log(error);
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }
    },

    async deleteImage(req, res) {
        try {
            let imageKey = req.body.imageKey;

            let image = await Image.find({"imageKey": imageKey});
            if (!image) {
                return res.status('404').json({
                    message: "Could not find image to delete."
                });
            }
        
            s3.deleteObject({
                Bucket: 'curata',
                Key: '' + imageKey
            }, function (err, data) {
                if (err) {
                    console.log("Error: ", err);
                }

                Image.deleteOne({ _id: image._id }, function (err) {
                    if (err) return console.log(err);
                    console.log("Successfully removed image.");
                    res.status(200).end();
                  });
            })
        } catch(error) {
			console.log("error", error);
			res.status('500').json({
				message: "An error occurred while deleting image." 
			});  
        }
    }

}

module.exports = imageController;
