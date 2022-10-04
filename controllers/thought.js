const { Thought, User } = require('../models');

const thoughtsController = {

    newThought({ body }, res) {
        Thought.create(body)
          .then(data => {
            return User.findOneAndUpdate({_id: body.userId }, { $push: { thoughts: data._id } },{ new: true });})
          .then(data => {
            console.log(data);
            if (!data) {
              res.status(404).json({ message: 'Error: Could not find user. Please enter valid userId and thoughtText.' });
              return;
            }
            res.json(data);
          })
          .catch(err => res.json(err));
      },


  getThoughts(req, res) {
    Thought.find({}).select('-__v').sort({ _id: -1 })
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  
  getThoughtById({params}, res) {
    Thought.findOne({_id: params.id}).populate({path: 'reactions',select: '-__v'}).select('-__v')
      .then(data => {
        console.log(data)
        res.json(data)
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  updateThought({params, body}, res) {
    console.log(params)
    Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'Error: Could not update thought.' });
          return;
        }
        res.json(data);
      })
      .catch(err => res.json(err));
  },


  deleteThought({params}, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'Error: Could not delete thought.' });
          return;
        }
        res.json({ message: 'Thought was successfully deleted!' });
      })
      .catch(err => res.json(err));
  },


  newReaction({params, body}, res) {
    console.log(params);
    console.log(body)
    Thought.findOneAndUpdate({_id: params.thoughtId},{$push: {reactions: body}},{new: true, runValidators: true})
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'Error: Could not find user.' });
          return;
        }
        res.json(data);
      })
      .catch(err => res.json(err));
  },

  
  deleteReaction({params}, res) {
    console.log(params)
    Thought.findOneAndUpdate({_id: params.thoughtId},{$pull: {reactions: {reactionId: params.reactionId} }}, {new: true})
      .then(data => res.json(data))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtsController;