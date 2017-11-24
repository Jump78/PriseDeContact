const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const campaignSchema = new mongoose.Schema(
	{
	  name: 	{ type: String, required: true },
	  date: 	{ type: String, required: true },
	  outro_text: 	{ type: String, required: true }
	},
	{ collection: 'campaigns' }
)

const campaignModel = mongoose.model('Campaign', campaignSchema)

module.exports = campaignModel