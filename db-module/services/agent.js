'use strict';
const debug = require('debug')('node-iot:agent:service');
module.exports = function setupAgent (AgentModel) {
    let createOrUpdate =  async (agent) => {

        const cond = {
            where: {
                uuid: agent.uuid
            }
        };

        const existingAgent = await AgentModel.findOne(cond);

        if (existingAgent) {
            debug(agent);
            const updated = await AgentModel.update(agent,cond)
            debug("-----------------------------");
            debug(updated);
            debug("-----------------------------");
            return updated ? AgentModel.findOne(cond) : existingAgent
        }

        const result = await AgentModel.create(agent);
        return result.toJSON()
    };

    let findById = (id) => {
        return AgentModel.findById(id)
    };

    let findAll = () => {
        return AgentModel.findAll()
    };

    let findByUuid = (uuid) => {
        return AgentModel.findOne({
            where: {
                uuid
            }
        })
    };

    let findConnected = () => {
        return AgentModel.findAll({
            where: {
                connected: true
            }
        })
    };

    let findByUsername = (username) => {
        return AgentModel.findAll({
            where: {
                username,
                connected: true
            }
        })
    };
    return {
        findById,
        findByUuid,
        findAll,
        findConnected,
        createOrUpdate
    }
}