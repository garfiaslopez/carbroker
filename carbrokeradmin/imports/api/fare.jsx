import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

const nameModel = "fare";
const nameDescription = "tarifa";

export const Fare = new Mongo.Collection(nameModel);

export const FareIndex = new EasySearch.Index({
    collection: Fare,
    fields: ['description','price'],
    engine: new EasySearch.Minimongo()
});

const Schema = new SimpleSchema({
    _id: { type: String, optional: true },
    description: { type: String },
    price: { type: Number, decimal: true }
});

if (Meteor.isServer) {
    Meteor.publish('allFares', () => {
        return Fare.find();
    });

    Meteor.methods({
        fare_insert: (data) => {
            data.price = Number(data.price);
            check(data, Schema);
            const obj = Fare.insert(data);
            if (!obj) {
                throw new Meteor.Error(nameModel + '.error','Error al guardar ' + nameDescription + '.');
            }else{
                return obj;
            }
        },
        fare_delete: (id) => {
            const obj = Fare.remove(id);
            if (!obj) {
                throw new Meteor.Error(nameModel + '.error','Error al borrar ' + nameDescription + '.');
            }else{
                return obj;
            }
        },
        fare_update: (data, id) => {
            data.price = Number(data.price);
            check(data, Schema);
            const obj = Fare.update(id,data);
            if (!obj) {
                throw new Meteor.Error(nameModel + '.error','Error al actualizar ' + nameDescription + '.');
            }else{
                return obj;
            }
        },
    });

}
