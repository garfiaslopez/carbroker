import { User } from '../imports/api/user';

// LOGIN METHOD:
Meteor.methods({
    login: (data) => {
        new SimpleSchema({
            email: { type: String },
            password: { type: String }
        }).validate(data);
        const user = User.findOne(data);
        if (!user) {
            throw new Meteor.Error('login.unauthorized','Usuario no encontrado');
        }else{
            return user;
        }
    }
});
