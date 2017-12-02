module.exports = {
	foundVerify : ( item, res, errMessage ) => {
		if( item === null || !item ) {
			res.json( {status: 404, error: 1, message: errMessage} )
		}	else {
			return item
		}
	},
	adminReturnObjectNorm : ( obj ) => {
		let result = {
			_id : obj._id,
			login: obj.login,
			__v: obj.__v
		}
		return result
	}
}