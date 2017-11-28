const Admin = require('./../model/Admin.model')
const sha256 = require('js-sha256')

module.exports = {
	findAll : ( req, res ) => {
		console.log('Admin.findAll detected')
		Admin
			.find({})
			.then( admins => {
				res.json(admins)
			})
			.catch( err => {
				res.json( {error: 1, message: err.message} )
			})
	},

	find : ( req, res ) => {
		Admin
			.find( {_id: req.params.id} )
			.then( admin => {
				res.json( admin )
			})
			.catch( err => {
				res.json( {error: 1, message: err.message} )
			})
	},

	create : ( req, res ) => {
		req.body.password = sha256( req.body.password )
		const newAdmin = new Admin( req.body )
		newAdmin
			.save()
			.then( admin => {
				res.json( {success: 1, message:'New admin account !', admin: admin} )
			})
			.catch( err => res.json( {error: 1, message: err.message} ) )
	},

	updatePassword : ( req, res ) => {
		Admin
			.findOne( {_id: req.params.id} )
			.then( admin => {
				if( admin === null ) {
					return Promise.reject('unknown admin id')
				} else {
					console.log(req.body)
					admin.password = req.body.password
					return admin.save()
				}
			})
			.then( admin => res.json({success: 1, message:'admin password udated', admin: admin}) )
			.catch( err => res.json({error: 1, message: err.message}))
	},

	remove : ( req, res ) => {
		Admin
			.findOneAndRemove( {_id: req.params.id} )
			.then( admin => res.json( {success: 1, message:'admin deleted'} ) )
			.catch( err => res.json( {error: 1, message: err.message} ) )
	}
}