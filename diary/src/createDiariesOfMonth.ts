import * as fs from "fs";

var json = [
    {
        date : "2024-7-1",
        toilet: [0,0],
        bodyTemp: 0.0,
        memo: ""
    }
];

function toDateStr(date:Date) {
    // Date() => xxxx-xx-xx
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  }

function createDiaryOfMonth(year:number) {
    const dates : any[] = [];
    const date : Date = new Date(year, 0, 1);
    while(date.getFullYear() === year) {
        dates.push(
            {
                date    : toDateStr(date),
                toilet  : [0,0],
                bodyTemp: 0.0,
                memo    : ""
            }
        );
        date.setDate(date.getDate()+1);
    }
    return dates;
}

// 1 year / userId
const year = 2024;
const userId = "sakaguchi";
const filePath = `assets/${userId}/diaries.json`;
const dates = createDiaryOfMonth(year);
fs.writeFile(filePath, JSON.stringify(dates, null, 4), "utf-8", (err) => {
    if(err) {
        console.error(`error: ${err}`);
    }
    else {
        console.log(`file is created for ${filePath}`);
    }
});