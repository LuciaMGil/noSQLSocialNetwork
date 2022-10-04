const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ThoughtSchema = new Schema(
    {
        thoughtText: {type: String, minlegnth: 1, maxlength: 280, required: true},
        username: {type: String, require: true},
        createdAt:{type: Date, default: Date.now, get:  createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')}, 
    },
    {
        toJSON:{
            virtuals: true, 
            getters: true
        },
        id: false
    }
);


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought; 