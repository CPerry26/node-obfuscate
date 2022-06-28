var express = require('express');
var fileSys = require('fs');
var router = express.Router();
var bodyParser = require('body-parser');

// Tell the router to use JSON as the request body type and set up encoding.
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

// Define APIs here.
// This API is actually bound to /obfuscate but that's done at the app layer.
router.get('/', (request, response) => {
    if (request.body)
    {
        try {
            let responseText = censorText(request.body);
            response.status(200).send(responseText);    
            writeDocumentToFile(responseText);
        } catch (error) {
            response.status(400).send("ERROR: Issue censoring text: " + error.message);
        }
    }
    else
    {
        response.status(400).send("Bad Request: No request body.");
    }
});

/*
* Function which takes in a parsed body object, extracts the phrase string 
* and the document text and outputs the censored version.
*
* The function tokenizes the phrase string for words and phrases, builds a regex
* and then replaces all instances of those with the XXXX string.
*/
function censorText(jsonBody)
{
    // Extract the information from the body object.
    let phrases = jsonBody.phrases;
    let text = jsonBody.text;

    // Debug messages
    console.log("Phrases: " + phrases);
    console.log("Text: " + text);
    
    // Sanitize the phrase string.
    let sanitizedPhrases = phrases.replace(/[^a-zA-Z "']/g, "");
    console.log("Sanitized phrases: " + sanitizedPhrases);
    
    // Tokenize the phrase string to words and phrases.
    let tokenizedString = sanitizedPhrases.match(/(("|')[^"|']+("|')|[^"|'\s]+)/g);
    console.log("Tokenized string: " + tokenizedString);

    // Create the final phrase pattern.
    let phrasePattern = tokenizedString.join("|").replace(/[\\"']/g, "");
    console.log("Phrase pattern: " + phrasePattern);
    
    // Censor the document text.
    let finalPattern = new RegExp(phrasePattern, "g");
    let censoredText = text.replace(finalPattern, "XXXX");
    
    return censoredText;
}

/**
* Function to write the document to a file.
*/
function writeDocumentToFile(content)
{
    if (content)
    {
        // Ensure the output directory exists, if not create it.
        let dirName = "./documents";
        if (!fileSys.existsSync(dirName))
        {
            fileSys.mkdirSync(dirName);
        }
        
        // Construct a custom filename to avoid overwriting.
        let fileName = "document-" + Date.now() + ".txt";

        // Write the output file using a callback.
        fileSys.writeFile(fileName, content, err => {
            if (err)
            {
                console.log("ERROR: Could not create output document.");
            }
        });
    }
}

// Export the router to tell the app to use it.
module.exports = router;