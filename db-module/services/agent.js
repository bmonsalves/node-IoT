'use strict';

module.exports = function setupAgent (AgentModel) {
    let findById =  (id) => {
        return AgentModel.findById(id)
    }

    return {
        findById
    }
}