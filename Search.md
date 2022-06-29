# Searching
Obfuscating the text is important, but so would be having some way of searching the material say if you had a high enough clearance. There are a few different approaches that can be taken.

First, we could persist the mapping internally including the index at which the phrases were found so we can backtrack the original censor.
This could be done using a couple of methods:
1. Store the mapping in some database table, for example each row contains the document name, index location and the phrase that was replaced (could be pretty large).
2. Store the mapping in some JSON like file either local to the service or in something like S3 (similar scheme as above but could be stored in a single file per request - could also get large).
Then, you could implement a search call which takes a set of phrases, goes through the documents, and finds documents which have those phrases.

Second, still having some persistentence in place, you could use something like ElasticSearch to index the document text and then be able to search for it later.
For example, we obfuscate the text, and then store that text in elastic search where we can then lookup the phrases which were replaced.

Regardless of method, you would implement an API that can be called with a grouping of phrases to search for (single string, array, etc.). You could also have some filters that can be provided like
exact matching, all phrases must be found, etc. The user making the call will receive back either the document text, matching documents, or something else.