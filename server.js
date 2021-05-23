const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var http = require('http');
var fs = require('fs');
var url = require('url');
var app = express();
const db = require('./baza.js');

app.get('/create', function(res, res){
	db.sequelize.sync({force:true}).then(function(){	   
	    res.end('Kreirane tabele')
	});
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.post('/grad',function(req,res){
	let tijeloZahtjeva = '';
    req.on('data',function(data){
        tijeloZahtjeva+=data;
    });
    req.on('end',function(){
    	let param = new url.URLSearchParams(tijeloZahtjeva);
		let nazivGrada = param.get('naziv').trim();
		let brojStanovika = param.get('brojStanovika').trim();
		var gradovi=[];
		let er = false;		
		gradovi.push(db.Grad.create({naziv: nazivGrada, broj_stanovnika: brojStanovika}));
		Promise.all(gradovi).catch(function(err){ er = true;
			res.end("Greska "+err);
		}).then( function(){ if(er == false) res.json("Dodan grad") }); 
	}); 
});

app.get('/gradovi', function(req, res){
    db.Grad.findAll().then(function(gradovi){
        res.send(gradovi);
    });
});

app.get('/gradovi/:id',function(req,res){
	var idGrad = req.params.id;
	db.Grad.findOne({where: {id: idGrad}}).then(function(grad){
		res.json(grad);
	})
});

app.delete("/gradovi/:id", function(req, res){
	var brisati = req.params.id;
    db.Grad.findOne({where: {id: brisati}}).then(function(Grad){
    	if (Grad != null){
	        Grad.destroy();
	        res.json('Grad obrisan');
	    } else res.end('Grad ne postoji');
    });
});

app.put("/gradovi/:id", function(req, res){
	var update = req.params.id;
	let tijeloZahtjeva = '';
    req.on('data',function(data){
        tijeloZahtjeva+=data;
    }); 
    req.on('end',function(){
    	let param = new url.URLSearchParams(tijeloZahtjeva);
		let brojStanovika = param.get('brojStanovika');
	    db.Grad.findOne({where: {id: update}}).then(function(gradovi){
	    	if (gradovi != null){
	    		if (brojStanovika != null) gradovi.broj_stanovnika = brojStanovika.trim();
		        gradovi.save();
		        res.json('Grad azuriran');
		    } else res.end('Grad ne postoji');
	    });
    });
});

app.listen(3000);

module.exports = app;