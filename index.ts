import { prisma } from "./generated/prisma-client";
const { GraphQLServer } = require("graphql-yoga");
import * as express from "express";
import * as bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

const resolvers = {
  Query: {
    Client: {
      projects(parent) {
        return prisma.client({ ID: parent.ID }).projects();
      }
    }
  }
};

const fragment = `
fragment UserWithPosts on Client {
  ID
  name
  projects {
    title
  }
}
`;
app.get(`/cost-explorer`, async (req, res) => {
  const publishedPosts = await await prisma.clients().$fragment(fragment);
  res.json(publishedPosts);
});

app.listen(3000, () => console.log("Server is running on http://localhost:3000"));