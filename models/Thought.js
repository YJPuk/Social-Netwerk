const { Schema, model, Types } = require('mongoose');
//Using dayjs for time
const dayjs = require('dayjs');

//Thought Schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required:[true,"Please leave a valid thought"], 
      minlength: 1,
      maxlength: 280,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        dayjs(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

//Virtual property reaction count for number of reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//Reaction Schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 280,
    },

    username: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        dayjs(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

//Initializing thought model 
const Thought = model("Thought", thoughtSchema);

//Export thought model
module.exports = Thought;