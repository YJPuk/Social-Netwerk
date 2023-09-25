const { Thought, User } = require("../models");

const thoughtController = {
  // All Thoughts
  getThoughts(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Single Thought by ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.id })
      .then((dbThoughtData) => {
        !dbThoughtData
          ? res.status(404).json({
              message: "No thought with this id exist!",
            })
          : res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findByIdAndUpdate(
          req.body.userId,
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Update a thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((updatedThought) => {
        if (!updatedThought) {
          return res.status(404).json({ message: "No thought with this id exist!" });
        } else {
          res.json(updatedThought);
        }
      })
      .catch((err) => res.json(err));
  },

  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((dbThoughtData) => {
        !dbThoughtData
          ? res.status(404).json({
              message: "This thought does not exist",
            })
          : res.status(200).json({
              message: "Thought successfully deleted!",
            });
      })
      .catch((err) => {
        console.log("An error has occurred: ", err);
        res.status(500).json(err);
      });
  },

  // Create a reaction
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        !dbThoughtData
          ? res.status(404).json({ message: "No thought with this id exist!" })
          : res.json({
              message: "Reaction successful!",
              dbThoughtData,
            });
      })
      .catch((err) => res.json(err));
  },

  // Delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } }
    )
      .then((dbThoughtData) => {
        !dbThoughtData
          ? res.status(404).json({
              message: "This thought does not exist",
            })
          : res.status(200).json({
              message: "Reaction successfully deleted!",
            });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;