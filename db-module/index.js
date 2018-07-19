const DbSetup = require('./services/db');
const AgentModel = require('./models/agent');
const MetricModel = require('./models/metric');
const defaults = require('defaults');
const setupAgent = require('./services/agent')


module.exports = async (config) => {
  config = defaults(config,{
      dialect: 'sqlite',
      pool:{
        max: 10,
        min:0,
        idle:10000
      },
      query:{
        raw: true
      }
  });

  const sequelize = DbSetup(config);
  const metric  = MetricModel(config);
  const agent = AgentModel(config);

  agent.hasMany(metric);
  metric.belongsTo(agent);

  await sequelize.authenticate();

  if(config.setup){
    await sequelize.sync({force: true});
  }

  const Agent = setupAgent(agent);
  const Metric = {};

  return {
    Agent,
    Metric
  }
};
