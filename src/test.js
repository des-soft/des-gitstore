const Gitstore = require('./Gitstore'); 
const path = require('path')
// git_base, git_uri

let d = new Gitstore(
    'F:/www/des-soft/just-for-test',
    'https://git.coding.net/eczn/test.git'
); 

d.pull().then(
    console.log, 
    console.log
)
