console.log("Starting server.js");
const express = require('express');
const twilio = require('twilio');
const app = express();
app.use(express.json());

const accountSid = 'AC1e621104f79570bd09a18d1fc4ebadac';   
const authToken = 'e4a749d98e8fd4aa8847a5b4c7c1900e';      
const client = twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
  const { phone, message } = req.body;
client.messages
  .create({
    body: message,
    from: '+12765313269',  // your Twilio number
    to: phone,             // dynamically use phone number from frontend JSON
  })

    .then(message => res.send('SMS sent with SID: ' + message.sid))
    .catch(err => {
      console.error(err);
      res.status(500).send('Failed to send SMS');
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
