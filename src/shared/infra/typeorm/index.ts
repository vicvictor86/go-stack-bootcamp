import { DataSource } from 'typeorm';

const connectionSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "gostack_gobarber",
    entities: [
        "./src/models/*.ts" 
    ],
    migrations: [
        "./src/database/migrations/*.ts"    
    ]
});

connectionSource.initialize();

export default connectionSource;