const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql')

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            id: {
                type: GraphQLInt
            }
        }
    })
})

const server = new ApolloServer({});