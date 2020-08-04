# Stackoverflow Questions Miner

I make it as a script in NodeJS.
You can just run the script and it will produces two json files. `raw_data.json` file contains all data from the Stackoverflow API.
`tags.json` file contains a list of tags and how many times a particular tag appear in a question that is posted on [stackoverflow.com](https://stackoverflow.com).

## Query
The script particularly just requests all questions posted on [stackoverflow.com](https://stackoverflow.com)
containing the tags defined in the command line parameters. Requests are sent to [Stackoverflow API](https://api.stackexchange.com).

You can see the full API documentation [here](https://api.stackexchange.com/docs).

To be more specific, I use [this API endpoint](https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&tagged=some_tags&site=stackoverflow)
to get all questions containing `some_tag`.

For example:
You want to get all questions about JavaScript that are posted on Stackoverflow. The tag should be `javascript` or `js` or anything related to that.

The query would be:

https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&tagged=javascript&site=stackoverflow

Then you do this several times using by navigating through the page. You can add `page=2` or `page=3` to the above link and it will
give you the next page result.

## How It Works
My script bypasses all above process. You just enter which `tags` you want, enter how many times and it outputs two files. One is raw data
and another contains how many time a tag appear.

You can use the script, for example:
```
node index --tags=javascript --key=KEY
```
You can specify a key so you have more quota for like 10.000 requests/day. Without key, you only have quota 300 requests/day.
Be careful the script will not stop fetching the data until there are no more pages in the returned response from the API.
So, there is a possibility the script stops in between the process, only fetches 2-3 pages (because it maybe suspected as an attempt of throttling).
When this happens, you restart the script again by entering `start_from` parameter start from the last page fetched.

For example:
```
Fetching from https://api.stackexchange.com/2.2/questions?tagged=javascripts&site=stackoverflow&page=20

Fetching from https://api.stackexchange.com/2.2/questions?tagged=javascripts&site=stackoverflow&page=21

Fetching from https://api.stackexchange.com/2.2/questions?tagged=javascripts&site=stackoverflow&page=22
```

Then it stops. You need to manually restart the script again by running:

```
node index --tags=YOUR_TAG --key=KEY --start_from=23
```

Without the `start_from` parameter otherwise, the script will start fetching again from `page=1`.

## Dependencies
Don't forget to run `npm install` before running the script.
- [`yargs`](https://github.com/yargs/yargs)
- [`node-fetch`](https://github.com/node-fetch/node-fetch)

## Further Data Extraction
```node extract_data --limit=50 --file=YOUR_FILE_IN_JSON --output=YOUR_FILE_IN_JSON```

Extract only the tags that mentioned in at least 50 questions. Default input file is `tags.json` and output file is `topic.json`

```node extract_data2 --file=YOUR_FILE_IN_JSON --group=YOUR_FILE_IN_JSON```

Group the extracted tags based on defined `group.json` file. Default input file is `topic.json` and output file is `topic_grouped.json`

You can define your own `group.json` file based on the extracted `topic.json`.

For example:
```
topic.json
{
  "progressive-web-apps": 3643,
  "service-worker": 1007,
  "web-applications": 104,
  "javascript": 943,
  "google-chrome": 309,
  "android": 348
}
```

```
group.json
{
	"a": ["progressive-web-apps", "service-worker"],
	"b": ["javascript", "google-chrome"],
	"c": ["web-applications", "android"]
}

```

This will group the `topic.json` into `a`, `b`, and `c` group, then sum up the counting. For example, `a` value is 4650 (because 3643 + 1007).

## License
Obviously it's MIT. I'll just copy-paste the LICENSE here.

MIT License

Copyright (c) 2018 2D, Inc

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.