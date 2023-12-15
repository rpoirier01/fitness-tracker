import { buildExerciseOptions,clearAllExercises } from "./main.js";

async function getAllExercises(){
    try{
        const response = await fetch(`/allExerciseNames`, {
            method:'get',
            headers: { //not totally sure if we need it
              'Content-Type': 'application/json',
            }
        })
        return response.json();
    }catch(error){
        console.log(error);
        return -1;
    }
}
async function getCalsFromName(ex_name){
    try{
        // console.log(ex_name)
        const response = await fetch(`/fullExercise?name=${ex_name}`, {
            method:'get',
            headers: { //not totally sure if we need it
              'Content-Type': 'application/json',
            },
        })
        return await response.json();
        // console.log(await response.json);
    }catch(error){
        console.log(error);
        return -1;
    }
}

async function newExercise(ex_name, cat, calories){
    try{
        // console.log(ex_name + cat + calories)
        const response = await fetch(`/saveExercise`, {
            method: 'POST',
            headers:{ //maybe remove this
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:ex_name, cat:cat, calPerHour:calories})
        })
        const data = await response.json()
        return data;
        // console.log(response.status)
        // return response.status;
    }
    catch(err){
        console.log(err)
    }
}


async function deleteExercise(ex_name){
    try{
        const response = await fetch(`/deleteExercise?name=${ex_name}`,{
            method: 'DELETE'
        });
        // return response.status;
        return await response.json();
    }
    catch(err){
        console.log(err)
    }
}

async function updateExercise(oldName, newName, newCat, newCals){
    try{ //right now this doesn't actually return anything
        const response = await fetch(`/updateExercise?oldName=${oldName}&newName=${newName}&newCat=${newCat}&newCals=${newCals}`,{
            method:'PUT',
        });
        return response.status;

        

    }
    catch(err){
        console.log(err)
    }
}

export async function createExercise(){
    const name = document.getElementById('addNameInput').value.toLowerCase();
    const cat = document.getElementById('addCatInput').value;
    const cals = document.getElementById('addCalsInput').value;
    const json = await newExercise(name, cat, cals);

    if(json.added){
        window.alert('Successfully added exercise!\nPlease Reload the tab to see it')
    }
    else{
        window.alert('An error has occurred!\nMake sure you are using a unique name!\n(names are not case sensitive)')
    }
    // clearAllExercises()
    // await buildExerciseOptions();
}
export async function delEx(){
    // console.log(document.getElementById('deleteNameInput').value)
    const name = document.getElementById('deleteNameInput').value
    const json = await deleteExercise(name);
    if(json.deleted){
        window.alert('Exercise Deleted!\nPlease reload')
    }
    else{
        window.alert('An error has occurred!')

    }
    // const status = await deleteExercise(name);
    // console.log(status)
    // if(status===200){
    // }
    // else{
    //     window.alert('An error has occurred\nMake sure you are using the correct name')
    // }

    // clearAllExercises()
    // buildExerciseOptions()
}

export async function updateEx(){
    const oldName = document.getElementById('oldNameInput').value
    const newName = document.getElementById('newNameInput').value
    const newCat = document.getElementById('newCatInput').value
    const newCals = document.getElementById('newCalsInput').value

    const status = await updateExercise(oldName, newName, newCat, newCals).status;
    if(status===200){
        window.alert('Exercise updated!\nPlease reload!')
    }
    else{
        window.alert('An error occurred,\nMake sure you are using the correct name of an exercise that exists')
    }
    // clearAllExercises()
    // buildExerciseOptions()
}

export{
    getAllExercises,
    getCalsFromName,
    newExercise,
    deleteExercise,
    updateExercise,
}