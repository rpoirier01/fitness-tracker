//builds an array of date objects corresponding to the last week
const dates = buildDates()
const dateStrings = stringDates(dates)
function buildDates(){
    let arr = [];
    const today = new Date() 
    for(let i=0; i<7;i++){
        let monthDay = {}
        let dateHolder = new Date()
        dateHolder.setUTCDate(today.getUTCDate() - i)
        // monthDay.month = dateHolder.getMonth()+1
        monthDay.month = dateHolder.toLocaleString('default', {month: 'short'})
        monthDay.day = dateHolder.getDate()
        arr.push(monthDay)
    }
    return arr;
}
function stringDates(dates){
    let arr = [];
    // console.log('dates object is: ' + JSON.stringify(dates ))
    for(const dayIndex in dates){
        arr.push(dates[dayIndex].month + dates[dayIndex].day);
    }
    return arr
}

export{dates, dateStrings};