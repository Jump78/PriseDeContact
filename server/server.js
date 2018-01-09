require('colors')

const path = require('path')
const jwt = require('jsonwebtoken')

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
const cookieParser = require('cookie-parser')

const port = 8020


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// parse cookie
app.use(cookieParser())

// Création du server
app.use( express.static('client') );

// middleware qui permet d'autoriser les requête Ajax provenant d'un autre domaine
app.use( (req, res, next) => {
	res.header('Access-Control-Allow-Credentials', true);
	// le serveur accepte les requête ajax provenant de certains domaines
	let p = ['http://localhost:8080', 'http://localhost:8081', 'http://192.168.21.124:8080', 'http://192.168.21.124:8081', 'http://192.168.10.101:8080']
	if (p.indexOf(req.headers.origin) > -1) {
		res.header('Access-Control-Allow-Origin', req.headers.origin)
	}
	// autorise les type de requête get put post et delete
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
	// autorise le Content-Type pour la réponse
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
// res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Credentials");
 next()
})

let cookieNoCheck = [
	{
		path: '/admin/login',
		method: 'OPTIONS'
	},
	{
		path: '/admin/login',
		method: 'POST'
	},
	{
		path: '/campaign',
		method: 'GET'
	},
	{
		path: '/propsect',
		method: 'POST'
	}
]

app.use( (req, res, next) => {
	let csrfToken = req.headers['authorization'];
	let token = req.cookies['access_token'];

	let test = cookieNoCheck.filter( (item) => req.url === item.path && req.method == item.method);

	if (!test.length) {
		if (!csrfToken) {
			res.status(400);
			res.send('Headers authorization not found')
		}

		if (!token) {
			res.status(400);
			res.send('Cookies with token not found')
		}

		jwt.verify(token, 'dEA0hDoaCc', function(err, decoded) {
	    if (err || (decoded.csrfToken != csrfToken)) {
			  res.status(401);
				res.send('Need authorization')
	    } else {
        next();
	    }
		})
	} else {
		next();
	}
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
app.post 		('/prospect', 	prospect.create, (req, res, next) => {
	console.log( 'Prospect create pased' )

	req.params.id = req.locals.campaigns[0];
	req.body = {
		prospect: req.locals._id
	}

	campaign.addOneProspect(req, res);
	console.log('id: '+req.params.id)
	io.sockets.in("room-"+req.params.id).emit( 'prospectAdd', req.locals )
})
app.get 		('/prospect', ( req, res ) => {
	prospect.findAll( req, res )
})
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
