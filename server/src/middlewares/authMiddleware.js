const jwt = require('jsonwebtoken')

// Array of uri we don't want to check
let cookieNoCheck = [
	{
		path: /campaign\/[0-9a-fA-F]+$/,
		method: 'GET',
		type: 'regex'
	},
	{
		path: /campaign\/date\/[0-9]+$/,
		method: 'GET',
		type: 'regex'
	},
	{
		path: '/campaign',
		method: 'GET',
		type: 'string'
	},
	{
		path: '/admin/login',
		method: 'POST',
		type: 'string'
	},
	{
		path: '/admin',
		method: 'POST',
		type: 'string'
	},
	{
		path: '/prospect',
		method: 'POST',
		type: 'string'
	}
]

/**
 * Check if the request's owner have the right to make the request
 * @param  {Object}   req  The request
 * @param  {Object}   res  The response
 * @param  {Function} next Express function
 * @return {Response}      Response to the client if he don't have the right, else pass to next middleware
 */
function authMiddleware (req, res, next) {
	let csrfToken = req.headers['authorization'];
	let token = req.cookies['access_token'];

	// Test if the uri is one of the array
	let test = cookieNoCheck.filter( (item) => {
		if (item.type == 'regex') {
			return Array.isArray(req.url.match(item.path)) && req.method == item.method
		}
		return req.url === item.path && req.method == item.method
	});

	if (test.length == 0 && req.method != 'OPTIONS') {
		// Check if there is a token in Authorization headers
		if (!csrfToken) {
			res.status(400);
			return res.send('Headers authorization not found')
		}

		// Check if there is a token in the cookie
		if (!token) {
			res.status(400);
			return res.send('Cookies with token not found')
		}

		// Check if the token in cookie is correct
		jwt.verify(token, 'dEA0hDoaCc', function(err, decoded) {
	    if (err || (decoded.csrfToken != csrfToken)) { //If the token is wrong or the crsfToken is diffrent
			  res.status(401);
				return res.send('Need authorization') //Response an error
	    } else {
        next(); // Pass to next middleware
	    }
		})
	} else {
		next(); // Pass to next middleware
	}
}

module.exports = authMiddleware;
