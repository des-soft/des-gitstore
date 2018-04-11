const path = require('path')

/**
 * @description 路径文件夹名前置 ('F:/a/b', '__') ==> 'F:/a/__b' 
 * @param { String } str 
 * @param { String } preset 
 * @returns { String } ('F:/a/b', '__') ==> 'F:/a/__b' 
 */
function pathPreset(str, preset){
    let p = path.parse(str); 

    p.base = preset + p.base; 
    p.name = preset + p.name; 

    return path.format(p); 
}

module.exports = pathPreset;
