const { EventEmitter } = require('events'); 
const fs = require('then-fs'); 
const simpleGit = require('simple-git'); 

module.exports = class Gitstore extends EventEmitter {
    constructor(git_base, git_uri){
        super(); 
      
        this.git_base = git_base; 
        this.git_uri  = git_uri; 
        this.git      = simpleGit(this.git_base); 
        this.ready    = this.init(); 
    }

    async init(){
        let isExists = await fs.exists(this.git_base)
        
        if (isExists){
            // 存在 
            
        } else {
            return this.clone(); 
        }
    }

    async clone(){

    }
}