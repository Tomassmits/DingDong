const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Send a message to the device corresponding to the provided
// registration token.
exports.testSend = functions.https.onRequest((request, response) => {
    // This registration token comes from the client FCM SDKs.
    var registrationToken = 'fwlJSrHgzXc:APA91bEUjDkpBQCxvuhN7PL1dY0yVEUYl1RIzNRsygDgu0TPcwEKlo_YM75o838ZhUG0FsvzA11zLZWyp33JPm9HJ0MwJfn67EoVM747tDUfpevZZ_OwFUZuMD4r7GaWo63gftb2Il3l0Ti28S6cUDDl9rryJMWE1g';

    console.log("Sending notification");

    const payload = {
      notification: {
        title: 'There is someone at the door.',
        body: 'Tap here to see who it is!'
      }
    };

    admin.messaging().sendToDevice(registrationToken, payload);

    response.send("OK");

});

exports.notifOnNewEvent = functions.database.ref('/events/{pushId}')
    .onCreate((snapshot, context) => {
        var registrationToken = 'fwlJSrHgzXc:APA91bEUjDkpBQCxvuhN7PL1dY0yVEUYl1RIzNRsygDgu0TPcwEKlo_YM75o838ZhUG0FsvzA11zLZWyp33JPm9HJ0MwJfn67EoVM747tDUfpevZZ_OwFUZuMD4r7GaWo63gftb2Il3l0Ti28S6cUDDl9rryJMWE1g';

        console.log("Sending notification " + context);

        const payload = {
          notification: {
            title: 'There is someone at the door.',
            body: 'Tap here to see who it is!'
          }
        };

        return admin.messaging().sendToDevice(registrationToken, payload);
    });
