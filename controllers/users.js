const { User, Thought } = require ('../models');


const usersController = {
    createUser({ body }, res){
        User.create(body)
        .then(data => res.json(data))
        .catch(err => res.json(err));
    },

    getUsers(req, res) {
        User.find({}).populate({path: 'friends',select: '-__v'}).populate({path: 'thoughts',select: '-__v'}).select('-__v')
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    updateUser({params, body} , res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(data =>{
            if (!data) {
                res.status(404).json({message: 'Invalid ID'});
                return;
            }
            res.json(data);
        })
        .catch(err => res.json(err));
    },

    deleteUser({params}, res) {
        User.findOneAndDelete({ _id: params.id })
          .then(data => res.json({message:`Successfully deleted user! ${data}`}))
          .catch(err => res.json(err));
      },

      getUserID ({params}, res) {
        User.findOne ({_id: params.id }).populate({path: 'thoughts', select: '-__v'}).select('-__v')
        .then(data => res.json(data))
        .catch(err =>{
            console.log(err);
            res.sendStatus(400);
        } );
    },
      addFriends ({params}, res) {
        User.findOneAndUpdate({_id: params.userId}, {$push: { friends: params.friendId}}, {new: true})
        .then(data => {
        console.log(data)
        res.json(data)
        })
        .catch(err => {
        console.log(err);
        res.sendStatus(400);
        });
      },
    
      deleteFriend({ params }, res) {
        User.findOneAndUpdate({_id:params.userId}, {$pull: { friends: params.friendId}}, {new: true})
          .then(data => res.json(data))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      }
};

module.exports = usersController;