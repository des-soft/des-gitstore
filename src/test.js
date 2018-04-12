const Gitstore = require('./Gitstore'); 
const path = require('path')
// git_base, git_uri

let g = new Gitstore(
    // Git Base You Want To Set 
    '/www/des-soft/just-for-test', 
    // The Git URI
    'https://alice:mypassword@coding.net/abc.git', 
    // or simple one: https://coding.net/abc.git 
    true 
    // wheather log msg when cloning a repo 
); 

g.ready.then(init_ok => {
    // resolve when it inits success  
})

// just `git pull` and returns a promise 
g.pull().then(
    console.log, 
    console.log
); 

// it runs three commands as follow step by step:
// git add * 
// git commit -m ${msg}
// git push origin master 
// and then returns a promise 
g.commitPush(msg).then(
    console.log, 
    console.log
); 

