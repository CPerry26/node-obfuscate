# Requirements
1. The application must be a webapp that supports receiving a request with phrases and document text.
2. The application must respond to requests by returning the resulting obfuscated document text.
3. The phrases will be sent as a singular string.
4. The phrases can be separated by either spaces or commas.
5. The phrase string may also contain individual phrases wrapped in single or double quotes.
6. Obfuscated words must be replaced with the "XXXX" string.

# Assumptions
1. The request will be sent as JSON with a phrases and text key-value pairs.
2. The user does not need to uncensor a file.
3. Storing the obfuscated document text is sufficient.
4. Phrases in quotes must be kept together, replacing the entire phrase if found with the censor string.
5. The phrases are cases sensitive.

# Limitations
1. JSON is extensible, but realistically if a user had a very large document, they'd prefer to upload and not construct a giant JSON of document text.
2. Cannot uncensor a document (would need to store some sort of mapping).
3. There is no way to retrieve a persisted file (this can be enhanced by returning a JSON with the obfuscated text and the filename, then adding a GET which can get the file contents or something similar).
4. Regular expressions are extremely powerful, but there's risk of not catching every case. Preferably would want to use a stronger tokenization approach.