const Campaign = require('./../model/Campaign.model');

module.exports = {

	/**
	 * Get all the campaing from DB
	 * @return {Promise} Promise response of the request
	 */
	findAll : () => {
		return Campaign
					 .find({})
	},

	/**
	 * Get all prospect of one campaign
	 * @param  {int} 	id Campaign's id
	 * @return {Promise} Promise response of the request
	 */
	findMyProspects : ( id ) => {
		return Campaign
					.findOne( {_id: id} )
					.populate('prospects')
	},

	/**
	 * Add a prospect to the campaign
	 * @param {int} idCampaign Campaign's id
	 * @param {int} idProspect Prospect's id
	 */
	addOneProspect : ( idCampaign, idProspect ) => {
		return Campaign
					.findOne( {_id: idCampaign} )
					.then( camp => {
						if (camp === null || !camp ) {
							throw new Error('campaign not found')
						}
						camp.prospects.push( idProspect )
						return camp.save()
					})
	},

	/**
	 * Remove a prospect to the campaign
	 * @param {int} idCampaign Campaign's id
	 * @param {int} idProspect Prospect's id
	 */
	removeOneProspect : ( idCampaign, idProspect ) => {
		return Campaign
			.findOne( {_id: idCampaign} )
			.then( camp => {
				if (camp === null || !camp ) {
					throw new Error('campaign not found')
				}
				camp.prospects = camp.prospects.filter( ppct => ppct != idProspect )
				return camp.save()
			})

	},


	/**
	 * Find the campaign by his id
	 * @param  {int} 			id 	The campaign's id
	 * @return {Promise}    	Promise with the campaign
	 */
	find : ( id ) => {
		return Campaign
					.findOne( {_id: id} )
	},

	/**
	 * Find campaign by email
	 * @param  {string} email The campaign's email we want to get
	 * @return {Promise}      Promise with the campaign
	 */
	findByEmail : ( email ) => {
		return Campaign
					.findOne( {login: email} )

	},

	/**
	 * Create a new campaign
	 * @param  {object} campaign Campaign's data
	 * @return {Promise}      Promise of the request
	 */
	create : ( campaign ) => {
		const newCampaign = new Campaign( campaign)
		return newCampaign
					 .save()
	},

	/**
	 * Update the campaign with the id pass in arg
	 * @param  {int} 			id   	The id of the campaign we want to update
	 * @param  {object} 	data 	New data
	 * @return {Promise}      	Promise of the request
	 */
	update : ( id, data ) => {
		return Campaign
					.findOne( {_id: id} )
					.then( camp => {
						camp.name = data.name || camp.name
						camp.type = data.type || camp.type
						camp.date = data.date || camp.date
						camp.outro_text = data.outro_text || camp.outro_text
						camp.prospects = data.prospects || camp.prospects

						return camp.save()
					})
	},

	/**
	 * Remove an campaign
	 * @param  {int} 	id Campaign's id we want to remove
	 * @return {Promise}    [description]
	 */
	remove : ( id ) => {
		return Campaign
					.findOneAndRemove( {_id: id} )
	}
}
