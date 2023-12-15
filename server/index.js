import { getAllExerciseNames, getExerciseByName, insertNewExercise, deleteExercise, updateExercise} from './database.js';

import express from 'express';
import logger from 'morgan';
//other necessary imports will go here


//create the express app
const app = express();
const port = process.env.port || 3000; //environmental var or 3000

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/', express.static('client'));

//could two types, gymExercises and standard exercises, only if time
app.get('/allExerciseNames', async(request, response)=>{
    try{
        response.status(200);
        response.json(await getAllExerciseNames());
    }
    catch(err){
        response.status(400);
    }
})
app.post('/saveExercise', async(request, response)=>{
    try{
        response.status(200);
        const exercise = request.body;
        await insertNewExercise(exercise.name, exercise.cat, exercise.calPerHour);
        response.json({added:true})
    }
    catch(error){
        response.status(400);
        response.json({added:false})
    }
})
app.get('/fullExercise', async(request, response)=>{
    try{
        const exercise = request.query;
        response.status(200);
        response.json(await getExerciseByName(exercise.name));
    } 
    catch(error){
        response.status(400);
    }
})
app.delete('/deleteExercise', async(request, response)=>{
    try{
        response.status(200);
        const ex = request.query;
        // response.json(await deleteExercise(ex.name));
        await deleteExercise(ex.name);
        response.json({deleted:true});

        // return await response.json
    }
    catch(error){
        response.status(400);
        response.json({deleted:false});
        
    }
})
//update
app.put('/updateExercise', async (request, response)=>{
    try{
        response.status(200)
        const exercise = request.query;
        await updateExercise(exercise.oldName, exercise.newName, exercise.newCat, exercise.newCals);
        response.json({[exercise.newName]:'success'});
    }
    catch(error){
        response.status(400)
    }
})


// console.log(await getWholeTable())
// await insertNewExercise('running', 'cardio', 100)
// console.log(await getAllExerciseNames())
// console.log(await getExerciseByName('running')) //injection prevented!
// await deleteExercise('running', 'cardio')
// await updateExercise('soccer', 'sports', 'soccer', 'sports', 1000)
// console.log(await getExerciseByName('soccer'))

app.listen(port, ()=>{
    // const msg = `Server started on http://localhost:${port}`
    console.log(` Server started on http://localhost:${port}`)
})

