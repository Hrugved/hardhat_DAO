import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers } from 'hardhat'

const MIN_DELAY = 3600

const deployTimeLock: DeployFunction = async function (hre:HardhatRuntimeEnvironment) {
  const {getNamedAccounts,deployments,network} = hre
  const {deploy,log} = deployments
  const {deployer} = await getNamedAccounts()
  const timeLock = await deploy('TimeLock',{
    from: deployer,
    args: [MIN_DELAY,[],[]],
    log:true
  })
}

export default deployTimeLock