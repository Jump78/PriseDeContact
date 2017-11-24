const Campaign = require('./../model/Campaign.model')

module.exports = {
	findAll : ( req, res ) => {
		console.log('Campaign.findAll detected')
		Campaign
			.find({})
			.then( camps => {
				res.json(camps)
			})
			.catch( err => {
				res.json( {error: 1, message: err.message} )
			})
	},

	find : ( req, res ) => {
		Campaign
			.find( {_id: req.params.id} )
			.then( camp => {
				res.json( camp )
			})
			.catch( err => {
				res.json( {error: 1, message: err.message} )
			})
	},

	create : ( req, res ) => {
		const newCampaign = new Campaign( req.body )
		console.log(req.body)
		newCampaign
			.save()
			.then( camp => {
				res.json( {success: 1, message:'campaign add'} )
			})
			.catch( err => res.json( {error: 1, message: err.message} ) )
	},

	update : ( req, res ) => {
		Campaign
			.findOne( {_id: req.params.id} )
			.then( camp => {
				if( camp === null ) {
					return Promise.reject('unknown campaign id')
				} else {
					camp.name = req.body.name || camp.name
					camp.date = req.body.date || camp.date
					camp.outro_text = req.body.outro_text || camp.outro_text
					return camp.save()
				}
			})
			.then(() => res.json({success: 1, message:'campaign udated'}))
			.catch(err => res.json({error: 1, message: err.message}))
	},

	remove : ( req, res ) => {
		Campaign
			.findOneAndRemove( {_id: req.params.id} )
			.then( camp => res.json( {success: 1, message:'campaign deleted'} ) )
			.catch( err => res.json( {error: 1, message: err.message} ) )
	}
}