const { EventEmitter } = require('events')
    , fs = require('then-fs')
    , simpleGit = require('simple-git')
    , simpleGitPromisify = require('./simple-git-promisify')
    , rimraf = require('rimraf-then')
    , mkdir = require('./utils/mkdir')
    , pathPreset = require('./utils/pathPreset')

// 依赖 

module.exports = class Gitstore extends EventEmitter {
    /**
     * @description 构造函数
     * @param { String } git_base git 文件夹
     * @param { String } git_uri git uri 
     */
    constructor(git_base, git_uri, log) {
        super(); 
        // git_uri: 
        // https://${user}:${pwd}@${git_path}

        // 目标文件夹前置一个 __DES_STORE__ 用于标识 
        git_base = pathPreset(git_base, '__DES_STORE__'); 

        this.git_base = git_base; 
        this.git_uri  = git_uri; 
        mkdir(this.git_base); 

        this.log = log; 
        
        // simple-git 实例 
        this.git = simpleGit(this.git_base);
        // 对实例进行 Promisify 
        simpleGitPromisify(
            this.git, 
            [
                'checkIsRepo', 'raw', 'pull', 
                'commit', 'push', 'add'
            ]
        ); 
        this.ready = this.init(); 
    }

    /**
     * @description just origin pull 
     * @returns { Promise<PullSummary> }
     */
    async pull(){
        await this.ready; 

        return this.git.pull$(
            'origin',
            'master'
        ); 
    }

    /**
     * @description just commit & push to origin master 
     * @param { String } msg 
     * @returns { Promise }
     */
    async commitPush(msg = 'No Msg'){
        // git add *
        await this.git.add$(['*'])
        // git commit -m ${msg}
        await this.git.commit$(msg); 

        // git push origin master 
        return this.git.push$(
            'origin', 'master'
        ); 
    }

    /**
     * @description init 初始化仓库 
     * @returns { Promise } 
     */
    async init() {
        if (this.ready) return this.ready; 

        let isRepo = await this.git.checkIsRepo$(); 

        if (isRepo) {
            // 因为 this.cloneRepo() 本身蕴含的值就是 null 
            // 为保证一致性，此处也是 null 
            return Promise.resolve(null); 
        } else {
            return this.cloneRepo(); 
        }
    }

    /**
     * @description git clone ${git_uri} ${git_base} 
     * @returns { Promise }
     */
    cloneRepo() {
        if (this.log) this.git.outputHandler((cmd, stdout, stderr) => {
            console.log('!!!', cmd); 
            stdout.pipe(process.stdout);
            stderr.pipe(process.stderr);
        }); 

        return this.git.raw$([
            `clone`,
            `--progress`, 
            this.git_uri,
            this.git_base 
        ]); 
    }
}