const moment = require('moment')
function FormatMessage(username, content){
    return {
        username: username,
        content: content,
        time: moment().format('h:mm a') 
    }
}

module.exports = FormatMessage;