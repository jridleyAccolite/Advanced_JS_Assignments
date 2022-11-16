import fetch from "node-fetch";

let postsMap = new Map();   // map tracking postId: number of comments on post
let user = 2;   // userId to test
let max = 0;

// take user id and find all posts made by them
fetch('https://jsonplaceholder.typicode.com/posts')
.then(res => res.json())
.then(res => getPosts(user, res))
.then(countComments);

function getPosts(userId, posts){
    posts.forEach(post => {
        if(post.userId == userId){
            postsMap.set(post.id, 0);
        }
    });
}

function countComments() {
    fetch('https://jsonplaceholder.typicode.com/comments')
    .then(res => res.json())
    .then(tallyComment)
    .then(printPosts);
}

function tallyComment(comments){
    comments.forEach(comment => {
        if(postsMap.has(comment.postId)){
            postsMap.set(comment.postId, (postsMap.get(comment.postId) + 1));
        }
    });
}

function printPosts() {
    postsMap.forEach((value,key) => {
        if(value > max){max = value;}
    })
    console.log(`Maximum number of comments on a post by user ${user} is: ${max} comments.
    comments with maximum number of comments are:`);

    postsMap.forEach((value,key) => {
        console.log(`post number: ${key}`)
    })
}