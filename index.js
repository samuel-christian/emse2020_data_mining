// libraries
const fs = require("fs");
const api_fetch = require("node-fetch");
const {argv} = require("yargs");
const path = require("path");
// parameters
var times = parseInt(argv.times) || 1;
var user_input_tag = argv.tags || "progressive-web-apps";
var start_page = argv.start_from || 1;
var output_file = argv.output || "raw_data.json"

var settings = { method: "GET" };
var questions = [];
var key = argv.key || ""

var base_url = "";
if (key == "") {
	// no authentication key
	// max quota: 300 requests per 24 hours
	base_url = "https://api.stackexchange.com/2.2/questions?tagged="+user_input_tag+"&site=stackoverflow&page=";
} else {
	base_url = "https://api.stackexchange.com/2.2/questions?key="+key+"&tagged="+user_input_tag+"&site=stackoverflow&page=";
}
// for debugging uncomment this line
// console.log(base_url);
fetch_all_questions();

async function fetch_all_questions() {
	var has_more = true;
	var url = base_url + start_page;
	do {
		try {
			console.log("Fetching from " + url);
			var response = await api_fetch(url, settings);
			var data = await response.json();
			has_more = data.has_more;
			questions.push(data.items);
			questions = questions.flat();
			start_page++;
			url = base_url + start_page;
			if (!has_more) {
				console.log("============================================");
				console.log("Total questions fetched: " + questions.length);
				write_to_file(output_file, questions);
			}
		} catch(err) {
			console.log("ERROR: " + err);
		}
	} while(has_more);
}

function write_to_file(filename, data) {
	var stringified_data;
	var to_do = "writing"
	if (fs.existsSync(filename)) {
		to_do = "appending";
		var binary_raw_data = fs.readFileSync(filename);
		existing_raw_data = JSON.parse(binary_raw_data);
		var combined_raw_data = existing_raw_data.concat(data);
		stringified_data = JSON.stringify(combined_raw_data, null, 2);
	} else {
		stringified_data = JSON.stringify(data, null, 2);
	}
	fs.writeFile(filename, stringified_data, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Finish " + to_do + " to file: " + filename);
		}
	});
}