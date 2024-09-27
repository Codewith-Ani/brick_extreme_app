// CREATE TOKEN AND SAVE IN THE COOKIE

export default (user, statusCode, res) => {
	//Create JWT TOKEN
	const token = user.getJwtToken();

	// Options for COOKIE
	const options = {
		expires: new Date(
			Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	res.status(statusCode).cookie('token', token, options).json({
		token,
	});
};
