const fs = require('fs')

module.exports = dir => {
    try {
        fs.mkdirSync(dir)
    } catch (err) {}
}
