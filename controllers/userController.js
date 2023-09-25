const { Thought, User } = require("../models");

const userController = {
  // All Users
  getUsers(req, res) {
    User.find({})
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get a Single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Create a User
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Deleting user and their thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({
            message: "This user does not exist",
          });
        }
        Thought.deleteMany({username: dbUserData.username})
        .then((result) => {
          res.status(200).json({
            message: "User successfully deleted",
          });
        })
        .catch((thoughtsError) => {
          res.status(500).json({
            message: "Error: Thought can't be deleted!"
          });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Update user
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({
            message: "This user does not exist",
          });
        } else {
          res.status(200).json({
            message: "User successfully updated!",
            user: dbUserData,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a friend
  addFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.id,
      { $push: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbFriendData) => {
        if (!dbFriendData) {
          res.status(404).json({
            message: "This user does not exist",
          });
        } else {
          res.status(200).json({
            message: "Friend successfully updated!",
            user: dbFriendData,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete a friend
  deleteFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbFriendData) => {
        if (!dbFriendData) {
          res.status(404).json({
            message: "This user does not exist",
          });
        } else {
          res.status(200).json({
            message: "Friend successfully deleted!",
            user: dbFriendData,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userController;