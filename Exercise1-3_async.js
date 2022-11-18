import fetch from "node-fetch";

// find and print all users with at least one open task

async function findUsersWithOpenTask(){
    let userSet = new Set();    // set to track users with open task

    let todos = await fetch(`https://jsonplaceholder.typicode.com/todos`)
    .then(res => res.json());

    console.log('The following users have at least one open task:');

    todos.forEach(async (todo) =>{
        if(!todo.completed){
            if(!userSet.has(todo.userId)){
                // add user to set to ensure no duplicate
                userSet.add(todo.userId);
                
                // fetch name of user
                let name = await fetch(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)
                .then(res => res.json())
                .then(res => res.name);
                
                // print name
                console.log(name);
            }
        }
    })
}

findUsersWithOpenTask();