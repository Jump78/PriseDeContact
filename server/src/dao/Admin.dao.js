const Admin = require('./../model/Admin.model')
const sha256 = require('js-sha256')

module.exports = {
	/**
	 * Get all admin from db
	 * @return {Promise} Promise with all admin
	 */
	findAll : () => {
		return Admin
					.find({})
	},

	/**
	 * Find the admin by his id
	 * @param  {int} 			id 	The admin's id
	 * @return {Promise}    	Promise with the admin
	 */
	find : ( id ) => {
		return Admin
					.findOne( {_id: id} )
	},

	/**
	 * Find admin by email
	 * @param  {string} email The admin's email we want to get
	 * @return {Promise}      Promise with the admin
	 */
	findByEmail : ( email ) => {
		return Admin
					.findOne( {login: email} )

	},

	/**
	 * Create a new admin
	 * @param  {object} admin Admin's data
	 * @return {Promise}      Promise of the request
	 */
	create : ( admin ) => {
		const newAdmin = new Admin( admin)
		return newAdmin
					 .save()
	},

	/**
	 * Update the admin with the id pass in arg
	 * @param  {int} 			id   	The id of the admin we want to update
	 * @param  {object} 	data 	New data
	 * @return {Promise}      	Promise of the request
	 */
	update : ( id, data ) => {
		return Admin
					.findOne( {_id: id} )
					.then( admin => {
						admin.login = data.login || admin.login
						admin.password = sha256(data.password+admin.salt) || admin.password
						return admin.save()
					})
	},

	/**
	 * Remove an admin
	 * @param  {int} 	id Admin's id we want to remove
	 * @return {Promise}    [description]
	 */
	remove : ( id ) => {
		return Admin
					.findOneAndRemove( {_id: id} )
	}
}
