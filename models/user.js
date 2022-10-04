const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {type: String, unique: true,  trim: true, required: true},
    email: {type: String, unique: true, required: true},
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
  
    id: false
  }
);


const User = model('User', UserSchema);

module.exports = User;