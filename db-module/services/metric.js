'use strict';
const debug = require('debug')('node-iot:metric:service');
module.exports = function setupMetric (MetricModel, AgentModel) {
    let create = async (uuid, metric) => {

        const agent = await AgentModel.findOne({
            where: { uuid }
        });

        if (agent) {
            Object.assign(metric, { agentId: agent.id } );
            const created = await MetricModel.create(metric);
            return created.toJSON();
        }

    };

    let findByAgentUuid = (uuid) => {

        const cond = {
            attributes: ['type'],
            group: 'type',
            include: [
                {
                    attributes: [],
                    model: AgentModel,
                    where: { uuid }
                }
            ],
            raw: true
        };

        return MetricModel.findAll(cond);

    };

    let findByTypeAgentUUid = (type, uuid) => {

        let cond = {
            attributes: ['id','type','value','createdAt'],
            where:{ type },
            limit: 50,
            order: [['createdAt','DESC']],
            include: [
                {
                    attributes: [],
                    model: AgentModel,
                    where: { uuid }
                }
            ],
            raw: true
        };

        return MetricModel.findAll(cond);
    };

    return {
        create,
        findByAgentUuid,
        findByTypeAgentUUid
    }
};