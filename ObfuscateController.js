var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// Tell the router to use JSON as the request body type and set up encoding.
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

// Define APIs here.
router.get('/', (request, response) => {
    if (request.body)
    {
        let responseText = censorText(request.body);
        response.status(200).send(responseText);
    }
    else
    {
        response.status(400).send("Bad Request: No request body.");
    }
});

function censorText(jsonBody)
{
    let phrases = jsonBody.phrases;
    let text = jsonBody.text;

    // Debug messages
    console.log("Phrases: " + phrases);
    console.log("Text: " + text);
    
    // Sanitize the phrase string
    let sanitizeRegex = /[^a-zA-Z "']/g;
    let sanitizedPhrases = phrases.replace(sanitizeRegex, "");
    console.log("Result: " + sanitizedPhrases);
    
    let tokenizedString = sanitizedPhrases.match(/(("|')[^"|']+("|')|[^"|'\s]+)/g);
    console.log("Array: " + array);
    let phraseRegex = tokenizedString.join("|").replace(/[\\"']/g, "");
    console.log("Phrase: " + phraseRegex);
    let finalPattern = new RegExp(phraseRegex, "g");
    let censoredText = text.replace(finalPattern, "XXXX");
    
    return censoredText;
}

// Export the router to tell the app to use it.
module.exports = router;