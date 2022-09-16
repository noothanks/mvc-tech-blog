// import all models
const Post = require('./Post');
const User = require('./User');
const Vote = require('./Vote');
const Comment = require('./Comment');

// create associations
//links user model to have many post ids as a foreign key per user
User.hasMany(Post, {
  foreignKey: 'user_id'
});

//links post model to have one user id as a foreign key per post
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

//associates user to a post THROUGH a vote table
//do not get confused with post to use

//user and post ids are unique as set in their models
//this prevents a user from voting on a single post more than once
//known as foreign key constraints
User.belongsToMany(Post, {
  //sets foreign key to be in vote
  through: Vote,
  //sets name of vote model when displayed
  as: 'voted_posts',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

//associates post to a user through vote model
//same connection as above but on the post table
Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

//each vote will belong to one user
Vote.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

//each vote will belong to a post
Vote.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

//one user can have many votes
User.hasMany(Vote, {
  foreignKey: 'user_id'
});

//one post can have many votes
Post.hasMany(Vote, {
  foreignKey: 'post_id'
});

//comment can have one user
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

//comment can have one post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

//user can have many comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

//post can have many comments
Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Vote, Comment };