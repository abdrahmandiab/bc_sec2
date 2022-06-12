const Migrations = artifacts.require('Migrations');
const EHR = artifacts.require('EHR');

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(EHR);
};
