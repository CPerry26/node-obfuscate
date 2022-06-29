const controller = require('../src/ObfuscateController');

// Test very basic call.
test("Returns expected clean string", () => {
    expect(controller.censorText({"phrases": "text", "text": "this is sample text"})).toBe("this is sample XXXX");
});

// Test very basic call where phrase isn't found.
test("Returns expected input string", () => {
    expect(controller.censorText({"phrases": "text", "text": "this is a sample."})).toBe("this is a sample.");
});

// Test expected error from malformed input.
test("Throws exception from incorrect input", () => {
    let threwError;

    try 
    {
        controller.censorText({"text": "this is sample text"});
        threwError = false;
    }
    catch (error)
    {
        threwError = true;
    }

    expect(threwError).toBe(true);
});

// Test expected error from malformed input.
test("Throws exception from incorrect input", () => {
    let threwError;

    try 
    {
        controller.censorText({"phrases": ["test"], "text": "this is sample text"});
        threwError = false;
    }
    catch (error)
    {
        threwError = true;
    }

    expect(threwError).toBe(true);
});

// Test call where phrase has single quotes.
test("Returns expected output string from single quotes", () => {
    expect(controller.censorText({"phrases": "'sample text'", "text": "this is a sample text."})).toBe("this is a XXXX.");
});

// Test call where phrase has escaped double quotes.
test("Returns expected output string from escaped double quotes", () => {
    expect(controller.censorText({"phrases": "\"sample text\"", "text": "this is a sample text."})).toBe("this is a XXXX.");
});

// Test call where phrase has commas.
test("Returns expected output string from phrases with commas", () => {
    expect(controller.censorText({"phrases": "text,sample", "text": "this is a sample text."})).toBe("this is a XXXX XXXX.");
});

// Test call where phrase is complex.
test("Returns expected output string with complex input", () => {
    expect(controller.censorText({"phrases": "test text \"Boston Red Sox\",'Cheese pizza',beer", "text": "Hello World! I am a major Boston Red Sox fan. I also love Cheese pizza and beer."})).toBe("Hello World! I am a major XXXX fan. I also love XXXX and XXXX.");
});



