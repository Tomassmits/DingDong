var http = require('http'),
    Stream = require('stream').Transform,
    fs = require('fs');

var storage = require('@google-cloud/storage');

var gcs = storage({
    projectId: "dingdong-io",
    keyFilename: "DingDong-service-account.json"
  });

const bucket = gcs.bucket('dingdong-io.appspot.com')

class Cam {
    constructor() {
        this.mPin = -1;
    }

    takeAndUploadSnap(url, deviceId, eventId) {
        console.log("Getting snap...");
        http.request(url, function(response) {
          var data = new Stream();

          response.on('data', function(chunk) {
            data.push(chunk);
          });

          response.on('end', function() {
            fs.writeFileSync('snaps/' + eventId + '.png', data.read());
            instance.uploadToFirebase(deviceId, eventId);
          });
        }).end();
    }

    uploadToFirebase(deviceId, eventId) {
        var filename = eventId + '.png';
        console.log("Uploading snap...");
        bucket.upload("snaps/"+filename, {destination: "snaps/"+filename}, function(err, file) {
          if (!err) {
            console.log(filename + ' is now in your bucket.');
            instance.mCallback(eventId);
          } else {
            console.log('Error uploading file: ' + err);
          }
        });
    }

    setCallback(callback) {
        this.mCallback = callback;
    }
}

const instance = new Cam();
//Object.freeze(instance);

module.exports = instance;
