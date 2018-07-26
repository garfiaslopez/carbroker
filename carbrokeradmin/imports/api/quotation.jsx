import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import moment from 'moment';
import schemas from '../schemas/quotation';

const nameModel = "quotation";
const nameDescription = "cotización";

export const MongoCollection = new Mongo.Collection(nameModel);
const Schema = schemas[nameModel];
const ensureIndex = schemas[nameModel + '_index'];

if (Meteor.isServer) {
    Meteor.startup(() => {
        if(MongoCollection.find().count() === 0) {
            MongoCollection.rawCollection().createIndex(ensureIndex);
        }
    });
    Meteor.publish('get_' + nameModel, (filter) => {
        var skipDoc = filter.page > 0 ? ((filter.page-1) * filter.perPage) : 0;
        if (filter.searchText !== undefined && filter.searchText !== '') {
            return MongoCollection.find({ $text: { $search: filter.searchText } }, {skip: skipDoc, limit: filter.perPage});
        }
        return MongoCollection.find({}, { skip: skipDoc, limit: filter.perPage } );
    });
    const apiMethods = {}
    apiMethods[nameModel + '_count'] = () => {
        const totalDocs = MongoCollection.find().count();
        return {
            total: totalDocs,
        };
    };
    apiMethods[nameModel + '_insert'] =  (data) => {
        data.date = moment().toDate();
        data.basePrice = Number(data.basePrice);
        data.tollboothPrice = Number(data.tollboothPrice);
        data.totalPrice = Number(data.basePrice + data.tollboothPrice);
        check(data, Schema);
        const obj = MongoCollection.insert(data);
        if (!obj) {
            throw new Meteor.Error(nameModel + '.error','Error al guardar ' + nameDescription + '.');
        }else{
            return obj;
        }
    };
    apiMethods[nameModel + '_delete'] = (id) => {
        const obj = MongoCollection.remove(id);
        if (!obj) {
            throw new Meteor.Error(nameModel + '.error','Error al borrar ' + nameDescription + '.');
        }else{
            return obj;
        }
    };
    apiMethods[nameModel + '_update'] = (data, id) => {
        check(data, Schema);
        const obj = MongoCollection.update(id,data);
        if (!obj) {
            throw new Meteor.Error(nameModel + '.error','Error al actualizar ' + nameDescription + '.');
        }else{
            return obj;
        }
    };
    Meteor.methods(apiMethods);
}
