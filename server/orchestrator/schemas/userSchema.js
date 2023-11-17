const axios = require(`axios`)
const ioredis = require(`ioredis`)

const redis = new ioredis({
  port: 19638,
  host: "redis-19638.c91.us-east-1-3.ec2.cloud.redislabs.com",
  password: process.env.PASSWORD || "zDuRPOzyPFu3YV1HPLgXq36fugTE8KIF",
})

const host_user = process.env.USER_URL || `http://service-user:4001`
const key = `user:users`

const typeDefs = `#graphql

  type User {
    _id: ID!
    username: String
    email: String
    phoneNumber: String
    address: String
  }

  input NewUser {
    username: String
    email: String
    password: String
    phoneNumber: String
    address: String
  }

  type Response {
    message: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    register(newUser: NewUser!): Response
    unregister(_id: ID!): Response
  }
`;

const resolvers = {

  Query: {
    users: async () => {
      try {
        const users = await redis.get(key)
        if(users) return JSON.parse(users)
        const { data } = await axios({
          url: `${host_user}/users`,
          method: `GET`
        })
        await redis.set(key, JSON.stringify(data))
        return data
      } catch (error) {
        throw error
      }
    },
    user: async(_, {id}) => {
      try {
        const { data } = await axios({
          url: `${host_user}/users/${id}`,
          method: `GET`
        })
        return data
      } catch (error) {
       throw error 
      }
    }
  },

  Mutation: {
    register: async(_, { newUser }) => {
      try {
        const { data } = await axios({
          url: `${host_user}/register`,
          method: `POST`,
          data: newUser
        })
        return data
      } catch (error) {
        throw error
      }
    },
    unregister: async(_, {_id}) => {
      try {
        const { data } = await axios({
          url: `${host_user}/users/${_id}`,
          method: `DELETE`
        })
        return data 
      } catch (error) {
        throw error
      }
    }
  }

};

module.exports = [typeDefs, resolvers]
