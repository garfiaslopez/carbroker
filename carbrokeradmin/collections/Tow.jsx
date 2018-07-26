import { Mongo } from 'meteor/mongo';

export const Tow = new Mongo.Collection('tow');

export const TowIndex = new EasySearch.Index({
    collection: Tow,
    fields: ['towNumber','plates'],
    engine: new EasySearch.Minimongo()
});
