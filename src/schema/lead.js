import { authMiddleware } from '../middleware/authMiddleware';
import { LeadTC } from '../models/lead';
import {
    addLeads,
    addCall,
    getLeads,
    addOneLead,
    addCustomLeads,
} from '../resolvers/lead';

LeadTC.addResolver(addLeads);
LeadTC.addResolver(addCall);
LeadTC.addResolver(getLeads);
LeadTC.addResolver(addOneLead);
LeadTC.addResolver(addCustomLeads);
LeadTC.getResolver('findMany').addFilterArg({
    name: 'bycalls',
    type: 'MongoID',
    description: 'Search by call',
    query: (rawQuery, value) => {
        rawQuery.calls = { $eleMatch: { _id: value } };
    },
});
const LeadQuery = {
    leadById: LeadTC.getResolver('findById'),
    leadByIds: LeadTC.getResolver('findByIds'),
    getLeads: LeadTC.getResolver('getLeads'),
    leadOne: LeadTC.getResolver('findOne'),
    leadMany: LeadTC.getResolver('findMany'),
    leadCount: LeadTC.getResolver('count'),
    leadConnection: LeadTC.getResolver('connection'),
    leadPagination: LeadTC.getResolver('pagination'),
};

const LeadMutation = {
    addleads: LeadTC.getResolver('addLeads'),
    addCall: LeadTC.getResolver('addCall'),
    addCustomLeads: LeadTC.getResolver('addCustomLeads'),
    addOneLead: LeadTC.getResolver('addOneLead'),
    leadCreateOne: LeadTC.getResolver('createOne'),
    leadCreateMany: LeadTC.getResolver('createMany'),
    leadUpdateById: LeadTC.getResolver('updateById', [authMiddleware.isAdmin]),
    leadUpdateOne: LeadTC.getResolver('updateOne'),
    leadUpdateMany: LeadTC.getResolver('updateMany', [authMiddleware.isAdmin]),
    leadRemoveById: LeadTC.getResolver('removeById', [authMiddleware.isAdmin]),
    leadRemoveOne: LeadTC.getResolver('removeOne', [authMiddleware.isAdmin]), // Cann
    leadRemoveMany: LeadTC.getResolver('removeMany', [authMiddleware.isAdmin]),
};

export { LeadQuery, LeadMutation };
