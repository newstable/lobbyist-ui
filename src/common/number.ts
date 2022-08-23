const NumberType = (data: String) => {
    console.log("number", data);
    var str = "";
    for (var i = 0; i < Math.floor(data.length / 3); i++) {
        console.log(data.slice(-(i + 1) * 3, -i * 3));
        str = "," + data.slice(-(i + 1) * 3, -i * 3) + str;
    }
    str = data.slice(-(Math.floor(data.length / 3) + 1) * 3, -Math.floor(data.length / 3) * 3) + str;
    return str;
}

export default NumberType;