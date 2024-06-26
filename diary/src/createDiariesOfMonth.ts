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

function createDiaryOfMonth(year:number, month:number) {
    const dates : any[] = [];
    const date : Date = new Date(year, month, 1);
    while(date.getMonth() === month) {
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
console.log(`start to create`);

for(let month:number=0;month<12;month++) {
    console.log(`${month+1} month`);
    var dates = createDiaryOfMonth(year, month);
    var filePath = `assets/${userId}/diaries-${month+1}.json`;
    fs.writeFile(filePath, JSON.stringify(dates, null, 4), "utf-8", (err) => {
        if(err) {
            console.error(`error: ${err}`);
        }
        else {
            console.log(`file is created for ${filePath}`);
        }
    });
}
