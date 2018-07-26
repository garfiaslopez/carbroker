import { Mongo } from 'meteor/mongo';

export const Client = new Mongo.Collection('client');

export const ClientIndex = new EasySearch.Index({
    collection: Client,
    fields: ['description','owner','email'],
    engine: new EasySearch.Minimongo()
});
