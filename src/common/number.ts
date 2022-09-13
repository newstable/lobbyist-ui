const NumberType = (num: string) => {
    var decimal = "0." + num.split(".")[1];
    if (!num.split(".")[1])
        decimal = "";
    var decimalstr = decimal.toString().slice(1, decimal.toString().length);
    const data = (Number(num) - Number(decimal)).toString();
    var str = "";
    var count = Math.floor(data.length / 3);
    if (data.length / 3 - count == 0) {
        count--;
    }
    if (count == 0) {
        str = data.slice(-3) + decimalstr;
        return str;
    }
    // if(count ==0)
    for (var i = 0; i < count; i++) {
        if (i == 0) {
            str = "," + data.slice(-3);
        } else {
            str = "," + data.slice(-(i + 1) * 3, -i * 3) + str;
        }
    }
    str = data.slice(-(count + 1) * 3, -count * 3) + str + decimalstr;
    return str;
}

export default NumberType;