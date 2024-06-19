
export class Diary {
    date : Date;
    memo : string;

    constructor(date:number,memo:string) {
        this.date = new Date();
        if(date!=0) {
            this.date.setDate(date);
        }
        this.memo = memo;
    }

}