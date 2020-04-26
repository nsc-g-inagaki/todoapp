const isEquals = (expected, value) => {

    if(typeof expected == "string") {
        expected = expected.toLowerCase();
    }

    if(typeof value == "string"){
        value = value.toLowerCase();
    }

    return JSON.stringify(expected) == JSON.stringify(value);
};