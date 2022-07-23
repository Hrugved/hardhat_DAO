import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers } from 'hardhat'

const VOTING_PERIOD = 5
const VOTING_DELAY = 1
const VOTING_PERCENTAGE = 4

const deployGovernorContract: DeployFunction = async function (hre:HardhatRuntimeEnvironment) {
  const {getNamedAccounts,deployments,network} = hre
  const {deploy,log,get} = deployments
  const {deployer} = await getNamedAccounts()
  const governanceToken = await get('GovernanceToken')
  const timeLock = await get('TimeLock')
  const governorContract = await deploy('GovernorContract',{
    from: deployer,
    args: [governanceToken.address,timeLock.address,VOTING_DELAY,VOTING_PERIOD,VOTING_PERCENTAGE],
    log:true
  })
}

export default deployGovernorContract