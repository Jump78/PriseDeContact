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

//middleware qui permet d'autoriser les requête Ajax provenant d'un autre domaine
app.use( (req, res, next) => {
	res.header('Access-Control-Allow-Credentials', true);
	// le serveur accepte les requête ajax provenant de certains domaines
	let p = ['http://localhost:8080', 'http://localhost:8081', 'http://192.168.21.124:8080', 'http://192.168.21.124:8081', 'http://192.168.10.101:8080', 'http://192.168.1.18:8081']
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
		path: '/api/admin/login',
		method: 'OPTIONS'
	},
	{
		path: '/api/admin/login',
		method: 'POST'
	},	{
		path: '/api/admin',
		method: 'POST'
	},
	{
		path: '/api/campaign',
		method: 'GET'
	},
	{
		path: '/api/campaign',
		method: 'OPTIONS'
	},
	{
		path: '/api/prospect',
		method: 'POST'
	}
]

app.use( (req, res, next) => {
	let csrfToken = req.headers['authorization'];
	let token = req.cookies['access_token'];

	let test = cookieNoCheck.filter( (item) => req.url === item.path && req.method == item.method);
	console.log(req.url, req.method)
	if (!test.length && req.method != 'OPTIONS' && req.method != 'GET') {
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

// let soap = require('soap');
// let url = 'http://lemws.agate-erp.fr/Tiers.svc?wsdl';
// let args = {
// 	loginUtilisateur: 'familletebouldecata@hotmail.fr',
// 	motDePasseUtilisateur: 'teboul'
// };
// app.get 		('/test', (req, res) => {
// 	console.log('test');
// 	soap.createClient(url, function(err, client) {
//     client.GetUserIdByAccount(args, function(err, result) {
// 			console.log(result);
// 				if (result.GetUserIdByAccountResult.Succes) {
// 					let url2 = 'http://lemws.agate-erp.fr/Inscriptions.svc?wsdl';
// 					let args2 = {
// 						idtiers: 1,
// 					};
//
// 					soap.createClient(url2, function(err, client) {
// 						client.GetAllInscriptionsByTiersId(args2, function(err, result){
// 							console.log(result.GetAllInscriptionsByTiersIdResult.Erreurs.Erreur);
// 						})
// 					})
// 				} else {
// 					console.log(result)
// 				}
//     });
// 	});
// })

// CRUD Prospects
const prospect = require('./src/controller/Prospect.controller')
const campaign = require('./src/controller/Campaign.controller')
app.post 		('/api/prospect', 	prospect.create, (req, res, next) => {
	console.log( 'Prospect create pased' )

	req.params.id = req.locals.campaigns[0];
	req.body = {
		prospect: req.locals._id
	}

	campaign.addOneProspect(req, res);
	console.log('id: '+req.params.id)
	io.sockets.in("room-"+req.params.id).emit( 'prospectAdd', req.locals )
})
app.get 		('/api/prospect', ( req, res ) => {
	prospect.findAll( req, res )
})
app.get 		('/api/prospect/:id', 					prospect.find)
app.get 		('/api/prospect/:id/campaign', 	prospect.findMyCampaigns)
app.put 		('/api/prospect/:id', 					prospect.update)
app.post 		('/api/prospect/:id/campaign', 	prospect.addOneCampaign)
app.delete 	('/api/prospect/:id', 					prospect.remove)
app.delete 	('/api/prospect/:prospectid/campaign/:campaignid', 	prospect.removeOneCampaign)

// CRUD Campaigns
app.post 		('/api/campaign', 				(req, res) => {
	campaign.create(req, res)
	io.sockets.emit( 'campaignAdd', req.body )
})
app.get 		('/api/campaign', 									campaign.findAll)
app.get 		('/api/campaign/:id', 							campaign.find)
app.get 		('/api/campaign/:id/prospect', 			campaign.findMyProspects)
app.put 		('/api/campaign/:id', 							campaign.update)
app.post 		('/api/campaign/:id/prospect', 			campaign.addOneProspect)
app.delete 	('/api/campaign/:id', 							campaign.remove)
app.delete 	('/api/campaign/:campaignid/prospect/:prospectid', 	campaign.removeOneProspect)

// CRUD Admin accounts
const admin = require('./src/controller/Admin.controller')
app.post 		('/api/admin', 				(req, res) => {
	admin.create(req, res)
})
app.post 		('/api/admin/login', 				admin.connect)
app.get 		('/api/admin', 							admin.findAll)
app.get 		('/api/admin/:id', 					admin.find)
app.put 		('/api/admin/:id', 					admin.update)
app.delete 	('/api/admin/:id', 					admin.remove)

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
