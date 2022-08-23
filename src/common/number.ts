const NumberType = (data: String) => {
    console.log("number", data);
    var str = "";
    for (var i = 0; i < Math.floor(data.length / 3); i++) {
        console.log(Math.floor(data.length) / 3);
        console.log(data.slice(-3, 0));
        str = "," + data.slice(-(i + 1) * 3, -i * 3 - 1) + str;
    }
    str = data.slice(-(Math.floor(data.length / 3) + 1) * 3, -Math.floor(data.length / 3) * 3) + str;
    return str;
}

export default NumberType;