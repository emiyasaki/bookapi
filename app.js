var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var db;
if (process.env.ENV == 'Test') {
	db = mongoose.connect('mongodb://localhost/libraryApp_test');
} else {
	db = mongoose.connect('mongodb://localhost/libraryApp');
}

var app = express();

var Book = require('./models/bookModel');

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

var bookRouter = require('./routes/bookRoutes')(Book);
app.use('/api/books', bookRouter);

app.get('/', function(req, res) {
	res.send('welcome to my API!');
});

app.listen(port, function() {
	console.log('Running on PORT: ' + port);
});

module.exports = app;