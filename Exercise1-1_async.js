import fetch from "node-fetch";

// Fetch Most followed(Comments) post for a user

// 1. for all posts find all that match userId
// 2. for all comments count how many match one of the postIds
// 3. find max comment count
// 4. print all posts with the max comment count

let user = 2;   // id of user to find for

async function findMostCommentedPost() {
    let postsMap = new Map();   // map to hold postId: comment count

    // initialises map
    let posts = await fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json());

    posts.forEach(post => {
        // if post by specified user, add to map
        if(post.userId == user){
            postsMap.set(post.id, 0);
        }
    });

    let comments = await fetch('https://jsonplaceholder.typicode.com/comments')
    .then(res => res.json());

    comments.forEach(comment =>{
        if(postsMap.has(comment.postId)){
            postsMap.set(comment.postId, postsMap.get(comment.postId) + 1);
        }
    });

    let max = 0;    // max number of comments
    postsMap.forEach((value,key) => {
        if (value > max){ max = value; }
    });

    console.log(`The most comments on one of user ${user}'s posts is ${max} comment(s).
    The following posts by user ${user} have ${max} comment(s):`);

    postsMap.forEach((value,key) => {
        if(value == max){
            console.log(`post number ${key}`);
        }
    });
}

findMostCommentedPost();