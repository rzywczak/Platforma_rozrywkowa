const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const RoomSchema = mongoose.Schema({
    roomName: {
        type: String
    },
    password: {
        type: String
    },
    roomId: {
        type: Number
    }
})

RoomSchema.pre('save', async function(next) {
    try{
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword
        next();
    }
    catch (error){
        next(error)
    }
});


module.exports = mongoose.model('room', RoomSchema)