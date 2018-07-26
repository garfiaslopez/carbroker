import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const User = new Mongo.Collection('user');

export const UserIndex = new EasySearch.Index({
    collection: User,
    fields: ['name','email'],
    engine: new EasySearch.Minimongo()
});

const Schema = new SimpleSchema({
    name: { type: String },
    lastname: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    type: { type: String },
    birthdate: { type: Date },
    profilePhoto: { type: String }
});

if (Meteor.isServer) {
    Meteor.startup(() => {
        if(User.find().count() === 0){
            var newUser = {
                name: 'Admin',
                lastname: 'Carbroker',
                password: 'admin',
                email: 'admin@carbroker.com.mx',
                type: 'manager'
            };
            User.insert(newUser);
        }
    });

    Meteor.publish('allUsers', () => {
        return User.find();
    });

    Meteor.methods({
        user_insert: (data) => {
            check(data, Schema);
            const user = User.insert(data);
            if (!user) {
                throw new Meteor.Error('user.error','Error al guardar usuario.');
            }else{
                return user;
            }
        },
        user_delete: (id) => {
            const user = User.remove(id);
            if (!user) {
                throw new Meteor.Error('user.error','Error al borrar usuario.');
            }else{
                return user;
            }
        },
        user_update: (data, id) => {
            check(data, Schema);
            const user = User.update(id,data);
            if (!user) {
                throw new Meteor.Error('user.error','Error al actualizar usuario.');
            }else{
                return user;
            }
        },
    });
    
}
