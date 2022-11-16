import fetch from "node-fetch";

let openTaskUsers = new Set();

// if task is open (not completed) add userId to set (set will ensure no duplicates)
function noteUsers (tasks){
    tasks.forEach(task => {
        if (!task.completed){
            openTaskUsers.add(task.userId);
        }
    });
}

// print names of each user from set (order was not required so it doesn't matter this printing is async)
function printUsers (){
    console.log("Users with at least one open task:")
    openTaskUsers.forEach(user => {
        fetch(`https://jsonplaceholder.typicode.com/users/${user}`)
        .then(res => res.json())
        .then(res => console.log(res.name));
    });
}


( () => {fetch('https://jsonplaceholder.typicode.com/todos')
.then(res => res.json())
.then(res => noteUsers(res))
.then(printUsers);
})()