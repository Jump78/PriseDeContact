const Admin = require('./../model/Admin.model')
const sha256 = require('js-sha256')
const utils = require('./../utils');

module.exports = {
	findAll : ( req, res ) => {
		console.log('Admin.findAll detected')
		Admin
			.find({})
			.then( admins => {
				let a = []
				admins.forEach( admin => {
					a.push( utils.adminReturnObjectNorm( admin ) )
				})
				return a
			})
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
			.findOne( {_id: req.params.id} )
			.then( admin => {
				return utils.foundVerify( admin, res, 'admin not found' )
			})
			.then( admin => {
				res.json({
					status: 200,
					success: 1,
					message: 'admin found',
					content: utils.adminReturnObjectNorm( admin )
				})
			})
			.catch( err => {
				res.json( {status: 400, error: 1, message: err.message} )
			})
	},

	connect : ( req, res ) => {
		req.body.password = sha256( req.body.password )
		Admin
			.findOne( {login: req.body.login, password: req.body.password} )
			.then( admin => {
				return utils.foundVerify( admin, res, 'login / password couple not found' )
			})
			.then( admin => {
				res.json({
					status: 200,
					success: 1,
					message: 'admin account found',
					content: utils.adminReturnObjectNorm( admin )
				})
				console.log( req.body.login, 'connection' )
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
					content: utils.adminReturnObjectNorm( admin )
				})
			})
			.catch( err => res.json( {status: 400, error: 1, message: err.message} ) )
	},

	update : ( req, res ) => {
		Admin
			.findOne( {_id: req.params.id} )
			.then( admin => {
				return utils.foundVerify( admin, res, 'admin not found' )
			})
			.then( admin => {
				req.body.password = sha256( req.body.password )

				admin.login = req.body.login || admin.login
				admin.password = req.body.password || admin.password
				return admin.save()
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
			.findOne( {_id: req.params.id} )
			.then( admin => {
				utils.foundVerify( admin, res, 'admin not found' )
			})
			.then( _ => {
				return Admin
					.findOneAndRemove( {_id: req.params.id} )
					.then( admin => {
						res.json({
							status: 204,
							success: 1,
							message:'admin deleted'
						})
					})
			})
			.catch( err => res.json( {status: 400, error: 1, message: err.message} ) )
	}
}