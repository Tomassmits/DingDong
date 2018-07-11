const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

/*
// Send a message to the device corresponding to the provided
// registration token.
exports.testSend = functions.https.onRequest((request, response) => {
    // This registration token comes from the client FCM SDKs.
    var registrationToken = 'fNO3qZtpUvM:APA91bHs29uQonpIe5T4siLN0k-8SO6jCfLPEzeLiYNMkud7RO2MfVY8sN_-ZJBQSNK6kMfJ10g6Dl_WieAK54I5AveyUiaHhLcSRHdp0Ob2-HQVM_V8K7s0jTL4BUHnuZ8Fy5cpIOz2NGhE6IAickBI2Dz_hAsgaQ';

    console.log("Sending notification");

    const payload = {
      notification: {
        title: '[TEST] There is someone at the door.',
        body: 'Tap here to see who it is!'
      }
    };

    admin.messaging().sendToDevice(registrationToken, payload);

    response.send("OK");

});
*/

exports.notifOnNewEvent = functions.database.ref('/devices/{bellId}/events/{pushId}')
    .onCreate((snapshot, context) => {
        var bellId = context.params.bellId;
        console.log("Sending notification for bell " + bellId);

        const payload = {
          notification: {
            title: 'There is someone at the door [' + bellId + '].',
            body: 'Tap here to see who it is!'
          }
        };

        var promiseList = [];

        return snapshot.ref.parent.parent.child('subscriptions').once('value').then(
            function (snap) {
                snap.forEach(function(child) {
                    var childKey = child.key;
                    var childVal = child.val();
                    promiseList.push( admin.messaging().sendToDevice(childKey, payload) );
                });
                return Promise.all(promiseList);
            });
    });
