import { DataSource } from 'typeorm';

const connectionSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "gostack_gobarber",
    entities: [
        "./src/modules/**/infra/typeorm/entities/*.ts" 
    ],
    migrations: [
        "./src/shared/infra/typeorm/migrations/*.ts"    
    ],
});

const connectionSourceMongo = new DataSource({
    name: "mongo",
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "gobarberr",
    entities: [
        "./src/modules/**/infra/typeorm/schemas/*.ts" 
    ],
});

connectionSource.initialize();
connectionSourceMongo.initialize();

export {connectionSource, connectionSourceMongo};