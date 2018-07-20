'use strict';

const db = require('../');
const debug = require('debug')('node-iot:examples');

const run = async () => {
    const config = {
        database: process.env.DB_NAME || 'node-iot',
        username: process.env.DB_USER || 'bmonsalves',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: s => debug(s),
        setup: true
    };

    const { Agent, Metric } = await db(config).catch(handleFatalError);

    const new_agent = await Agent.createOrUpdate(
        {
            uuid: 'DDDDDdddddddDDD',
            name: 'fixture-test',
            username: 'bmonsalves',
            hostname: 'test-host',
            pid: 0,
            connected: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ).catch(handleFatalError);

    console.log('======new agent======');
    console.log(new_agent);
    const update_agent = await Agent.createOrUpdate(
        {
            uuid: 'bgtbgtbgtbgtbg',
            name: `fixture-test editado ${randomInt(1,10)}`,
            username: 'bmonsalves',
            hostname: 'test-host',
            pid: 0,
            connected: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ).catch(handleFatalError);

    console.log('======update agent======');
    console.log(update_agent);

    const allAgents = await Agent.findAll();

    console.log('======all agents======');
    console.log(allAgents);

    const new_metric = await Metric.create(new_agent.uuid, {
        type: 'cpu',
        value: `${randomInt(10,100)}`
    }).catch(handleFatalError);

    console.log('======new metric======');
    console.log(new_metric);

    const uuidMetrics = await Metric.findByAgentUuid(new_agent.uuid)
                                    .catch(handleFatalError);

    console.log('======agent metric by uuid======');
    console.log(uuidMetrics);


    const typeUuidMetrics = await Metric.findByTypeAgentUUid('cpu',new_agent.uuid)
                                        .catch(handleFatalError);

    console.log('======agent metric by type and uuid======');
    console.log(typeUuidMetrics);
};

const handleFatalError = (err) => {
    console.error(err.message);
    console.error(err.stack);
    process.exit(1);
};

const randomInt  = (low, high) => {
    return Math.floor(Math.random() * (high - low) + low);
}

run();