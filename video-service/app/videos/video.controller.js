

const winston = require('winston');
const videoService = require('./video.service');

exports.uploadVideo = (req, res, next) => {
    if(!req.query.drillId) {
        res.status(400).json({
            err: 'drill id is required'
        });
        return;
    }
    videoService.transferToS3(req.file)
        .then((uploadRes) => {
            return new Promise((resolve, reject) => {
                resolve({
                    bucket: uploadRes.bucket,
                    key: uploadRes.key,
                    drillId: req.query.drillId
                });
            });
        })
        .then(videoService.transcodeVideo)
        .catch((err) => {
            console.error('upload failed', err);
        });

    res.sendStatus(202);
};
