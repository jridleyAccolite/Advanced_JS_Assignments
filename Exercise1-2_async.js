import fetch from "node-fetch";

/* find and print user with most posts */

// go through all posts
// tally in map
// get max
// print max

async function getUserWithMostPosts(){
    let userMap = new Map();    // map holding userId: post count

    let posts = await fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json());

    posts.forEach(post =>{
        if(userMap.has(post.userId)){
            // incr map
            userMap.set(post.userId, (userMap.get(post.userId) + 1));
        }
        else{
            // add to map
            userMap.set(post.userId, 1);
        }
    });

    let max = 0;    // max number of posts per user

    userMap.forEach((value,key) => {
        if (value > max){ max = value; }
    });

    console.log(`The maximum posts by a single user is ${max} post(s).
    The following users have ${max} post(s):`);

    userMap.forEach(async (value,key) =>{
        if (value == max){
            let name = await fetch(`https://jsonplaceholder.typicode.com/users/${key}`)
            .then(res => res.json())
            .then(res => res.name);
            console.log(`${name}`);
        }
    });
}

getUserWithMostPosts();
