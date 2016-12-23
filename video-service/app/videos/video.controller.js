

const winston = require('winston');
const fs = require('fs');
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
            winston.error('upload failed', err);
        })
        .then(() => {
            fs.unlink(req.file.path, (err, data) => {
                if(err) winston.error('failed to remove cached file', err);
            });
        });

    res.sendStatus(202);
};
