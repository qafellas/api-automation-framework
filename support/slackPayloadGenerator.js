import fs from 'fs'

let slackPayload = function () {
    let results
    try {
        results = JSON.parse(fs.readFileSync('./test-results.json').toString());
    } catch (err) {
        throw new Error(err.message)

    }

    //console.log(results)
    
    let attachment = {}
    let endpoint = process.env.ENDPOINT || 'https://thinking-tester-contact-list.herokuapp.com';
    let githubRunId = process.env.GITHUB_RUN_ID;
    let testRunHtml = process.env.TEST_RUN_HTML;
    let messageText = `*Title:* \`Api Tests\`\n\n*Env:* ${endpoint}\n\n:github: Github Run: https://github.com/qafellas/api-automation-framework/actions/runs/${githubRunId}\n\n:graph: Test Run HTML: ${testRunHtml}\n\n*Total Test Cases:* ${results.stats.passes+results.stats.pending+results.stats.failures}\n\n:white_check_mark: Passed: ${results.stats.passes} | :x: Failed: ${results.stats.failures} | ⏩ Skipped: ${results.stats.pending}\n\n`

    if(results.stats.failures>0){
        attachment = {
            color: '#dc3545',
            text: `${messageText}:alert: Test execution *FAILED*. Check the failures`,
            ts: Date.now().toString(),
        }
    }
    else if(results.stats.failures == 0 && results.stats.pending == 0 && results.stats.passes == 0){
        attachment = {
            color: '#808080',
            elements:[],
            text: `${messageText}:mag: Something went wrong with test execution!!!`,
            ts: Date.now().toString(),
        }
    }
    else if(results.stats.failures == 0){
        attachment = {
            color: '#008000',
            elements:[],
            text: `${messageText}:party-blob: Test execution *SUCCEEDED*`,
            ts: Date.now().toString(),
          }
    }
    const body = {

        attachments: [
            attachment
          ],

    };

    return body;
};

const jsonString = JSON.stringify(slackPayload())
fs.writeFile('jsonReporter.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})