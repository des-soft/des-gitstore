const Gitstore = require('./Gitstore'); 
const path = require('path')
// git_base, git_uri

let d = new Gitstore(
    '/Users/eczn/Desktop/code/des-soft/md.daily',
    'https://github.com/des-soft/md.daily.git'
); 

d.checkIsRepo(); 
