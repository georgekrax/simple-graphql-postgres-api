const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  graphqldate,
} = require("graphql");
const { GraphQLDateTime } = require("graphql-iso-date");

require("dotenv").config();

const pgp = require("pg-promise")();

const connection = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

const db = pgp(connection);

async function getHotels() {
  try {
    const hotels = await db.any("SELECT * FROM hotels");
    return hotels;
  } catch (e) {
    console.log(e);
  }
}

async function getReviewsByID(id) {
  try {
    const reviews = await db.any(
      "SELECT * FROM reviews WHERE hotel_id = $1",
      id
    );
    return reviews;
  } catch (e) {
    console.log(e);
  }
}

async function getHotelByReviewID(id) {
  try {
    const hotel = await db.any(
      "SELECT * FROM hotels WHERE hotels.id = (SELECT hotel_id FROM reviews WHERE reviews.id = $1)",
      id
    );
    return hotel;
  } catch (e) {
    console.log(e);
  }
}

async function getReviews() {
  try {
    const reviews = await db.any("SELECT * FROM reviews");
    return reviews;
  } catch (e) {
    console.log(e);
  }
}

const HotelType = new GraphQLObjectType({
  name: "Hotel",
  description: "This represents all available hotel",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    category: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    avg_rating: { type: GraphQLFloat },
    updated_at: { type: new GraphQLNonNull(GraphQLDateTime) },
    timestamp: { type: new GraphQLNonNull(GraphQLDateTime) },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve: (hotel) => getReviewsByID(hotel.id),
    },
  }),
});

const ReviewType = new GraphQLObjectType({
  name: "Review",
  description: "This represents all the reviews",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    rating: { type: new GraphQLNonNull(GraphQLInt) },
    body: { type: GraphQLString },
    hotel: {
      type: new GraphQLNonNull(new GraphQLList(HotelType)),
      resolve: (review) => getHotelByReviewID(review.id),
    },
  }),
});

const RoutQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    hotels: {
      type: new GraphQLList(HotelType),
      description: "List of hotels",
      resolve: () => getHotels(),
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      description: "List of reviews",
      resolve: () => getReviews(),
    },
  }),
});

const schema = new GraphQLSchema({
  query: RoutQueryType,
});

const app = express();

const server = new ApolloServer({ schema });
server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 5000 }, () =>
  console.log(
    `🚀 Server is running at http://locahost:5000${server.graphqlPath}`
  )
);
