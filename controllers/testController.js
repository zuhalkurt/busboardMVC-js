const Test = require('../models/Test');
const fetch = require("node-fetch");
const Disruption = require("../models/Disruption");

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

exports.getAllBusDisruptions = async (req, res) => {
	const url = "https://api.tfl.gov.uk/StopPoint/Mode/bus/Disruption";

	const response = await fetch(url);
	const disruptionsResponse = await response.json();

	const disruptions = disruptionsResponse.map(
		dis => new Disruption(
			dis.commonName,
			dis.description,
			dis.fromDate,
			dis.toDate
		)
	);

	res.render('disruptionListView', {
		data: disruptions,
	});
};
