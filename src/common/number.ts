const NumberType = (data: String) => {
    var str = "";
    var count = Math.floor(data.length / 3);
    if (data.length / 3 - count == 0) {
        count--;
    }
    for (var i = 0; i < count; i++) {
        if (i == 0) {
            str = "," + data.slice(-3);
        } else {
            str = "," + data.slice(-(i + 1) * 3, -i * 3) + str;
        }
    }
    str = data.slice(-(count + 1) * 3, -count * 3) + str;
    return str;
}

export default NumberType;