const AdminDAO = require('./../dao/Admin.dao')
const sha256 = require('js-sha256')
const utils = require('./../utils')
const randomstring = require("randomstring")
const jwt = require('jsonwebtoken')

module.exports = {
	/**
	 * Return all the admin to the client
	 * @param  {Request} 	req The request
	 * @param  {Response} res The response
	 * @return {Response}     Send the data to the client
	 */
	findAll : (req, res) => {
		console.log('Admin.findAll detected')
		AdminDAO.findAll()
		.then( admins => {
			admins = admins.map( item => utils.adminReturnObjectNorm(item) )
			return	res.json({
								status: 200,
								success: 1,
								message: 'all prospects found',
								content: admins
							})
		})
		.catch( err => res.json( {status: 400, error: 1, message: err.message} ))
	},

	/**
	 * Return the admin find
	 * @param  {Request} 	req The request
	 * @param  {Response} res The response
	 * @return {Response}     Send the data to the client
	 */
	find : ( req, res ) => {
		console.log('Admin.find detected')
		AdminDAO.find(req.params.id)
		.then( admin => {
			if (admin === null || !admin ) {
				return res.json( {status: 404, error: 1, message: 'admin not found'} )
			}
			return res.json({
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

	/**
	 * Check the login and the password sent with the data from db
	 * @param  {Request} 	req The request
	 * @param  {Response} res The response
	 * @return {Response}     Send the data to the client
	 */
	connect : ( req, res ) => {
		AdminDAO
		.findByEmail( req.body.login )
		.then( admin => {
			if (admin === null || !admin ) { //Check if we found an admin
				return res.json( {status: 404, error: 1, message: 'login / password couple not found'} )
			}

			//Check if the password in db is the same as the password sent concat to the admin salt
			if (admin.password == sha256( req.body.password + admin.salt )) {
				return admin
			} else {
				throw new Error('login / password couple not found')
			}
		})
		.then( admin => {
			let payload = {
				login: admin.login,
				csrfToken: randomstring.generate()
			}

			let token = jwt.sign( //Create token
				payload, //Payload
				'dEA0hDoaCc', //Secret
				{ //Option
					expiresIn: '1 days'
				}
			)

			res.cookie( //Set cookie
				'access_token',
				token,
				{
				 	httpOnly: true,
				// 	secure: true
				}
			)
			res.json({
				status: 200,
				success: 1,
				message: 'admin account found',
				content: payload.csrfToken
			})
			console.log( admin.login, 'connection' )
		})
		.catch( err => {
			res.json( {status: 400, error: 1, message: err.message} )
		})
	},

	/**
	 * Create an admin
	 * @param  {Request} 	req The request
	 * @param  {Response} res The response
	 * @return {Response}     Send the data to the client
	 */
	create: ( req, res ) =>{
		if (!req.body.login) {
			return res.json( {
				status: 400,
				error: 1,
				message: 'Login is empty'
			} )
		}
		if (!req.body.password) {
			return res.json( {
				status: 400,
				error: 1,
				message: 'Password is empty'
			} )
		}
		req.body.salt = randomstring.generate()
		req.body.password = sha256( req.body.password + req.body.salt )
		AdminDAO.create(req.body)
			.then( admin => {
				res.json({
					status: 201,
					success: 1,
					message:'new admin account !',
					content: utils.adminReturnObjectNorm( admin )
				})
			})
			.catch( err => res.json( {status: 400, error: 1, message: err.message} ) )
	},

	update : ( req, res ) => {
		AdminDAO
		.update( req.params.id, req.body )
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
		AdminDAO
			.remove( req.params.id )
			.then( _ => {
				return	res.json({
						status: 204,
						success: 1,
						message:'admin deleted'
					})
			})
			.catch( err => res.json( {status: 400, error: 1, message: err.message} ) )
	}
}
