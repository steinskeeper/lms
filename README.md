# LMS Backend

Lead Management System to track and collaborate on potential leads. Will enable shifting from maintaining thousands of data in Excel to an intuitive lead tracking app.


## Tech Stackrap

* ExpressJS
* GraphQL
* MongoDB


## Usage

```sh
$ npm install
```

For development mode

```sh
$ npm run dev
```

### GraphQL Schema




* User Schema

```yaml
type User {
  name: String!
  email: String!
  password: String!
  role: String!
  _id: MongoID!
}

```

* Lead Schema

```yaml
type Lead {
  name: String
  loadedby: [MongoID]
  loadedbyname: [String]
  email: String
  city: String
  state: String
  phonenumber: String
  status: String
  course: [String]
  program: String
  source: [String]
  phonenumber2: String
  admcateg: String
  address: String
  reference: [String]
  nameofboard: String
  regnum12: String
  calls: [LeadCalls]
  _id: MongoID!
  updatedAt: Date
  createdAt: Date
  createdByUser(
    """Filter by fields"""
    filter: FilterFindOneUserInput
    skip: Int
    sort: SortFindOneUserInput
  ): User
  ```
  
  ### Query
  
  ```yaml
  type Query {
  userById(_id: MongoID!): User
  
  userByIds(_ids: [MongoID!]!, limit: Int = 100, sort: SortFindByIdsUserInput): [User!]!
  
  userOne(
    """Filter by fields"""
    filter: FilterFindOneUserInput
    skip: Int
    sort: SortFindOneUserInput
  ): User
  
  userMany(
    """Filter by fields"""
    filter: FilterFindManyUserInput
    skip: Int
    limit: Int = 100
    sort: SortFindManyUserInput
  ): [User!]!
  
  userCount(
    """Filter by fields"""
    filter: FilterCountUserInput
  ): Int
  
  userPagination(
    """Page number for displaying"""
    page: Int

    """"""
    perPage: Int = 20

    """Filter by fields"""
    filter: FilterFindManyUserInput
    sort: SortFindManyUserInput
  ): UserPagination

  leadById(_id: MongoID!): Lead
  leadByIds(_ids: [MongoID!]!, limit: Int = 100, sort: SortFindByIdsLeadInput): [Lead!]!
  getLeads(record: JSON): [Lead]
  
  leadOne(
    """Filter by fields"""
    filter: FilterFindOneLeadInput
    skip: Int
    sort: SortFindOneLeadInput
  ): Lead
  
  leadMany(
    """Filter by fields"""
    filter: FilterFindManyLeadInput
    skip: Int
    limit: Int = 100
    sort: SortFindManyLeadInput
  ): [Lead!]!
  
  leadCount(
    """Filter by fields"""
    filter: FilterCountLeadInput
  ): Int
  
  
  leadPagination(
    """Page number for displaying"""
    page: Int

    """"""
    perPage: Int = 20

    """Filter by fields"""
    filter: FilterFindManyLeadInput
    sort: SortFindManyLeadInput
  ): LeadPagination
}
```
