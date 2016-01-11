var should = require('should'),
	supertest = require('supertest'),
	app = require('../app.js'),
	mongoose = require('mongoose'),
	Book = mongoose.model('Book'),
	agent = supertest.agent(app);

describe('Book CRUD Test', function() {
	it('Should allow a book to be posted and return a read and _id', function(done) {
		var bookPost = {
			title: 'Título',
			author: 'Banana',
			genre: 'Fiction'
		};
		agent.post('/api/books')
			.send(bookPost)
			.expect(200)
			.end(function(err, results){
				results.body.read.should.equal(false);
				results.body.should.have.property('_id');
				done();
			});
	});

	afterEach(function(done){
		Book.remove().exec();
		done();
	});
});