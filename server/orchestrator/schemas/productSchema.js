const axios = require(`axios`)
const ioredis = require(`ioredis`)

const redis = new ioredis({
  port: 19638,
  host: "redis-19638.c91.us-east-1-3.ec2.cloud.redislabs.com",
  password: process.env.PASSWORD || "zDuRPOzyPFu3YV1HPLgXq36fugTE8KIF",
})

const host_prod = `http://service-app:4002`
const host_local = `http://service-app:4002`
const host_user = `http://service-usert:4001`
const key = `product:products`
const key_2 = `category:categories`

const typeDefs = `#graphql

  type Category {
    name: String
  }
  
  type Product {
    id: ID!
    name: String
    slug: String
    description: String
    price: Int
    mainImg: String
    Category: Category
    authorMongoId: String
    authorName: String
  }

  type Response {
    message: String
  }

  input NewCategory {
    name: String
  }

  input NewProduct {
    name: String
    slug: String
    description: String
    price: Int
    mainImg: String
    Category: NewCategory
    authorMongoId: String
  }

  type Query {
    products: [Product]
    product(id: ID!): Product!
    categories: [Category]
  }

  type Mutation {
    newProduct(newProd: NewProduct!): Response!
    delProduct(id: ID!): Response!
    upProduct(id: ID!, newProd: NewProduct!): Response!
  }

`;

const resolvers = {

  Query: {

    products: async() => {
      try {
        // const products = await redis.get(key)
        // if(products) return JSON.parse(products)
        const { data } = await axios({
          url: `${host_local}/products`,
          method: `GET`
        })
        // await redis.set(key, JSON.stringify(data))
        return data
      } catch (error) {
        throw error
      }
    },
    product: async(_, { id }) => {
      try {
        const { data: prod } = await axios({
          url: `${host_local}/products/${id}`,
          method: `GET`
        })
        const { authorMongoId } = prod
        const { data: user } = await axios({
          url: `${host_user}/users/${authorMongoId}`,
          method: `GET`
        })
        prod.authorName = user.username
        return prod
      } catch (error) {
        throw error
      }
    },
    categories: async() => {
      try {
        const categories = await redis.get(key_2)
        if(categories) return JSON.parse(categories)
        const { data } = await axios({
          url: `${host_local}/categories`,
          method: `GET`
        })
        await redis.set(key_2, JSON.stringify(data))
        return data
      } catch (error) {
        throw error
      }
    }
  },

  Mutation: {
    newProduct: async(_, { newProd }) => {
      try {
        const { data } = await axios({
          url: `${host_local}/products`,
          method: `POST`,
          data: newProd
        })
        await redis.del(key)
        return data
      } catch (error) {
        throw error
      }
    },

    delProduct: async(_, { id }) => {
      try {
        const { data } = await axios({
          url: `${host_local}/products/${id}`,
          method: `DELETE`
        })
        await redis.del(key)
        return data
      } catch (error) {
        throw error
      }
    },

    upProduct: async(_, { id, newProd }) => {
      try {
        const { data } = await axios({
          url: `${host_local}/products/${id}`,
          method: `PUT`,
          data: newProd
        })
        await redis.del(key)
        return data
      } catch (error) {
        throw error
      }
    }
  }

};

module.exports = [typeDefs, resolvers]
