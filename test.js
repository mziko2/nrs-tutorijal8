let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
const server = require('./server.js');
let grad = {id:1, naziv: 'Sarajevo', brojStanovnika:123}; 
const db = require('./baza.js');

describe('test GET', function () {
	beforeEach(function (done) {
        chai.request(server).get('/create').end((err, res) => {
        		var gradovi=[];
        		gradovi.push(db.Grad.create({naziv: "Sarajevo", broj_stanovnika: 123}));
				Promise.all(gradovi).catch(function(err){ er = true;
					res.end("Greska "+err);
				})
				done();
			});
    });


	it('GET gradovi test', function (done) {
		chai.request(server)
			.get('/gradovi')
			.end((err, res) => {
				res.should.be.json;
				res.body.should.be.a('array');
				done();
			});
	});

	it('GET grad test', function (done) {
		chai.request(server)
			.get('/gradovi/1')
			.end((err, res) => {
				res.should.be.json;
				res.body.should.be.a('object');
				done();
			});
	});
});


describe('test POST', function () {
	beforeEach(function (done) {
        chai.request(server).get('/create').end((err, res) => {
				done();
			});
    });


	it('Post metoda', function (done) {
		chai.request(server)
			.post('/grad')
			.set('content-type', 'application/x-www-form-urlencoded')
			.send({naziv: "Sarajevo", brojStanovika: 1234})
			.end((err, res) => {
				res.body.should.be.eql("Dodan grad");
				done();
			});
	});
});

describe('test DELETE', function () {
	beforeEach(function (done) {
        chai.request(server).get('/create').end((err, res) => {
        		var gradovi=[];
        		gradovi.push(db.Grad.create({naziv: "Sarajevo", broj_stanovnika: 123}));
				Promise.all(gradovi).catch(function(err){ er = true;
					res.end("Greska "+err);
				})
				done();
			});
    });


	it('DELETE gradovi test', function (done) {
		chai.request(server)
			.delete('/gradovi/1')
			.end((err, res) => {
				res.body.should.be.eql("Grad obrisan"); 
				done();
			});
	});
});

describe('test PUT', function () {
	beforeEach(function (done) {
        chai.request(server).get('/create').end((err, res) => {
        		var gradovi=[];
        		gradovi.push(db.Grad.create({naziv: "Sarajevo", broj_stanovnika: 123}));
				Promise.all(gradovi).catch(function(err){ er = true;
					res.end("Greska "+err);
				})
				done();
			});
    });


	it('PUT gradovi test', function (done) {
		chai.request(server)
			.put('/gradovi/1')
			.send({brojStanovika: 1234})
			.end((err, res) => {
				res.body.should.be.eql("Grad azuriran"); 
				done();
			});
	});
});