import 'reflect-metadata';
import { ApolloServer } from "apollo-server";
import { UsersResolver } from './resolvers/Users';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { customAuthChecker } from './auth';
import { ProjectsResolver } from './resolvers/Project';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
    // database connection, the config is loaded from ormconfig.json
    await createConnection({
        "type": "mysql",
        "host": process.env.MYSQL_HOST || "db",
        "port": process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
        "username": process.env.MYSQL_USER || "root",
        "password": process.env.MYSQL_PASSWORD || "supersecure",
        "database": process.env.MYSQL_DATABASE || "wcs",
        "synchronize": true,
        "logging": true,
        "entities": [ 
            "src/models/**/*.ts"
        ],
        "migrations": [
            "src/migrations/**/*.ts"
        ],
        "cli": {
            "entitiesDir": "src/models",
            "migrationsDir": "src/migrations"
        }
    });

    // ... Building schema here
    const schema = await buildSchema({
        resolvers: [UsersResolver, ProjectsResolver],
        authChecker: customAuthChecker,
    });

    // Create the GraphQL server
    const server = new ApolloServer({
        schema,
        context: ({ req }) => {
            return {
                token: req.headers.authorization,
                user: null
            };
        }
    });

    // Start the server
    const { url } = await server.listen(PORT);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
