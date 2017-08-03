var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cors = require('cors');
var nodemailer = require('nodemailer');

var express = require('express')
var app = express()

var fs = require('fs');
var googleAuth = require('google-auth-library');
var google = require('googleapis');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(cors({credentials: true, origin: true}))

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

app.use(allowCrossDomain);

function getOAuth2Client(callback) {
	// Load client secrets
	fs.readFile('client_secret.json', function(err, data) {
		if (err) {
			return callback(err);
		}
		var credentials = JSON.parse(data);
		var clientSecret = credentials.installed.client_secret;
		var clientId = credentials.installed.client_id;
		var redirectUrl = credentials.installed.redirect_uris[0];
		var auth = new googleAuth();
		var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

		// Load credentials
		fs.readFile('gmail-nodejs-credentials.json', function(err, token) {
			if (err) {
				return callback(err);
			} else {
				oauth2Client.credentials = JSON.parse(token);
				return callback(null, oauth2Client);
			}
		});
	});
}

function sendMail(auth, formData, callback) {
	var gmail = google.gmail('v1');

	var email_lines = [];
	console.log(formData)
	email_lines.push('From: alvinwong312@gmail.com');
	email_lines.push('To: alvinwong312@gmail.com');
	email_lines.push('Content-type: text/html;charset=iso-8859-1');
	email_lines.push('MIME-Version: 1.0');
	email_lines.push('Subject: Message from Alvin\'s personal website');
	email_lines.push('');
	email_lines.push('Name: ' + formData.name + '<br/>');
	email_lines.push('Email: ' + formData.email + '<br/>');
	email_lines.push('Message: ' + formData.message + '<br/>');

	var email = email_lines.join('\r\n').trim();

	var base64EncodedEmail = new Buffer(email).toString('base64');
	base64EncodedEmail = base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '_');

	gmail.users.messages.send({
		auth: auth,
		userId: 'me',
		resource: {
			raw: base64EncodedEmail
		}
	}, callback);
}



app.use(express.static(__dirname));
/*
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/font', express.static('font'));
app.use('/pic', express.static('pic'));
app.use('/files', express.static('files'));
app.use('/link', express.static('link'));
*/

app.get('/', function (req, res){
	res.redirect('/main.html');
})
app.get('/info', function(req, res){
	res.send('Server for Alvin\'s person website to handle all requests. Version: 1.0.0')
})
app.get('/home', function(req, res){
	res.redirect('/main.html#jumbotron');
})
app.get('/contact', function(req, res){
	res.redirect('/main.html#contact');
})
app.get('/about', function(req, res){
	res.redirect('/main.html#about');
})
app.get('/profotlio', function(req, res){
	res.redirect('/main.html#projects');
})

app.post('/message', urlencodedParser, function(req,res){

	var formData = {
		"name": req.body.name,
		"email": req.body.email,
		"message": req.body.message
	}

	console.log(req.body.name)
	console.log(formData);
	getOAuth2Client(function(err, oauth2Client) {
		if (err) {
			console.log('err:', err);
			res.sendStatus(500);
		} else {
			sendMail(oauth2Client, formData, function(err, results) {
				if (err) {
					console.log('err:', err);
					res.sendStatus(500);
				} else {
					console.log(results);
					res.status(200).send('msg sent')
				}
			});
		}
	});
	
	//res.send(formData);
})


var server = app.listen(8080, function(){
	var port = server.address().port

	console.log("listening at %s", port);
})