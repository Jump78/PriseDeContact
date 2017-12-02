const Prospect = require('./../model/Prospect.model')
const Campaign = require('./../model/Campaign.model')
const utils = require('./../utils');

module.exports = {
	findAll : ( req, res ) => {
		console.log('Prospect.findAll detected')
		Prospect
			.find({})
			.then( ppcts => {
				res.json({
					status: 200,
					success: 1,
					message: 'all prospects found',
					content: ppcts
				})
			})
			.catch( err => {
				res.json( {status: 400, error: 1, message: err.message} )
			})
	},

	findMyCampaigns : ( req, res ) => {
		console.log('find campaign from Prospect')
		Prospect
			.findOne( {_id: req.params.id} )
			.populate('campaigns')
			.then( ppct => {
				return utils.foundVerify( ppct, res, 'prospect not found' )
			})
			.then( ppct => {
		    res.json({
		    	status: 200,
		    	success: 1,
		    	message: 'prospect campaigns found',
		    	content: ppct.campaigns
		    })
		  })
			.catch( err => {
				res.json( {status: 400, error: 1, message: err.message} )
			})
	},

	find : ( req, res ) => {
		Prospect
			.findOne( {_id: req.params.id} )
			.then( ppct => {
				return utils.foundVerify( ppct, res, 'prospect not found' )
			})
			.then( ppct => {
				res.json({
					status: 200,
					success: 1,
					message: 'prospect found',
					content: ppct
				})
			})
			.catch( err => {
				res.json( {status: 400, error: 1, message: err.message} )
			})
	},

	create : ( req, res ) => {
		let newPpct = req.body
		newPpct.campaigns = [req.body.campaign_id]
		delete newPpct.campaign_id
		const newProspect = new Prospect( newPpct )
		//console.log("newPpct", newPpct)
		newProspect
			.save()
			.then( ppct => {
				req.body = ppct;
				res.json({
					status: 200,
					success: 1,
					message: 'prospect add',
					content: ppct
				})
			})
			.catch( err => res.json( {status: 400, error: 1, message: err.message} ) )
	},

	update : ( req, res ) => {
		Prospect
			.findOne( {_id: req.params.id} )
			.then( ppct => {
				return utils.foundVerify( ppct, res, 'prospect not found' )
			})
			.then( ppct => {
				ppct.email = req.body.email || ppct.email
				ppct.firstname = req.body.firstname || ppct.firstname
				ppct.lastname = req.body.lastname || ppct.lastname
				ppct.gender = req.body.gender || ppct.gender
				ppct.postcode = req.body.postcode || ppct.postcode
				ppct.city = req.body.city || ppct.city
				ppct.phone = req.body.phone || ppct.phone
				ppct.study_level = req.body.study_level || ppct.study_level
				ppct.asked_level = req.body.asked_level || ppct.asked_level
				ppct.current_level = req.body.current_level || ppct.current_level

				return ppct.save()
			})
			.then( ppct => {
				res.json({
					status: 200,
					success: 1,
					message: 'prospect updated',
					content: ppct
				})
			})
			.catch(err => res.json( {status: 400, error: 1, message: err.message} ) )
	},

	remove : ( req, res ) => {
		Prospect
			.findOne( {_id: req.params.id} )
			.then( ppct => {
				utils.foundVerify( ppct, res, 'prospect not found' )
			})
			.then( _ => {
				return Prospect
					.findOneAndRemove( {_id: req.params.id} )
					.then( ppct => {
						res.json({
							status: 204,
							success: 1,
							message: 'prospect deleted'
						})
					})
			})
			.catch( err => res.json( {status: 400, error: 1, message: err.message} ) )
	}
}
