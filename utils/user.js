const users = [];

//join user to chat
function userJoin(id, username, room){
    const user = {id, username, room};
    users.push(user);

    return user
}

// Get Current user
function getCurrentUser(id){
    return users.find(user => user.id === id)
}
function userLeave(id){
    const index = users.findIndex(user => user.id === id);
    if(index !== -1){
        return users.splice(index, 1);
    }
}

//Get Room user
function getRoomUser () {
    return users.filter(user.room = room);
}
module.exports = {
    userJoin, 
    getCurrentUser,
    userLeave,
    getRoomUser
}