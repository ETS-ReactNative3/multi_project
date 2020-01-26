const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('api/graphql-Schema');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const resolvers = require('api/graphql-Resolver');
const User = require('app/models/users');

const cors = require('cors');
//const cookieParser = require('cookie-parser');
const app = express();


module.exports = class Application {
    constructor() {
        this.ConfigServer()
        this.ConfigDatabase()
        this.SetConfig()
        this.ConfigRoute()
    }

    ConfigServer() {
        const server = new ApolloServer({typeDefs, resolvers, formatError(err) {

            const data =  err.originalError.data;
            const code =  err.originalError.code || 500;
            const message =  err.message || 'error';

            return { data, status : code, message};
        }, 
            context : async ({ req }) => {

                    const secretID = 'asdasw!@#ASdjshxwe.xfisdyf6%$qwsdahgsd#$';
                    let check = await User.CheckToken(req, secretID);
                    return {
                        check,
                        secretID
                    }
            }
    });
        server.applyMiddleware({ app });
        app.listen(config.port, () => { console.log(`server run on port ${config.port}`)});
    }

    ConfigDatabase() {
        mongoose.Promise = global.Promise;
        mongoose.connect(config.database.url, config.database.options);
    }

    SetConfig() {
        
        app.use(cors());
        app.use(express.static(config.layout.PUBLIC_DIR));
        app.use(bodyParser.json({ limit: "50mb" }));
        app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

        // app.use(session({...config.session}));
        //app.use(cookieParser());
        // app.use(passport.initialize());
        // app.use(passport.session());
    }

    ConfigRoute() {
        app.use(require('app/routes/web'));
    }

}