const fs = require("fs");
const {argv} = require("yargs");
// parameters
var input_file = argv.file || "topic.json";
var group_file = argv.group || "group.json";
var output_file = argv.output || "topic_grouped.json";

if (fs.existsSync(input_file) && fs.existsSync(group_file)) {
	var topic_binary_data = fs.readFileSync(input_file);
	var filtered_tags = JSON.parse(topic_binary_data);

	var topic_group_binary = fs.readFileSync(group_file);
	var topics = JSON.parse(topic_group_binary);

	// create the json structure for topics
	var count_topics = {};
	var topics_key = Object.keys(topics);
	for (var i = topics_key.length - 1; i >= 0; i--) {
		count_topics[topics_key[i]] = 0;
	}

	for (key in filtered_tags) {
		for (t_key in topics) {
			var arr_of_tags = topics[t_key];
			if (arr_of_tags.includes(key)) {
				count_topics[t_key] += filtered_tags[key]
			}
		}
	}

	var string_to_write = JSON.stringify(count_topics, null, 2);
	fs.writeFile(output_file, string_to_write, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Finish writing to file: " + output_file);
		}
	});
} else {
	console.log("Exiting...");
	console.log("ERROR: File " + input_file + " and " + group_file + " do not exist!");
}