const Test = require('../models/Test');
const fetch = require("node-fetch");
const Disruption = require("../models/Disruption");
const Arrival = require("../models/Arrivals");

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




exports.getArrivals = async (req, res) => {

	let postcode = "W5 1TR";
	let radius = 1000;

	const postcodeInfo = await fetch(
		`https://api.postcodes.io/postcodes/${postcode}`
	  );
	const postcodeResult = await postcodeInfo.json();
	  
	const longitude = postcodeResult.result.longitude;
	const latitude = postcodeResult.result.latitude;

	const urlBusStops = `https://api.tfl.gov.uk/StopPoint/?lat=${latitude}&lon=${longitude}&stopTypes=NaptanPublicBusCoachTram&radius=${radius}`
	const responseBS = await fetch(urlBusStops);
	console.log(urlBusStops + "bus stops url");
	const BusStopsResponse = await responseBS.json();
	console.log(BusStopsResponse.stopPoints[1].naptanId + "Line 66")
	const nearestTwoBusStops = BusStopsResponse.stopPoints.slice(0, 2);	
	
	
	// const busStops = BusStopsResponse.stopPoints.map(
	// 	busStop => new BusStop(
	// 		busStop.naptanId,

	// 	)
	// );

	
	const urlArrivals = `https://api.tfl.gov.uk/StopPoint/${nearestTwoBusStops[1].naptanId}/Arrivals?app_key=f917a2c79ce74c30a426763cba9490f6`;
	
	const response = await fetch(urlArrivals);
	console.log(urlArrivals);
	const arrivalsResponse = await response.json();
	console.log(arrivalsResponse);
	

	
	const Bus = arrivalsResponse.map(
		bus => new Arrival(
			bus.destinationName,
			bus.towards,
			bus.timeToStation,
			
		)
	);

	res.render('Arrivals', {
		data: Bus,
	});
};






