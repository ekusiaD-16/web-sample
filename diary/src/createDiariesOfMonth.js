"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var json = [
    {
        date: "2024-7-1",
        toilet: [0, 0],
        bodyTemp: 0.0,
        memo: ""
    }
];
function toDateStr(date) {
    // Date() => xxxx-xx-xx
    return "".concat(date.getFullYear(), "-").concat(date.getMonth() + 1, "-").concat(date.getDate());
}
function createDiaryOfMonth(year, month) {
    var dates = [];
    var date = new Date(year, month, 1);
    while (date.getMonth() === month) {
        dates.push({
            date: toDateStr(date),
            toilet: [0, 0],
            bodyTemp: 0.0,
            memo: ""
        });
        date.setDate(date.getDate() + 1);
    }
    return dates;
}
// 1 year / userId
var year = 2024;
var userId = "sakaguchi";
console.log("start to create");
for (var month = 0; month < 12; month++) {
    console.log("".concat(month + 1, " month"));
    var dates = createDiaryOfMonth(year, month);
    var filePath = "assets/".concat(userId, "/diaries-").concat(month + 1, ".json");
    fs.writeFile(filePath, JSON.stringify(dates, null, 4), "utf-8", function (err) {
        if (err) {
            console.error("error: ".concat(err));
        }
        else {
            console.log("file is created for ".concat(filePath));
        }
    });
}
