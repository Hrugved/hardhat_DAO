import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers } from 'hardhat'

const setupContracts: DeployFunction = async function (hre:HardhatRuntimeEnvironment) {
  const {getNamedAccounts,deployments,network} = hre
  const {deploy,log,get} = deployments
  const {deployer} = await getNamedAccounts()
  const governor = await ethers.getContract('GovernorContract',deployer)
  const timeLock = await ethers.getContract('TimeLock',deployer)

  const proposerRole = await timeLock.PROPOSER_ROLE()
  const executorRole = await timeLock.EXECUTOR_ROLE()
  const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()
  log('setting up roles...')
  const proposerTx = await timeLock.grantRole(proposerRole,governor.address)
  await proposerTx.wait(1)
  const executorTx = await timeLock.grantRole(executorRole,ethers.constants.AddressZero)
  await executorTx.wait(1)
  const revokeTx = await timeLock.revokeRole(proposerRole,deployer)
  await revokeTx.wait(1)
}

export default setupContracts