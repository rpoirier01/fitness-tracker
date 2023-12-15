// import Chart from 'chart.js'
// import Chart from 'chart.js'
// import { dateStrings } from "./date.js";

function getDatesAndTotals(){
    const week = JSON.parse(localStorage.getItem('fitness_week'));
    let chartData = [];
    chartData.push({date:'.', total:0})

    for(const dayIndex in week){ //day:{Nov5 {... total:X}}
        const day = Object.keys(week[dayIndex]);
        let data = {}
        data.date = day;
        data.total = week[dayIndex][day].total;
        if(data.total != undefined){
            chartData.push(data);
        }
    }
    // chartData.push({date:'placeholder', total:0})
    return chartData;
}
async function buildBarGraph(){
    const data = getDatesAndTotals();
    // console.log(data)
    new Chart(
        document.getElementById('caloriesBurned'),{
            type:'bar',
            data:{
                labels: data.map(row=>row.date),
                datasets:[
                    {
                        label:'Daily Calories Burned',
                        data: data.map(row=>row.total), //chatgpt 
                        backgroundColor: 'rgb(99, 100, 255)', // Single color from a theme
                    }
                ]
            },    
            options: {
                scales: {
                    y: {
                        min: 50,
                        // max: 100
                    }
                }
            }
            // options:{
            //     scales:{
            //         yAxis:{
            //             ticks:{
            //                 min:0,
                            
            //             }
            //         }
            //     }
            // }
        }
    );
}
export{buildBarGraph}