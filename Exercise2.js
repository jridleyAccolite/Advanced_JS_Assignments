// Fetch and return Posts & ToDos for a Single User.

import fetch from "node-fetch";

let user = 2;   // id of user to search for

let postsPromise = fetch('https://jsonplaceholder.typicode.com/posts')
.then(res => res.json());

let todosPromise = fetch('https://jsonplaceholder.typicode.com/todos')
.then(res => res.json());

Promise.all([postsPromise, todosPromise])
.then(res => splitResults(res))

function splitResults(posts_and_todos){
    printAll("posts", posts_and_todos[0]);
    printAll("todos", posts_and_todos[1]);
}

function printAll(name, items) {
    console.log(`All ${name} for user ${user}:`);
    items.forEach(item =>{
        if(item.userId == user){
            console.log(item);
        }
    });
}