const fs = require("fs");
const {argv} = require("yargs");
// parameters
var input_file = argv.file || "tags.json";
var output_file = argv.output || "topic.json";
var limit = argv.limit || 50;

if (fs.existsSync(input_file)) {
	var binary_data = fs.readFileSync(input_file);
	var tags = {};
	var json_tags = JSON.parse(binary_data);
	for (key in json_tags) {
		if (json_tags[key] > limit) {
			tags[key] = json_tags[key];
		}
	}
	console.log("Total: " + Object.keys(tags).length);
	console.log("Total All Tags: " + Object.keys(json_tags).length);
	console.log("Limit: " + limit + " question(s)");

	var string_to_write = JSON.stringify(tags, null, 2);
	fs.writeFile(output_file, string_to_write, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Finish writing to file: " + output_file);
		}
	});
} else {
	console.log("Exiting...");
	console.log("ERROR: File " + input_file + " does not exist!");
}