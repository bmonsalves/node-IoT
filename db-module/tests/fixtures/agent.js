'use strict'

const agent = {
    id: 1,
    uuid: 'yyy-yyy-yyy',
    name: 'fixture',
    username: 'bmonsalves',
    hostname: 'test-host',
    pid: 0,
    connected: true,
    createdAt: new Date(),
    updatedAt: new Date()
}

const agents = [
    agent,
    extend(agent, { id: 2, uuid: 'sfsdfsdfsdfd', connected: false, username: 'test' }),
    extend(agent, { id: 3, uuid: 'asddsdassddasdss' }),
    extend(agent, { id: 4, uuid: 'xcvvcxvxcvcvcx', username: 'test' })
]

function extend (obj, values) {
    const clone = Object.assign({}, obj)
    return Object.assign(clone, values)
}

module.exports = {
    first: agent,
    all: agents,
    connected: agents.filter(a => a.connected),
    bmonsalves: agents.filter(a => a.username === 'bmonsalves'),
    byUuid: id => agents.filter(a => a.uuid === id).shift(),
    byId: id => agents.filter(a => a.id === id).shift()
}