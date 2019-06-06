require('dotenv').config();
const express = require("express");
const path = require("path");
import { GraphQLServer, PubSub} from 'graphql-yoga';
//import db from './db'
import { startDB, models } from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';
import session from 'express-session';
import ms from 'ms';


//mongodb+srv://JudgeBoi:jackson860128@cluster0-9baj7.gcp.mongodb.net/test
const db = startDB({ 
  URL: process.env.MONGO
})


const pubsub = new PubSub()

const context = (req) => ({
  req: req.request,
  db,
  models,
  pubsub
});

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment
  },
  context,
})
//server.express.use(bodyParser.json());
server.express.use(session({
  name: 'qid',  
  secret: `some-random-secret-here`,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: ms('1d'),
  },
}));


const root = path.join(__dirname, 'build')
server.express.use(express.static(root));
server.express.get("*", (req, res) =>
  {res.sendFile('index.html', { root });})


const opts = {
  port: process.env.PORT || 4000,
  cors: {
    credentials: true,
    origin: ['/'] // your frontend url.
  }
};
server.start(opts, 
  () => console.log(`Server is running on http://localhost:${opts.port}`));
