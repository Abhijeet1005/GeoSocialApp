const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    postCaption: {
        type: String,
        required: true,
    },
    
    postGeo: {
        type: String,
        default: null,
    },

    currentDate: {
        type: Date,
        default: Date.now,
    },

    currentTime: {
        type: String,
        default: () => new Date().toLocaleTimeString(), //fetches the data from Date() then converts it to current time using .toLocaleTimeString()
    },

    Likes:{
        type: Array,
        default: []
    },
})

module.exports = mongoose.model('Post',postSchema)