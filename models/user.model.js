const mongoose = require("mongoose");

// Reusable URL validator function
const urlValidator = {
  validator: function (value) {
    // Custom validation using a regular expression
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return urlRegex.test(value);
  },
  message: (props) => `${props.value} is not a valid URL!`,
};

// User schema
const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  id: { type: Number, default: "" },
  node_id: { type: String, default: "" },
  avatar_url: { type: String, validate: urlValidator, default: "" },
  gravatar_id: { type: String, default: "" },
  url: { type: String, validate: urlValidator, default: "" },
  html_url: { type: String, validate: urlValidator, default: "" },
  followers_url: { type: String, validate: urlValidator, default: "" },
  following_url: { type: String, validate: urlValidator, default: "" },
  gists_url: { type: String, validate: urlValidator, default: "" },
  starred_url: { type: String, validate: urlValidator, default: "" },
  subscriptions_url: { type: String, validate: urlValidator, default: "" },
  organizations_url: { type: String, validate: urlValidator, default: "" },
  repos_url: { type: String, validate: urlValidator, default: "" },
  events_url: { type: String, validate: urlValidator, default: "" },
  received_events_url: { type: String, validate: urlValidator, default: "" },
  type: { type: String, default: "User" },
  site_admin: { type: Boolean, default: "false" },
  name: { type: String, default: "" },
  company: { type: String, default: "" },
  blog: { type: String, default: "" },
  location: { type: String, default: "" },
  email: {
    type: String,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, //Email validation.
  },
  hireable: { type: Boolean,},
  bio: { type: String, default: "" },
  twitter_username: { type: String, default: "" },
  public_repos: { type: Number, default: "" },
  public_gists: { type: Number, default: "" },
  followers: { type: Number, default: "" },
  following: { type: Number, default: "" },
  created_at: { type: Date },
  updated_at: { type: Date },
  is_removed: {
    type: Boolean,
    default: false,
  },
  friends: [{ type: String, default: "" }],
});


// Create the Mongoose model
const User = mongoose.model("User", userSchema);

// Export the model
module.exports.User = User;
