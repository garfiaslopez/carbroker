import { Mongo } from 'meteor/mongo';

export const Budget = new Mongo.Collection('budget');

export const BudgetIndex = new EasySearch.Index({
    collection: Budget,
    fields: ['folio','date'],
    engine: new EasySearch.Minimongo()
});
