const simpleGit = require('simple-git'); 

/**
 * @description 将 git_ins[cmd] 变成 Promise 版本 
 * @param { Object } git_ins simple-git 实例  
 * @param { String } cmd 方法名 
 * @returns { Function } Promise 方法 
 */
function promisify(git_ins, cmd){
    return (...args) => {
        return new Promise((res, rej) => {
            args.push((err, git_res) => {
                if (err) {
                    rej(err); 
                } else {
                    res(git_res); 
                }
            }); 
            git_ins[cmd](...args); 
        }); 
    }
}

module.exports = function(git_ins, cmds = []){
    cmds.forEach(cmd => {
        git_ins[cmd + '$'] = promisify(git_ins, cmd); 
    }); 

    return git_ins; 
}