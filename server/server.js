require('colors')
const config = require ('./config.js')

const ip = process.env.ALWAYSDATA_HTTPD_IP || 'localhost'
const port = process.env.ALWAYSDATA_HTTPD_PORT || 8020
const apiSubDirectoy = (process.env.ALWAYSDATA_HTTPD_IP)?'/api' :'/'
const mongoUrl = (process.env.ALWAYSDATA_HTTPD_IP)? config.mongoProdUrl :'mongodb://localhost:27017/pdc';
let socketOption = {
	serveClient: false
}

if (process.env.ALWAYSDATA_HTTPD_IP) {
	socketOption = {
		path:'/api/socket.io',
		serveClient: false
	}
}

// express
const express = require('express')
const router = require('./router')
const app = express()

// socket
const server = require('http').createServer(app)
const io = require('socket.io').listen(server, socketOption)

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// parse cookie
app.use(cookieParser())

// Création du server
app.use( express.static('client') );

// Socket io ecoute une nouvelle connection
io.on('connection', (socket) => {
	console.log(`Somone just connected`)
	let roomId = socket.handshake.query.roomId;
	console.log('Join :'+roomId);
	socket.join('room-'+roomId);
	io.sockets.in("room-"+roomId).emit('connectToRoom', "You are in room"+roomId);
})

// Intègre io dans la requete( permet d'y acceder dans les controlleurs)
app.use((req, res, next) => {
	req.io = io
	next()
})

// Injecte le router
app.use(apiSubDirectoy, router);

// Indique à mongoose que les promesse à utiliser
// sont celles par défaut dans Node.js (objet global)
mongoose.Promise = global.Promise

// Connexion à la base de données MONGO
mongoose.connect(mongoUrl, { useMongoClient: true })
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
				ip,
				() => console.log(' App Started '.bgGreen.black, `Le serveur http://${ip}:${port} est prêt !`.green))
		}
	)
