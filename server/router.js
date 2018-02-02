const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')

const prospect = require('./src/controller/Prospect.controller')
const campaign = require('./src/controller/Campaign.controller')
const admin = require('./src/controller/Admin.controller')

router.use( (req, res, next) => {
	res.header('Access-Control-Allow-Credentials', true);
	// le serveur accepte les requête ajax provenant de certains domaines
	let p = ['http://localhost:8080', 'http://localhost:8081', 'http://192.168.21.124:8080', 'http://192.168.21.124:8081', 'http://192.168.10.101:8080', 'http://192.168.21.124:8080', 'http://192.168.21.124:8081']
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
		method: 'POST'
	},	{
		path: '/admin',
		method: 'POST'
	},
	{
		path: '/prospect',
		method: 'POST'
	}
]

router.use( (req, res, next) => {
	let csrfToken = req.headers['authorization'];
	let token = req.cookies['access_token'];

	let test = cookieNoCheck.filter( (item) => req.url === item.path && req.method == item.method);
	if (!test.length && req.method != 'OPTIONS' && req.method != 'GET') {
		if (!csrfToken) {
			res.status(400);
			return res.send('Headers authorization not found')
		}

		if (!token) {
			res.status(400);
			return res.send('Cookies with token not found')
		}

		jwt.verify(token, 'dEA0hDoaCc', function(err, decoded) {
	    if (err || (decoded.csrfToken != csrfToken)) {
			  res.status(401);
				return res.send('Need authorization')
	    } else {
        next();
	    }
		})
	} else {
		next();
	}
})

// CRUD Prospects
router.post 	('/prospect',					 			prospect.create)
router.get 		('/prospect', 							prospect.findAll)
router.get 		('/prospect/:id', 					prospect.find)
router.get 		('/prospect/:id/campaign', 	prospect.findMyCampaigns)
router.put 		('/prospect/:id', 					prospect.update)
router.post 	('/prospect/:id/campaign', 	prospect.addOneCampaign)
router.delete ('/prospect/:id', 					prospect.remove)
router.delete ('/prospect/:prospectid/campaign/:campaignid', 	prospect.removeOneCampaign)

// CRUD Campaigns
router.post 	('/campaign', 									campaign.create)
router.get 		('/campaign', 									campaign.findAll)
router.get 		('/campaign/:id', 							campaign.find)
router.get 		('/campaign/:id/prospect', 			campaign.findMyProspects)
router.put 		('/campaign/:id', 							campaign.update)
router.post 	('/campaign/:id/prospect', 			campaign.addOneProspect)
router.delete ('/campaign/:id', 							campaign.remove)
router.delete ('/campaign/:campaignid/prospect/:prospectid', 	campaign.removeOneProspect)

// CRUD Admin accounts
router.post 	('/admin', 							admin.create)
router.post 	('/admin/login', 				admin.connect)
router.get 		('/admin', 							admin.findAll)
router.get 		('/admin/:id', 					admin.find)
router.put 		('/admin/:id', 					admin.update)
router.delete ('/admin/:id', 					admin.remove)

module.exports = router;
