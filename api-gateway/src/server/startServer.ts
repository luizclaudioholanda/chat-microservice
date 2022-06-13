import { ApolloServer } from "apollo-server-express";
import config from "config";
import express from "express";
import schema from "#root/graphql/schema";
import resolvers from "#root/graphql/resolvers";
import formatGraphQLErrors from "./formatGraphQLErrors";
import cookieParser from "cookie-parser";
import cors from "cors";
import injectSession from "./middleware/injectSession";

const PORT = <number> config.get("PORT");

const startServer = async () => {

    const appoloServer = new ApolloServer({
        context: a => a,
        formatError: formatGraphQLErrors,
        resolvers,
        typeDefs: schema
    });

    const app = express();

    app.use(cookieParser());

    app.use(
        cors({
        credentials: true,
        origin: (origin, cb) => cb(null, true),
        })
    );
    
    app.use(injectSession);

    await appoloServer.start();

    appoloServer.applyMiddleware({ app, cors: false, path: "/graphql" });

    app.listen(PORT, "0.0.0.0", () => {

        console.log(`API Gateway listening on ${PORT}`);
    });
};

export default startServer;