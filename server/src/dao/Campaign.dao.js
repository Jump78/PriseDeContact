const Campaign = require('./../model/Campaign.model');

module.exports = {

	/**
	 * Find all campaigns from DB
	 * @return {Promise} Promise response of the request
	 */
	findAll : () => {
		return Campaign
					 .find({})
	},

	/**
	 * Find all prospects of one campaign
	 * @param  {int} 	id: Campaign's id
	 * @return {Promise} Promise response of the request
	 */
	findMyProspects : ( id ) => {
		return Campaign
					.findOne( {_id: id} )
					.populate('prospects')
	},

	/**
	 * Add one prospect in one campaign
	 * @param {int} idCampaign: Campaign's id
	 * @param {int} idProspect: Prospect's id
	 * @return {Promise} Promise response of the request
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
	 * Remove one prospect from one campaign
	 * @param {int} idCampaign: Campaign's id
	 * @param {int} idProspect: Prospect's id
	 * @return {Promise} Promise response of the request
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
	 * Find one campaign by his id
	 * @param  {int} 			id: campaign's id
	 * @return {Promise}    	Promise with the campaign
	 */
	find : ( id ) => {
		return Campaign
					.findOne( {_id: id} )
	},

	/**
	 * Create a new campaign
	 * @param  {object} campaign: Campaign's data
	 * @return {Promise}      Promise of the request
	 */
	create : ( campaign ) => {
		const newCampaign = new Campaign( campaign)
		return newCampaign
					 .save()
	},

	/**
	 * Update one campaign
	 * @param  {int} 			id:   	The id of the campaign we want to update
	 * @param  {object} 	data: 	New data
	 * @return {Promise}      	  Promise of the request
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
	 * Remove one campaign
	 * @param  {int} 	id: Campaign's id we want to remove
	 * @return {Promise} Promise response of the request
	 */
	remove : ( id ) => {
		return Campaign
					.findOneAndRemove( {_id: id} )
	}
}
