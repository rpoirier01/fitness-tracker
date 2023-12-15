import pg from 'pg';

//pool used to connect to the postGres database
const pgPool = new pg.Pool({
    user:'fitness_user',
    password:'fitness',
    host:'localhost',
    database:'exercises',
    port:5432,
})

/*****Of course, add try/catch blocks to remove errors*****/
async function getWholeTable(){
    return (await pgPool.query('SELECT * FROM EXERCISE')).rows;
}
async function getAllExerciseNames(){//make name a primary key, then check for that error
    return (await pgPool.query('SELECT ex_name FROM EXERCISE WHERE ex_name IS NOT NULL AND category IS NOT NULL')).rows;
}
//had some help from chatGPT formatting and paramaterizing my queries
async function insertNewExercise(name, cat, calPerHour){
    const query = {
        text: 'INSERT INTO exercise(ex_name, category, calories_per_hour) VALUES($1, $2, $3)',
        values: [name, cat, calPerHour]
    }
    await pgPool.query(query)
}
async function getExerciseByName(name){
    //query should be something like SELECT * FROM exercises WHERE ex_name = $1, []
    console.log(name)
    const query = {
        text: 'SELECT * FROM EXERCISE WHERE ex_name = $1',
        values: [name]
    }
    return (await pgPool.query(query)).rows;
}
async function deleteExercise(name){
    const query = {
        text: 'DELETE FROM exercise WHERE ex_name = $1',
        values: [name]
    }
    await pgPool.query(query)
}
//removed oldCat
async function updateExercise(oldName, newName, newCat, newCal){ //not too sure about needing this one
    const query = {
        text: 'UPDATE exercise SET ex_name = $1, category = $2, calories_per_hour = $3 WHERE ex_name = $4',
        values: [newName, newCat, newCal, oldName]
    }
    await pgPool.query(query);
}

export{
    getWholeTable,
    getAllExerciseNames,
    insertNewExercise,
    getExerciseByName,
    deleteExercise,
    updateExercise
}
