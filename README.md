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
node index --tags=javascript --times=4
```
It requests to the endpoints 4 times (1 page = 30 result) so total data is 120 questions that contains `javascript` tags in it.

Don't forget to run `npm install` before running the `node` command.
It must have [`yargs`](https://github.com/yargs/yargs) and [`node-fetch`](https://github.com/node-fetch/node-fetch).

## File Outputs
I provide a configuration file `last_page.json`. The program reads from this file to get the last page of the API url it fetches from.

So, for example if you run:

```
node index --times=100
```

it produces inside the `last_page.json`:

```
{
  "last": 100
}
```

Then, the next time you run again:
```
node index --times=10
```
or
```
node index
```
It starts from the API url with `page=101` based on `last_page.json` content. Now, it also appends to existing file `raw_data.json` and `tags.json`.
You can also specify custom filename as you desire.

For example:
```
node index --times=100 --tags=javascript --tag_file=tag_filename_without_json --raw_file=raw_filename_without_json
```
Please make sure to input the filename only without the extension.

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