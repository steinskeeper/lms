import { UserTC } from '../models/user';
import { LeadTC } from '../models/lead';

LeadTC.addRelation('createdByUser', {
  resolver: () => UserTC.getResolver('findOne'),
  prepareArgs: {
    _id: source => source.userID
  },
  projection: { createdByUser: 1 }
})
