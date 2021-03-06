const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { setOriginalNode } = require('typescript');

const config = require('./mailsender_config.json');

const CLIENT_ID = config.CLIENT_ID;
const CLIENT_SECRET = config.CLIENT_SECRET;
const REDIRECT_URI = config.REDIRECT_URI;
const REFRESH_TOKEN = config.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(_from, _to, message) {

    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'FreshMarket2.0Email@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from:'FRESHMARKETSUPPORT 📧 <FreshMarket2.0Email@gmail.com>',
            to: _to,
            subject: 'Customer support',
            text: 'Dear seller, the customer with the email ' + _from + ' tried to contact you with the following message: \r\n\r\n' + message + '\r\n\r\nPlease reply on his personal email.\r\nRegards, the Fresh Market 2.0 staff.',
        };

        const result = await transport.sendMail(mailOptions);
        return result

    } catch (error) {
        return error;
    }
}

//____________________________SERVER PART____________________________
var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

var app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

app.use(function (req, res, next) {
  //console.log(req.body) // populated!
  next()
})

app.post('/sendmail', function (req, res) {
    sendMail(
        req.body.params._from,
        req.body.params._to,
        req.body.params.message
        ).then((result) => console.log('Email sent...', result)).catch((error) => console.log(error.message));
  })

app.listen(3000, function () {
    console.log('MailSender app listening on port 3000...')
  })
//___________________________________________________________________