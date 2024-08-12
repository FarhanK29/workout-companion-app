const mongoose = require('mongoose');


const Schema = mongoose.Schema;
//Created a user database schema showing types of data to take into db as well as whether or not its required
const UserSchema = new Schema(
    {
        username: 
        {
            type: String,
            required: true,
            unique: true
        },
        password:
        {
            type: String,
            required: true
        }
    },
    {
        //names the collection users rather than default
        collection: 'users',
        
        //gives a timestamp of when item was added to db
        timestamps: true
    }
);

module.exports = mongoose.model('UserSchema', UserSchema)