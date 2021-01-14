const Test = require('../models/Test');

module.exports = (req, res) => {

	let data = [
		new Test('Justin Trudeau', 13),
		new Test('Jacinda Ardern', 2),
		new Test('Angela Merkle', 35),
	];


	res.render('testView', {
		data : data,
	});
};