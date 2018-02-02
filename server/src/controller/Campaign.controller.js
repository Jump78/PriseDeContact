const CampaignDAO = require('./../dao/Campaign.dao');
const Prospect = require('./../model/Prospect.model');
const utils = require('./../utils');

module.exports = {
	/**
	 * Return all campaigns
	 * @param  {Request} 	req The request
	 * @param  {Response} res The response
	 * @return {Response}     Send the data to the client
	 */
	findAll : ( req, res ) => {
		console.log('Campaign.findAll detected')
		CampaignDAO.findAll()
		.then( camps => {
			return res.json({
				status: 200,
				success: 1,
				message: 'all campaigns found',
				content: camps
			})
		})
		.catch( err => {
			return res.json( {status: 400, error: 1, message: err.message} )
		})
	},

	/**
	 * Return all prospects of the given campaign
	 * @param  {Request} 	req The request
	 * @param  {Response} res The response
	 * @return {Response}     Send the data to the client
	 */
	findMyProspects : ( req, res ) => {
		console.log('find prospect from Campaign')
		CampaignDAO.findMyProspects(req.params.id)
		.then( camp => {
			if (camp === null || !camp ) {
				return res.json( {status: 404, error: 1, message: 'camp not found'} )
			}
	    return res.json({
	    	status: 200,
	    	success: 1,
	    	message: 'campaign prospects found',
	    	content: camp.prospects
	    })
	  })
		.catch( err => {
			return res.json( {status: 400, error: 1, message: err.message} )
		})
	},

	/**
	 * Add one prospect of the given campaign
	 * @param  {Request} 	req The request
	 * @param  {Response} res The response
	 * @return {Response}     Send the data to the client
	 */
	addOneProspect : ( req, res ) => {
		console.log('Add prospect to campaign')
		if (!req.body.prospect) {
			return res.json( {status: 400, error: 1, message: 'No prospect in post data'} )
		}

		CampaignDAO.addOneProspect( req.params.id, req.body.prospect._id)
		.then( camp => {
			if (camp === null || !camp ) {
				return res.json( {status: 404, error: 1, message: 'campaign not found'} )
			}
	    return res.json({
	    	status: 200,
	    	success: 1,
	    	message: 'prospect add to campaign',
	    	content: camp
	    })
	  })
		.catch( err => {
			return res.json( {status: 400, error: 1, message: err.message} )
		})
	},

	/**
	 * Remove one prospect of the given campaign
	 * @param  {Request} 	req The request
	 * @param  {Response} res The response
	 * @return {Response}     Send the data to the client
	 */
	removeOneProspect : ( req, res ) => {
		console.log('Remove prospect to campaign')
		CampaignDAO.removeOneProspect( req.params.campaignid, req.params.prospectid)
		.then( camp => {
			if (camp === null || !camp ) {
				return res.json( {status: 404, error: 1, message: 'campaign not found'} )
			}
	    return res.json({
	    	status: 200,
	    	success: 1,
	    	message: 'prospect remove from campain',
	    	content: camp
	    })
	  })
		.catch( err => {
			return res.json( {status: 400, error: 1, message: err.message} )
		})
	},

	/**
	 * Return the campaign by his id
	 * @param  {Request} 	req The request
	 * @param  {Response} res The response
	 * @return {Response}     Send the data to the client
	 */
	find : ( req, res ) => {
	console.log('Campaign.find detected')
	CampaignDAO.find( req.params.id )
		.then( camp => {
			if (camp === null || !camp ) {
				return res.json( {status: 404, error: 1, message: 'campaign not found'} )
			}
			return res.json({
				status: 200,
				success: 1,
				message: 'campaign found',
				content: camp
			})
		})
		.catch( err => {
			return res.json( {status: 400, error: 1, message: err.message} )
		})
	},

	/**
	 * Create campaign
	 * @param  {Request} 	req The request
	 * @param  {Response} res The response
	 * @return {Response}     Send the data to the client
	 */
	create : ( req, res ) => {
		console.log('Create campaign')
		let newCamp = req.body
		newCamp.prospects = []
		CampaignDAO.create(newCamp)
		.then( camp => {
			return res.json({
				status: 200,
				success: 1,
				message:'campaign add',
				content: camp
			})
		})
		.catch( err => {
			return res.json( {status: 400, error: 1, message: err.message} )
		})
	},

	/**
	 * Update campaign
	 * @param  {Request} 	req The request
	 * @param  {Response} res The response
	 * @return {Response}     Send the data to the client
	 */
	update : ( req, res ) => {
		CampaignDAO.update(req.params.id, req.body)
		.then( camp => {
			return res.json({
				status: 200,
				success: 1,
				message:'campaign updated',
				content: camp
			})
		})
		.catch( err => {
			return res.json({status: 400, error: 1, message: err.message})
		})
	},

	/**
	 * Remove campaign
	 * @param  {Request} 	req The request
	 * @param  {Response} res The response
	 * @return {Response}     Send the data to the client
	 */
	remove : ( req, res ) => {
		CampaignDAO.remove( req.params.id )
		.then( camp => {
			return res.json({
				status: 204,
				success: 1,
				message:'campaign deleted'
			})
		})
		.catch( err => res.json( {status: 400, error: 1, message: err.message} ) )
	}
}
