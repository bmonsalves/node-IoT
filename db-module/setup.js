const debug = require('debug')('node-iot:db:setup');
const DbSetup = require('./');

const setup = async () => {

    let force_db = false;

    process.argv.forEach(e => {
        if (e === '--forceDb') {
            force_db = true
        }
    });

    const config = {
        database: process.env.DB_NAME || 'node-iot',
        username: process.env.DB_USER || 'bmonsalves',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: s => debug(s),
        setup: true
    };

    await DbSetup(config,force_db).catch(handleFatalError);

    console.log('Success!');
    process.exit(0)
};

const handleFatalError = (err) => {
    console.error(err.message);
    console.error(err.stack);
    process.exit(1)
};

setup();