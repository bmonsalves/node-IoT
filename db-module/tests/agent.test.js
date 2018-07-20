'use strict';

import agentFixtures from "./fixtures/agent";
import test from "ava";
import proxyquire from "proxyquire";
import sinon from "sinon";

let config = {
    logging: function () {}
};


let MetricStub = {
    belongsTo: sinon.spy()
};

const firstAgent = Object.assign({},agentFixtures.first);
let agentId = 1;
let AgentStub = null;
let db = null;
let sandbox = null;
const uuid = firstAgent.uuid;
const uuidArgs = {
    where: {
        uuid
    }
};


test.beforeEach(async () => {

    sandbox = sinon.createSandbox();

    AgentStub = {
        hasMany: sandbox.spy()
    };

    AgentStub.findOne = sandbox.stub();
    AgentStub.findOne
             .withArgs(uuidArgs)
             .returns(Promise.resolve(agentFixtures.byUuid(uuid)));

    AgentStub.update = sandbox.stub();
    AgentStub.update
        .withArgs(uuidArgs,uuidArgs)
        .returns(Promise.resolve(agentFixtures.byUuid(uuid)));

    AgentStub.findById = sandbox.stub();
    AgentStub.findById.withArgs(agentId).returns(Promise.resolve(firstAgent));


    const setupDatabase = proxyquire('../',{
        './models/agent': () => AgentStub,
        './models/metric': () => MetricStub
    });
    db = await setupDatabase(config)
});

test.afterEach(() => {
    sandbox && sandbox.restore()
})

test('Agent', t => {
    //t.pass()
    t.truthy(db.Agent, 'Agent service should exist')
});

test.serial('Setup', t => {
    t.true(AgentStub.hasMany.called, 'AgentModel.hasMany was executed')
    t.true(AgentStub.hasMany.calledWith(MetricStub), 'Argument should be the MetricModel')
    t.true(MetricStub.belongsTo.called, 'MetricModel.belongsTo was executed')
    t.true(MetricStub.belongsTo.calledWith(AgentStub), 'Argument should be the AgentModel')
})

test.serial('Agent#findById', async t => {
    let agent = await db.Agent.findById(agentId)

    t.true(AgentStub.findById.called, 'findById should be called on model')
    t.true(AgentStub.findById.calledOnce, 'findById should be called once')
    t.true(AgentStub.findById.calledWith(agentId), 'findById should be called with specified id')

    t.deepEqual(agent, agentFixtures.byId(agentId), 'should be the same')
})

test.serial('Agent#createOrUpdate', async t => {
    let agent = await db.Agent.createOrUpdate(firstAgent);

    t.true(AgentStub.findOne.called, 'findOne should be called on model');
    t.true(AgentStub.findOne.calledTwice, 'findOne should be called twice');
    t.true(AgentStub.update.calledOnce, 'update should be called once');

    t.deepEqual(agent, firstAgent, 'should be the same')
})