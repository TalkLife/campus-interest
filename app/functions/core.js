// Format date function
exports.dateFormat = function(date){
    date = new Date(parseInt(date)*1000);
    return ("0" + date.getDate()).slice(-2) + "/" + ("0" + (parseInt(date.getMonth())+1)).slice(-2) + "/" + date.getFullYear();
}

// Format datetime function
exports.timeFormat = function(date){
    date = new Date(parseInt(date)*1000);
    return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
}

// Format datetime function
exports.datetimeFormat = function(date){
    return exports.timeFormat(date) + " " + exports.dateFormat(date);
}