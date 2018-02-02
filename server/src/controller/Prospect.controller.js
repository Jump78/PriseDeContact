const ProspectDAO = require('./../dao/Prospect.DAO')
const CampaignDAO = require('./../dao/Campaign.DAO')

/**
 * Create a new prospect and add him in his campaign
 * @param  {object} data The prospect info
 * @return {object}      Data to send
 */
function createNewProspect( data ){
	let newPpct = data
	newPpct.campaigns = [data.campaign_id] //Set the campaigns id in the prospect

	return ProspectDAO.create(newPpct) //Request to create a new prospect
	.then( ppct => {
		CampaignDAO.addOneProspect(data.campaign_id, ppct._id) //Request to add the prospect to the Campaign
		.then( camp => console.log('Prospect add to campaign: '+ camp._id))
		.catch( err => console.log('Can\'t addpProspect to campaign: '+ camp._id))

		//Object to send to the user if the prospect is create
		return {
			status: 201,
			success: 1,
			message: 'prospect add',
			content: ppct
		}
	})
 .catch( err => {
	 return {status: 400, error: 1, message: err.message}
 })
}

/**
 * Add the prospect to the campaign, and the campaign to the prospect
 * @param  {int} idProspect Prospect id
 * @param  {int} idCampaign Campaign id
 * @return {object}      Data to send
 */
function updateProspectAndCampaign( idProspect, idCampaign ){
	let campaignAddPromise = CampaignDAO.addOneProspect(idCampaign, idProspect)
		.then( camp => console.log('campaign update success'))
		.catch( err => console.log(err) )

	let ppct = null;
	let prospectAddPromise = ProspectDAO.addOneCampaign(idProspect, idCampaign)
		.then( prospect => {
			ppct = prospect
			console.log('prospect update success')
		})
		.catch( err => console.log(err) )

	return Promise.all([campaignAddPromise, prospectAddPromise] )
		.then(() => {
			return {
				status: 204,
				success: 1,
				message: 'prospect update and campaign update',
				content: ppct
			}
		})
}

module.exports = {
	/**
	 * Return all the prospect to the client
	 * @param  {Request} 	req The request
	 * @param  {Response} res The response
	 * @return {Response}     Send the data to the client
	 */
	findAll : ( req, res ) => {
		console.log('Prospect.findAll detected')
		ProspectDAO.findAll()
		.then( prospects => {
			return res.json({
				status: 200,
				success: 1,
				message: 'all prospects found',
				content: prospects
			})
		})
		.catch( err => {
			return res.json( {status: 400, error: 1, message: err.message} )
		})
	},

	/**
	 * Return all campaigns of the given prospect
	 * @param  {Request} 	req The request
	 * @param  {Response} res The response
	 * @return {Response}     Send the data to the client
	 */
	findMyCampaigns : ( req, res ) => {
		console.log('find campaign from prospect')
		ProspectDAO.findMyCampaigns(req.params.id)
		.then( prospect => {
			if (prospect === null || !prospect ) {
				return res.json( {status: 404, error: 1, message: 'prospect not found'} )
			}
	    return res.json({
	    	status: 200,
	    	success: 1,
	    	message: 'prospect campaigns found',
	    	content: prospect.campaigns
	    })
	  })
		.catch( err => {
			return res.json( {status: 400, error: 1, message: err.message} )
		})
	},

	/**
	 * Add one campaign to the given prospect
	 * @param  {Request} 	req The request
	 * @param  {Response} res The response
	 * @return {Response}     Send the data to the client
	 */
	addOneCampaign : ( req, res ) => {
		console.log('Add campaign to prospect')
		if (!req.body.campaign) {
			return res.json( {status: 400, error: 1, message: 'no campaign in post data'} )
		}

		ProspectDAO.addOneCampaign( req.params.id, req.body.campaign._id)
		.then( prospect => {
			if (prospect === null || !prospect ) {
				return res.json( {status: 404, error: 1, message: 'prospect not found'} )
			}
	    return res.json({
	    	status: 200,
	    	success: 1,
	    	message: 'campaign add to prospect',
	    	content: prospect
	    })
	  })
		.catch( err => {
			return res.json( {status: 400, error: 1, message: err.message} )
		})
	},

	/**
	 * Remove one campaign of the given prospect
	 * @param  {Request} 	req The request
	 * @param  {Response} res The response
	 * @return {Response}     Send the data to the client
	 */
	removeOneCampaign : ( req, res ) => {
		ProspectDAO.removeOneCampaign( req.params.prospectid, req.params.campaignid)
			.then( ppct => {
		    return res.json({
		    	status: 200,
		    	success: 1,
		    	message: 'campaign remove from prospect',
		    	content: ppct
		    })
		  })
			.catch( err => {
				return res.json( {status: 400, error: 1, message: err.message} )
			})
	},

	/**
	 * Return the prospect by his id
	 * @param  {Request} 	req The request
	 * @param  {Response} res The response
	 * @return {Response}     Send the data to the client
	 */
	find : ( req, res ) => {
		ProspectDAO.find(req.params.id)
		.then( ppct => {
			return res.json({
				status: 200,
				success: 1,
				message: 'prospect found',
				content: ppct
			})
		})
		.catch( err => {
			return res.json( {status: 400, error: 1, message: err.message} )
		})
	},

	/**
	 * Create prospect
	 * @param  {Request} 	req The request
	 * @param  {Response} res The response
	 * @return {Response}     Send the data to the client
	 */
	create : function( req, res, io ) {
		ProspectDAO.findByEmail(req.body.email)
		.then( prospect => {
				if (!prospect) { //If zero prospect is found
					createNewProspect(req.body)
					.then( data => {
						req.io.sockets.in("room-"+req.body.campaign_id).emit( 'prospectAdd', data.content )
						return res.json(data)
					})
					.catch( err => {
						return res.json(err)
					})

				} else { //If a prospect is found
					if (prospect.campaigns.indexOf(req.body.campaign_id) == -1) { //Verify if the prospect is already subscribed
						updateProspectAndCampaign(prospect._id, req.body.campaign_id)
						.then( data => {
							req.io.sockets.in("room-"+req.body.campaign_id).emit( 'prospectAdd', data.content )
							return res.json( data )
						})
						.catch(err => {
							return res.json( {status: 400, error: 1, message: err.message} )
						})
					} else { //If the prospect is already subscribed
						return res.json({
							status: 204,
							success: 1,
							message: 'already subscribed',
						})
					}
				}
			}
		)
	},

	/**
	 * Update the prospect with the id pass in arg
	 * @param  {int} 			id   	The id of the prospect we want to update
	 * @param  {object} 	data 	New data
	 * @return {Promise}      	Promise of the request
	 */
	update : ( req, res ) => {
		ProspectDAO.update( req.params.id, req.body )
		.then( ppct => {
			return res.json({
				status: 200,
				success: 1,
				message: 'prospect updated',
				content: ppct
			})
		})
		.catch(err => {
			return res.json( {status: 400, error: 1, message: err.message} )
		})
	},

	/**
	 * Remove campaign
	 * @param  {int} 	id Prospect's id we want to remove
	 * @return {Promise} Promise response of the request
	 */
	remove : ( req, res ) => {
		ProspectDAO.remove( req.params.id )
		.then( camp => {
			return res.json({
				status: 204,
				success: 1,
				message:'prospect deleted'
			})
		})
		.catch( err => {
			return res.json( {status: 400, error: 1, message: err.message})
		})
	}
}
