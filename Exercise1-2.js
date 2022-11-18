import fetch from "node-fetch";

/* find and print user with most posts */

let postsMap = new Map();   // map with userId: number of posts
let max = 0;    // max number of posts

fetch('https://jsonplaceholder.typicode.com/posts')
.then(res => res.json())
.then(res => tallyPosts(res))
.then(getMax)
.then(printMax);

function tallyPosts(posts){
    posts.forEach(post => {
        if(postsMap.has(post.userId)){
            postsMap.set(post.userId, (postsMap.get(post.userId) + 1));
        }
        else{
            postsMap.set(post.userId, 1);
        }
    });
}

function getMax(){
    postsMap.forEach((value, key) => {
        if (value > max){ max = value; }
    });
}

function printMax(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(res => printMaxUsers(res));
}

function printMaxUsers(users){
    console.log(`The maximum number of posts for a single user is: ${max} posts.
    The following user(s) have made ${max} posts:`);

    users.forEach(user => {
        if (postsMap.has(user.id)){
            if (postsMap.get(user.id) == max){
                console.log(user.name);
            }
        }
    });
}

