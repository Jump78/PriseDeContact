const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const prospectSchema = new mongoose.Schema(
	{
	  email : 				{ type: String, required: true },
	  firstname : 		{ type: String, required: true },
	  lastname : 			{ type: String, required: true },
		gender : 				{ type: String, required: true },
		adress : 				{ type: String, required: true },
	  postcode : 			{ type: Number, required: true },
	  city: 					{ type: String, required: true },
	  phone: 					{ type: String, required: true },
	  study_level: 		{ type: String, required: true },
	  asked_class: 		{ type: String, required: true },
	  current_class: 	{ type: String, required: true },
	  campaigns: 			{ type: Array, required: false }
	},
	{ collection: 'prospects' }
)

const prospectModel = mongoose.model('Prospect', prospectSchema)

module.exports = prospectModel