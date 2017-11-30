const Admin = require('./../model/Admin.model')
const sha256 = require('js-sha256')

module.exports = {
	findAll : ( req, res ) => {
		console.log('Admin.findAll detected')
		Admin
			.find({})
			.then( admins => {
				res.json({
					status: 200,
					success: 1,
					message: 'all prospects found',
					content: admins
				})
			})
			.catch( err => {
				res.json( {status: 400, error: 1, message: err.message} )
			})
	},

	find : ( req, res ) => {
		Admin
			.find( {_id: req.params.id} )
			.then( admin => {
				res.json({
					status: 200,
					success: 1,
					message: 'admin found',
					content: admin
				})
			})
			.catch( err => {
				res.json( {status: 400, error: 1, message: err.message} )
			})
	},

	connect : ( req, res ) => {
		req.body.password = sha256( req.body.password )
		Admin
			.find( {login: req.body.login, password: req.body.password} )
			.then( admin => {
				if (admin.length > 0) {
					res.json({
						status: 200,
						success: 1,
						message: 'admin account found',
						content: admin[0]
					})
					console.log( req.body.login, 'connection' )
				} else {
					res.json( {status: 400, error: 1, message: 'login / password couple not found'} )
					console.log( `try to connect on ${req.body.login} account` )
				}
			})
			.catch( err => {
				res.json( {status: 400, error: 1, message: err.message} )
			})
	},

	create : ( req, res ) => {
		req.body.password = sha256( req.body.password )
		const newAdmin = new Admin( req.body )
		newAdmin
			.save()
			.then( admin => {
				res.json({
					status: 200,
					success: 1,
					message:'new admin account !',
					content: admin
				})
			})
			.catch( err => res.json( {status: 400, error: 1, message: err.message} ) )
	},

	update : ( req, res ) => {
		Admin
			.findOne( {_id: req.params.id} )
			.then( admin => {
				if( admin === null ) {
					return Promise.reject('unknown admin id')
				} else {
					req.body.password = sha256( req.body.password )

					admin.login = req.body.login || admin.login
					admin.password = req.body.password || admin.password
					return admin.save()
				}
			})
			.then( admin => {
				res.json({
					status: 200,
					success: 1,
					message:'admin updated',
					content: admin
				})
			})
			.catch( err => res.json( {status: 400, error: 1, message: err.message} ) )
	},

	remove : ( req, res ) => {
		Admin
			.findOneAndRemove( {_id: req.params.id} )
			.then( admin => {
				res.json({
					status: 204,
					success: 1,
					message:'admin deleted'
				})
			})
			.catch( err => res.json( {status: 400, error: 1, message: err.message} ) )
	}
}