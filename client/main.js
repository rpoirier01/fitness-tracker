// import { insertNewExercise } from "../server/database.js";
import { dates } from "./date.js";
import { getAllExercises, getCalsFromName, newExercise, deleteExercise, createExercise, delEx, updateEx } from "./exercise.js";
import { buildBarGraph} from "./graph.js";


/****Might need to change this from const to let****/
let exercises = await getExercises();
// console.log(exercises)

const subWindow = document.getElementById('customHolder');
// subWindow.style.display = 'block';

const dateSelector = document.getElementById('date');
//chatgpt, very clean way to solve this
dates.forEach(date =>{
    const optionElement = document.createElement('option');
    optionElement.value = date.month + date.day;
    optionElement.text = date.month + ' '  + date.day;
    dateSelector.appendChild(optionElement);
})
//apply CSS to all the items in the exercise selector
let exerciseInputArr = []
let timeInputArr = []
let minutesInputArr = []
for(let i=1;i<5;i++){
    const exerciseString = 'exercise' + i;
    const timeString = 'time' + i;
    const minHourString = 'minHour' + i;
    exerciseInputArr.push(document.getElementById(exerciseString));
    timeInputArr.push(document.getElementById(timeString));
    minutesInputArr.push(document.getElementById(minHourString));
}
exerciseInputArr.forEach(element=>element.classList.add('exercise-items'));
timeInputArr.forEach(element=>element.classList.add('exercise-items'));
minutesInputArr.forEach(element=>element.classList.add('exercise-items'));

buildExerciseOptions();


let week = JSON.parse(localStorage.getItem('fitness_week'));
if(week === null){
    week = [];
}
//need to get rid of final date if it is too far back
if(week.length === 8){
    week.pop()
}
sortWeek(week);
localStorage.setItem('fitness_week', JSON.stringify(week));


// console.log(week)


//week = [{Dec1: {exercise1 :cals, exercise2:cals, total:100}}]
/**********fix the first 3 lines, move this to date.js!***********/
async function buildToday(){//will be an eventListener for the Add! button

    if(week.length != 0 && Object.keys(week[0])[0] === dateSelector.value){
        return;
    }
    let today = {};
    today[dateSelector.value] = {};
    for(let i in exerciseInputArr){//may need to check for empty exercise, everything in terms of hours
        const caloriesPerHour = (await getCalsFromName(exerciseInputArr[i].value))[0]
        // console.log('calories per hour is ' + caloriesPerHour.calories_per_hour)
        if(minutesInputArr[i].value==='Hours'){
            today[dateSelector.value][exerciseInputArr[i].value] = timeInputArr[i].value*caloriesPerHour.calories_per_hour;
        }
        else{
            today[dateSelector.value][exerciseInputArr[i].value] = timeInputArr[i].value/60 * caloriesPerHour.calories_per_hour;
        }
    }
    let total = 0;
    for(let field in today[dateSelector.value]){
        total+= today[dateSelector.value][field]
    }
    today[dateSelector.value]['total'] = total;
    week.push(today);
    // console.log('today is ' + today.Dec4.total)
    // console.log('week is ' + week[0].Dec3.total)
    // console.log(week)
    localStorage.setItem('fitness_week', JSON.stringify(week))
    window.location.reload()
    // await chrome.tabs.reload()
}
// console.log(week)

function sortWeek(week){
    //this will cause an issue at new years
    const currentDate = new Date();
    week.sort((a, b)=>{
        const aDate = new Date((Object.keys(a)[0].substring(0,3)  + ' ' +  Object.keys(a)[0].substring(3,5) + ' ' + currentDate.getFullYear()))
        const bDate = new Date((Object.keys(b)[0].substring(0,3)  + ' ' +  Object.keys(b)[0].substring(3,5) + ' ' + currentDate.getFullYear()))
        if(aDate-bDate===0){
            return 0;
        }
        else if(aDate-bDate > 0){
            return 1;
        }
        else if(aDate-bDate < 0){
            return -1;
        }
    })
}
async function getExercises(){
    return await getAllExercises();
}
export async function buildExerciseOptions(){
    exercises = await getExercises();
    for(let exObj in exercises){
        for(let i in exerciseInputArr){
            const optionElement = document.createElement('option');
            optionElement.value = exercises[exObj].ex_name
            optionElement.text = exercises[exObj].ex_name
            exerciseInputArr[i].appendChild(optionElement);
        }
    }
}
export function clearAllExercises(){
    for(const i=1;i<5;i++){
        while(exerciseInputArr[i].firstChild){
            exerciseInputArr[i].removeChild(exerciseInputArr[i].firstChild)
        }
    }
}
function makeCustomWindow(){
    subWindow.style.display = 'flex';
    window.addEventListener('click', function (event) {
        if (event.target === subWindow ) {
          subWindow.style.display = 'none';
        }
    });
}

await buildBarGraph();

document.getElementById('addButton').addEventListener('click', ()=> buildToday());
document.getElementById('customButton').addEventListener('click', ()=>makeCustomWindow());
document.getElementById('add').addEventListener('click', async ()=>await createExercise());
document.getElementById('deleteButton').addEventListener('click', async()=>delEx())
document.getElementById('updateButton').addEventListener('click', async()=>updateEx())

document.getElementById('removeButton').addEventListener('click', ()=>{
    localStorage.removeItem('fitness_week');
    window.location.reload()
});
// document.getElementById('removeButton').addEventListener('click', ()=>updateExercise('baseball', 'baseball', 'sports', '3000'))

// document.getElementById('removeButton').addEventListener('click', ()=>deleteExercise('walking'))

// document.getElementById('removeButton').addEventListener('click', ()=>newExercise('walking', 'cardio', 300))
// document.getElementById('removebutton').addEventListener('click')
// document.getElementById('caloriesBurned').classList.add('exercise-items')

// document.getElementById('removeButton').addEventListener('click', ()=>buildBarGraph())
// document.getElementById('removeButton').addEventListener('click', ()=>getDatesAndTotals())

// document.getElementById('customButton').addEventListener('click', ()=>console.log("main week is " + week[0] ))