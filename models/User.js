const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create our User model
//inherits all Model functionality
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

//inititalize user model
// create fields/columns for User model
User.init(
  {
    id: {
      //uses sequelize datatypes object
      //specify what datatype
      type: DataTypes.INTEGER,
      //NOT NULL in sql
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      //allows access to vlidators
      //NOT NULL
      allowNull: false,
      //no duplicate email values
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //password length must be at least 4 characters
        len: [4]
      }
    }
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      //hashes password before sending it to db
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },

      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    //pass squelize connection
    sequelize,
    //turns off timestamps
    timestamps: false,
    //keeps name of database singular
    freezeTableName: true,
    //defaults underscore naming conventions
    underscored: true,
    //keeps user model name lowercase
    modelName: 'user'
  }
);

module.exports = User;