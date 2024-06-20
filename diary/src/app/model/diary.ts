
export class Diary {
    date : string;
    toilet : number[];
    bodyTemp : number;
    memo : string;

    constructor(date:string,memo:string) {
        this.date = date;
        this.memo = memo;
        this.toilet = [0,0];
        this.bodyTemp = 0;
    }

}