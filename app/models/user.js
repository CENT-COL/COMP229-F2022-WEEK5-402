import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const { PassportLocalSchema } = mongoose;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    displayName: String,
    username: String,
    emailAddress: String,    
}, {
    timestamps: true,
    colleciton: 'users'
});

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', UserSchema);