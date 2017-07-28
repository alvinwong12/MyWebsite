var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cors = require('cors');
var nodemailer = require('nodemailer');

var express = require('express')
var app = express()

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth:{
		user: 'alvinwong312@gmail.com',
		pass: '03120828'
	}
});

var mailoption = {
	from: 'alvinwong312@gmail.com',
	to: 'alvinwong312@gmail.com',
	subject: 'Message sent from my website',
	text: ''
}


var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(cors({credentials: true, origin: true}))
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
	name=req.body.name,
	email=req.body.email,
	message=req.body.message

	mailoption.text = `
		Name: ${name}
		Email: ${email}
		Message: ${message}
	`
	/*
	transporter.sendMail(mailoption, function(error, info){
		if (error){
			console.log(error);
		}
		else{
			console.log('Email sent: ' + info.response);
		}
	})
	*/
	res.end();
})


var server = app.listen(8080, function(){
	var port = server.address().port

	console.log("listening at %s", port);
})