

const winston = require('winston');
const config = require('config');
const aws = require('aws-sdk');
const fs = require('fs');

const bucket = config.get('aws.s3.bucket');
const pipelineId = config.get('aws.elasticTranscoder.pipelineId');
const s3 = new aws.S3({
    params: {Bucket: bucket}
});
const transcoder = new aws.ElasticTranscoder({
    region: 'us-west-2'
});

exports.transferToS3 = transferToS3; // (videoFile) -> uploadResult
exports.transcodeVideo = transcodeVideo; // ({ bucket, key, drillId })


function transferToS3(video) {
    return new Promise((resolve, reject) => {
        fs.readFile(video.path, (err, fileData) => {
            if(err) {
                reject(err);
                winston.error('could not read file: ' + video.filename, err);
            } else {
                var params = {Bucket: bucket, Key: video.originalname, Body: fileData};
                s3.putObject(params, (err, data) => {
                    if(err) {
                        reject(err);
                        winston.error('upload to s3 failed', err);
                    } else {
                        resolve({
                            bucket: bucket,
                            key: params.Key,
                            res: data
                        });
                    }
                })
                .on('httpUploadProgress', (progress) => {
                    console.log('progress: ' + parseInt((progress.loaded * 100) / progress.total) + '%');
                });
            }
        });
    });
}


function transcodeVideo(transcodeReq) {
    const params = {
        PipelineId: pipelineId,
        Input: {
            Key: transcodeReq.key
        },
        OutputKeyPrefix: transcodeReq.drillId + '/',
        Outputs: [
            {
                PresetId: '1351620000001-200050',
                SegmentDuration: '4.0',
                Key: 'hls_400k_'
            },
            {
                PresetId: '1351620000001-200030',
                SegmentDuration: '4.0',
                Key: 'hls_1M_'
            },
            {
                PresetId: '1351620000001-200010',
                SegmentDuration: '4.0',
                Key: 'hls_2M_'
            }
        ],
        Playlists: [
            {
                Format: 'HLSv3',
                OutputKeys: [
                    'hls_400k_',
                    'hls_1M_',
                    'hls_2M_'
                ],
                Name: 'index'
            }
        ]
    };

    return new Promise((resolve, reject) => {
        transcoder.createJob(params, (err, data) => {
            if(err) reject(err);
            else resolve(data);
        });
    });
}
