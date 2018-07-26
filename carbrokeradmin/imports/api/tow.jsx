import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

const nameModel = "tow";
const nameDescription = "Grúa";

export const Tow = new Mongo.Collection(nameModel);

const Schema = new SimpleSchema({
    _id: { type: String },
    towNumber: { type: String },
    plates: { type: String },
    folioNumber: { type: String },
    date: { type: Date },
    initialKm: { type: Number, decimal: true },
    finalKm: { type: Number, decimal: true }
});

if (Meteor.isServer) {

    Meteor.publish('getTows', (filter) => {
        console.log("Finding Tows on back: ");
        console.log(filter);
        return Quotation.find();
    });

    Meteor.methods({
        tow_insert: (data) => {
            check(data, Schema);
            const obj = Tow.insert(data);
            if (!obj) {
                throw new Meteor.Error(nameModel + '.error','Error al guardar ' + nameDescription + '.');
            }else{
                return obj;
            }
        },
        tow_delete: (id) => {
            const obj = Tow.remove(id);
            if (!obj) {
                throw new Meteor.Error(nameModel + '.error','Error al borrar ' + nameDescription + '.');
            }else{
                return obj;
            }
        },
        tow_update: (data, id) => {
            check(data, Schema);
            const obj = Tow.update(id,data);
            if (!obj) {
                throw new Meteor.Error(nameModel + '.error','Error al actualizar ' + nameDescription + '.');
            }else{
                return obj;
            }
        },
    });

}
