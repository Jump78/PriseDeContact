const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const adminSchema = new mongoose.Schema(
	{
	  login: 	{ type: String, required: true },
	  password: 	{ type: String, required: true }
	},
	{ collection: 'admins' }
)

const adminModel = mongoose.model('Admin', adminSchema)

module.exports = adminModel