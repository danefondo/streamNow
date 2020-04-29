const express = require('express');
const router = express.Router();
let Feature = require('../models/feature');
let User = require('../models/user');

router.get('/', async function(req, res) {
    try {
        let features = await Feature.find({}).exec();
        if (!features.length) {
            return res.status(404).json({
                message: "No demanded features exist yet."
            });
        }

        res.status(200).json({
            features: features
        });
    } catch (error) {
        res.status(500).json({
            errors: "An unknown error occurred"
        });
    }
});


router.post('/checkAllVoted', async function(req, res) {
    try {
        let features = await Feature.find({}).exec();
        if (!features.length) {
            return res.status(404).json({
                message: "No demanded features exist yet."
            });
        }

        let userId;
        let user;
        if (req.body.userId) { 
            userId = req.body.userId; 
            user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    errors: "User not found."
                });
            }
        } else {
            return res.status(404).json({ message: "No user id provided."});
        }

        // Recursion to replace forEach()
        let updatedFeatures = [];
        var checkedFeatures = function(x) {
            if (x < features.length) {
                let feature = features[x];
                let hasVoted = false;
                if (feature.requester_emails.includes(user.email)) {
                    hasVoted = true;
                } 
                let newFeature = {
                    ...feature._doc,
                    hasVoted : hasVoted
                }
                updatedFeatures.push(newFeature);
                checkedFeatures(x+1);

            } else {
                // console.log("features", updatedFeatures);
                features = updatedFeatures;
                
                res.status(200).json({
                    features: features
                });
            }
        }
        checkedFeatures(0);

    } catch (error) {
        res.status(500).json({
            errors: "An unknown error occurred"
        });
    }
});

router.post('/checkUserVoted/:featureId', async function(req, res) {
    try {
        let feature_id = req.params.featureId;
        if  (!feature_id || feature_id == undefined) {
            return res.status(404).json({
                errors: "Didn't get feature id."
            });
        }
        let feature = await Feature.findById(feature_id);
        if (!feature) {
            return res.status(404).json({
                message: "Feature not found."
            });
        }
        let hasVoted = false;
        if (req.body.userId) {
            let userId = req.body.userId;
            let user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    errors: "User not found."
                });
            }
            if (feature.requester_emails.includes(user.email)) {
                hasVoted = true;
            }
        } else {
            return res.status(404).json({
                errors: "User not found."
            });
        }

        res.status(200).json({
            hasVoted: hasVoted
        });
    } catch (error) {
        res.status(500).json({
            errors: "An unknown error occurred!!!"
        });
    }
});


// Set 'done' and send update email
router.post('/doneSendEmail', function (req, res) {

});

// Create new feature
router.post('/addFeature', async function (req, res) {
    try {
        let feature = new Feature();
        feature.idea = req.body.idea;
        feature.description = req.body.description;
        feature.language = req.body.language;
    
        if (req.body.requester_email) {
            feature.requester_emails.push(req.body.requester_email);
        } else {
            let userId = req.body.userId;
            let requester = await User.findById(userId);
            feature.requester_emails.push(requester.email);
        }
    
        if (!feature.demand_count) {
            feature.demand_count = 1;
        } else if (feature.demand_count == 0 || feature.demand_count > 0) {
            feature.demand_count = feature.demand_count + 1;
        }
    
        await feature.save();
    
    
        res.status(200).json({
            feature: feature
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errors: "An unknown error occurred"
        });
    }
});

// Update count
router.post('/updateFeatureDemand/:featureId', async function (req, res) {
    try {
        // if not user, then cancel (for oh so clever frontend check bypassers)
        if (!req.body.user) {
            return res.status(401).json({
                errors: "No authenticated user present who could upvote."
            });
        }
        let theUser = req.body.user;

        let feature_id = req.params.featureId;

        let feature = await Feature.findById(feature_id);
        if (!feature) {
            return res.status(404).json({
                errors: "Feature not found."
            });
        }

        // check if user has already upvted or not, based on that choose action

        let user = await User.findById(theUser._id);
        if (!user) {
            return res.status(404).json({
                errors: "User not found."
            });
        }

        // if currently already exists, do opposite
        let hasVoted = feature.requester_emails.includes(user.email)

        if (hasVoted == true) {
            if (!feature.demand_count) {
                console.log("wtf");
                return res.status(200).end();
            } else if (feature.demand_count > 0) {
                feature.demand_count = feature.demand_count - 1;
            }

            feature.requester_emails.pull(user.email);
            hasVoted = !hasVoted;

        } else {
            // if undefined and not even zero, make it one
            if (!feature.demand_count) {
                feature.demand_count = 1;
            } else if (feature.demand_count == 0 || feature.demand_count > 0) {
                feature.demand_count = feature.demand_count + 1;
            }

            feature.requester_emails.push(user.email);
            hasVoted = !hasVoted;
        }
        console.log("aaaaaay", hasVoted, feature);

        await feature.save();   

        res.json({
            feature: feature,
            hasVoted: hasVoted
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            errors: "An unknown error occurred"
        });
    }
});





module.exports = router;