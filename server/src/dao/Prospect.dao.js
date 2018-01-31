const Prospect = require('./../model/Prospect.model')

module.exports = {
	/**
	 * Get all prospect from DB
	 * @return {Promise} Promise response of the request
	 */
	findAll : () => {
		return Prospect
					 .find({})
	},

	/**
	 * Get all campaigns of one prospect
	 * @param  {int} 	id Prospect's id
	 * @return {Promise} Promise response of the request
	 */
	findMyCampaigns : ( id ) => {
		return Prospect
					.findOne( {_id: id} )
					.populate('campaigns')
	},

	/**
	 * Add a campaing to the prospect
	 * @param {int} idProspect Prospect's id
	 * @param {int} idCampaign Campaign's id
	 * @return {Promise} Promise response of the request
	 */
	addOneCampaign : ( idProspect, idCampaign ) => {
		return Prospect
					.findOne( {_id: idProspect} )
					.then( prospect => {
						if (prospect === null || !prospect ) {
							throw new Error('prospect not found')
						}
						prospect.campaigns.push( idCampaign )
						return prospect.save()
					})
	},

	/**
	 * Remove a campaign to the prospect
	 * @param {int} idProspect Prospect's id
	 * @param {int} idCampaign Campaign's id
	 * @return {Promise} Promise response of the request
	 */
	removeOneCampaign : ( idProspect, idCampaign ) => {
		return Prospect
			.findOne( {_id: idProspect} )
			.then( prospect => {
				if (prospect === null || !prospect ) {
					throw new Error('prospect not found')
				}
				prospect.campaigns = prospect.campaigns.filter( campaign => campaign != idCampaign )
				return prospect.save()
			})

	},

	/**
	 * Find the prospect by his id
	 * @param  {int} 			id 	The prospect's id
	 * @return {Promise}    	Promise with the prospect
	 */
	find : ( id ) => {
		return Prospect
					.findOne( {_id: id} )
	},

	/**
	 * Find prospect by email
	 * @param  {string} email The campaign's email we want to get
	 * @return {Promise}      Promise with the campaign
	 */
	findByEmail : ( email ) => {
		return Prospect
					.findOne( {email: email} )

	},

	/**
	 * Create a new prospect
	 * @param  {object} prospect Prospect's data
	 * @return {Promise}      Promise of the request
	 */
	create : ( prospect ) => {
		const newProspect = new Prospect( prospect )
		return newProspect
					 .save()
	},

	/**
	 * Update the prospect with the id pass in arg
	 * @param  {int} 			id   	The id of the prospect we want to update
	 * @param  {object} 	data 	New data
	 * @return {Promise}      	Promise of the request
	 */
	update : ( id, data ) => {
		return Prospect
			.findOne( {_id: id} )
			.then( ppct => {
				ppct.email = data.email || ppct.email
				ppct.firstname = data.firstname || ppct.firstname
				ppct.lastname = data.lastname || ppct.lastname
				ppct.gender = data.gender || ppct.gender
				ppct.postcode = data.postcode || ppct.postcode
				ppct.city = data.city || ppct.city
				ppct.phone = data.phone || ppct.phone
				ppct.study_level = data.study_level || ppct.study_level
				ppct.asked_level = data.asked_level || ppct.asked_level
				ppct.current_level = data.current_level || ppct.current_level

				return ppct.save()
			})
	},

	/**
	 * Remove a prospect
	 * @param  {int} 	id Prospect's id we want to remove
	 * @return {Promise} Promise of the request
	 */
	remove : ( id ) => {
		return Prospect
					.findOneAndRemove( {_id: id} )
	}
}
