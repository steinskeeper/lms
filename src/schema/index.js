import { SchemaComposer } from 'graphql-compose';
import db from '../utils/db';
import { LeadMutation, LeadQuery } from './lead';
require('../schema/relations');

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from './user';

schemaComposer.Query.addFields({
    ...UserQuery,
    ...LeadQuery,
});

schemaComposer.Mutation.addFields({
    ...UserMutation,
    ...LeadMutation,
});

export default schemaComposer.buildSchema();
