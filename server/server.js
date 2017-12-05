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

io.on('connection', (socket) => {
	console.log(`Somone just connected`)
	let roomId = socket.handshake.query.roomId;
	console.log('Join :'+roomId);
	socket.join('room-'+roomId);
	io.sockets.in("room-"+roomId).emit('connectToRoom', "You are in room"+roomId);
})

// CRUD Prospects
const prospect = require('./src/controller/Prospect.controller')
const campaign = require('./src/controller/Campaign.controller')
app.post 		('/prospect', 				(req, res) => {
	let idCampaigns = req.body.campaign_id;

	prospect.create(req, res);
	req.params.id = idCampaigns;

	setTimeout((a) => {
		req.body = {
			prospects: [req.body._id]
		}

		campaign.update(req, res);
		console.log("Session: %j", req.body);
	},500)
	console.log('Room: '+idCampaigns);
	io.sockets.in("room-"+idCampaigns).emit( 'prospectAdd', req.body )
})
app.get 		('/prospect', 							prospect.findAll)
app.get 		('/prospect/:id', 					prospect.find)
app.get 		('/prospect/:id/campaign', 	prospect.findMyCampaigns)
app.put 		('/prospect/:id', 					prospect.update)
app.post 		('/prospect/:id/campaign', 	prospect.addOneCampaign)
app.delete 	('/prospect/:id', 					prospect.remove)
app.delete 	('/prospect/:prospectid/campaign/:campaignid', 	prospect.removeOneCampaign)

// CRUD Campaigns
app.post 		('/campaign', 				(req, res) => {
	campaign.create(req, res)
	io.sockets.emit( 'campaignAdd', req.body )
})
app.get 		('/campaign', 									campaign.findAll)
app.get 		('/campaign/:id', 							campaign.find)
app.get 		('/campaign/:id/prospect', 			campaign.findMyProspects)
app.put 		('/campaign/:id', 							campaign.update)
app.post 		('/campaign/:id/prospect', 			campaign.addOneProspect)
app.delete 	('/campaign/:id', 							campaign.remove)
app.delete 	('/campaign/:campaignid/prospect/:prospectid', 	campaign.removeOneProspect)

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
