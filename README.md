# Node Obfuscation Webapp
A simple node webapp which supports obfuscating text in a given document.

## How to Run
The following steps assume node is installed locally.
1. Clone the repository.
2. Navigate to the source directory.
3. Run `node server.js`.
4. Using something like Postman, send a JSON POST request to localhost:3000/obfuscate like the following:
`
{
    "phrases": "'Sample phrases' or \"words to\" clean",
    "text": "Document text to clean phrases from."
}
`
5. Returned will be the cleaned document text, and a file will be written locally to the documents directory.

## Notes
- To send a phrase with double quotes, you must escape them in the phrase string.
- You can send strings which have terms separated by both spaces and commas.