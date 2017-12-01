const Campaign = require('./../model/Campaign.model');
const Prospect = require('./../model/Prospect.model');
const utils = require('./../utils');

module.exports = {
	findAll : ( req, res ) => {
		console.log('Campaign.findAll detected')
		Campaign
			.find({})
			.then( camps => {
				res.json({
					status: 200,
					success: 1,
					message: 'all campaigns found',
					content: camps
				})
			})
			.catch( err => {
				res.json( {status: 400, error: 1, message: err.message} )
			})
	},

	findMyProspects : ( req, res ) => {
		console.log('find prospect from Campaign')
		Campaign
			.findOne( {_id: req.params.id} )
			.populate('prospects')
			.then( camp => {
				return utils.foundVerify( camp, res, 'campaign not found' )
			})
			.then( camp => {
		    res.json({
		    	status: 200,
		    	success: 1,
		    	message: 'campaign prospects found',
		    	content: camp.prospects
		    })
		  })
			.catch( err => {
				res.json( {status: 400, error: 1, message: err.message} )
			})
	},

	find : ( req, res ) => {
		Campaign
			.findOne( {_id: req.params.id} )
			.then( camp => {
				return utils.foundVerify( camp, res, 'campaign not found' )
			})
			.then( camp => {
				res.json({
					status: 200,
					success: 1,
					message: 'campaign found',
					content: camp
				})
			})
			.catch( err => {
				res.json( {status: 400, error: 1, message: err.message} )
			})
	},

	create : ( req, res ) => {
		let newCamp = req.body
		newCamp.prospects = []
		const newCampaign = new Campaign( newCamp )
		
		newCampaign
			.save()
			.then( camp => {
				res.json({
					status: 200,
					success: 1,
					message:'campaign add',
					content: camp
				})
			})
			.catch( err => res.json( {status: 400, error: 1, message: err.message} ) )
	},

	update : ( req, res ) => {
		Campaign
			.findOne( {_id: req.params.id} )
			.then( camp => {
				return utils.foundVerify( camp, res, 'campaign not found' )
			})
			.then( camp => {
				camp.name = req.body.name || camp.name
				camp.type = req.body.type || camp.type
				camp.date = req.body.date || camp.date
				camp.outro_text = req.body.outro_text || camp.outro_text
				camp.prospects = req.body.prospects || camp.prospects
				return camp.save()
			})
			.then( camp => {
				res.json({
					status: 200,
					success: 1,
					message:'campaign updated',
					content: camp
				})
			})
			.catch( err => res.json({status: 400, error: 1, message: err.message}) )
	},

	remove : ( req, res ) => {
		Campaign
			.findOne( {_id: req.params.id} )
			.then( camp => {
				utils.foundVerify( camp, res, 'campaign not found' )
			})
			.then( _ => {
				return Campaign
					.findOneAndRemove( {_id: req.params.id} )
					.then( camp => {
						res.json({
							status: 204,
							success: 1,
							message:'campaign deleted'
						})
					})
			})
			.catch( err => res.json( {status: 400, error: 1, message: err.message} ) )
	}
}