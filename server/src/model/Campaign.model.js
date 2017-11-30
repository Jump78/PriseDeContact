const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const campaignSchema = new mongoose.Schema(
	{
	  name: 	{ type: String, required: true },
	  type: 	{ type: String, required: true },
	  date: 	{ type: String, required: true },
	  outro_text: 	{ type: String, required: true },
	  prospects: 		[ { type: Schema.Types.ObjectId, ref:'Prospect' } ]
	},
	{ collection: 'campaigns' }
)

const campaignModel = mongoose.model('Campaign', campaignSchema)

module.exports = campaignModel