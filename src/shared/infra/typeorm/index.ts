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

connectionSource.initialize();

export default connectionSource;