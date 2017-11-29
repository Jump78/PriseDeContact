require('colors')

const path = require('path')

// express
const express = require('express')
const app = express()
// socket
const server = require('http').createServer(app)
const io = require('socket.io').listen(server, {
	serveClient: false,
})

const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const port = 8020


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Création du server
app.use( express.static('client') );

// middleware qui permet d'autoriser les requête Ajax provenant d'un autre domaine
app.use( (req, res, next) => {
	// le serveur accepte les requête ajax provenant de certains domaines
	let p = ['http://localhost:8080', 'http://localhost:8081', 'http://192.168.21.124:8080', 'http://192.168.21.124:8081']
	if (p.indexOf(req.headers.origin) > -1) {
		res.header('Access-Control-Allow-Origin', req.headers.origin)
	}
	// autorise les type de requête get put post et delete
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
	// autorise le Content-Type pour la réponse
	res.header('Access-Control-Allow-Headers', 'Content-Type')
	res.header('Access-Control-Allow-Credentials', 'true')
	next()
})

io.on('connection', () => {
	console.log(`Somone just connected`)
})

// CRUD Prospects
const prospect = require('./src/controller/Prospect.controller')
app.post 		('/prospect', 				(req, res) => {
	prospect.create(req, res)
	io.sockets.emit( 'prospectAdd', req.body )
})
app.get 		('/prospect', 				prospect.findAll)
app.get 		('/prospect/:id', 		prospect.find)
app.put 		('/prospect/:id', 		prospect.update)
app.delete 	('/prospect/:id', 		prospect.remove)

// CRUD Campaigns
const campaign = require('./src/controller/Campaign.controller')
app.post 		('/campaign', 				(req, res) => {
	campaign.create(req, res)
	io.sockets.emit( 'campaignAdd', req.body )
})
app.get 		('/campaign', 				campaign.findAll)
app.get 		('/campaign/:id', 		campaign.find)
app.put 		('/campaign/:id', 		campaign.update)
app.delete 	('/campaign/:id', 		campaign.remove)

// CRUD Admin accounts
const admin = require('./src/controller/Admin.controller')
app.post 		('/admin', 				(req, res) => {
	admin.create(req, res)
})
app.post 		('/admin/login', 				admin.connect)
app.get 		('/admin', 							admin.findAll)
app.get 		('/admin/:id', 					admin.find)
app.put 		('/admin/:id', 					admin.update)
app.delete 	('/admin/:id', 					admin.remove)

// Indique à mongoose que les promesse à utiliser
// sont celles par défaut dans Node.js (objet global)
mongoose.Promise = global.Promise

// Connexion à la base de données MONGO
mongoose.connect('mongodb://localhost:27017/pdc', { useMongoClient: true })
	// Une fois connecté ( .then( successCallback(), errorCallback() ) )
	.then(
		() => console.log(' MongoDB '.bgGreen, 'Connection établie !'.green),
		() => console.log(' MongoDB error '.bgRed, 'Auriez vous oublié de lancer `mongod` ?'.red)
	)
	.catch(err => console.log('err::'.red, err))
	.then(
		() => {
			// server écoute le port PORT
			server.listen(
				port,
				() => console.log(' App Started '.bgGreen.black, `Le serveur http://localhost:${port} est prêt !`.green))
		}
	)