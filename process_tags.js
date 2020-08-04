const fs = require("fs");
const {argv} = require("yargs");
// parameters
var input_file = argv.file || "raw_data.json";
var output_file = argv.output || "tags.json";
var questions = [];
var tags = {};

if (fs.existsSync(input_file)) {
	var binary_data = fs.readFileSync(input_file);
	var all_arr_tags = [];
	questions = JSON.parse(binary_data);
	for (var i = questions.length - 1; i >= 0; i--) {
		var arr_tag = questions[i].tags;
		all_arr_tags.push(arr_tag);
		for (var j = arr_tag.length - 1; j >= 0; j--) {
			if (tags[arr_tag[j]] == undefined) {
				tags[arr_tag[j]] = 1;
			} else {
				tags[arr_tag[j]]++;
			}
		}
	}
	write_to_file(output_file, tags);
	// to make sure counting of tags is correct
	// write_to_file("all_tags.json", all_arr_tags); // => this writes to file all extracted tags array from raw_data.json
} else {
	console.log("Exiting...");
	console.log("ERROR: File " + input_file + " does not exist!");
}

function write_to_file(filename, data) {
	var stringified_data = JSON.stringify(data, null, 2);
	fs.writeFile(filename, stringified_data, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Finish writing to file: " + filename);
		}
	});
}