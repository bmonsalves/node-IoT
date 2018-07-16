const DbSetup = require('./lib/db');
const AgentModel = require('./models/agent');
const MetricModel = require('./models/metric');

module.exports = async (config) => {
  const sequelize = DbSetup(config);
  const metric  = MetricModel(config);
  const agent = AgentModel(config);

  agent.hasMany(metric);
  metric.belongsTo(agent);

  await sequelize.authenticate();

  if(config.setup){
    await sequelize.sync({force: true});
  }

  const Agent = {};
  const Metric = {};

  return {
    Agent,
    Metric
  }
};
