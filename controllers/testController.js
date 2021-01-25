const Test = require('../models/Test');

exports.getTestData = (req, res) => {
	let data = [
		new Test('Test name', 12),
		new Test('Second name', 13)
	];
	res.render('testView', {
		data : data,
	});
};

exports.getSecondTestData = (req, res) => {
	let data = [
		new Test('other name', 15),
		new Test('other second name', 16)
	];
	res.render('testView', {
		data : data,
	});
};