import { Mongo } from 'meteor/mongo';

export const Service = new Mongo.Collection('service');

export const ServiceIndex = new EasySearch.Index({
    collection: Service,
    fields: ['folio','date'],
    engine: new EasySearch.Minimongo()
});
