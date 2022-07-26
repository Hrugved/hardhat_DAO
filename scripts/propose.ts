import { devChains, FUNC, NEW_STORE_VALUE, proposalsFile, PROPOSAL_DESCRIPTION, VOTING_DELAY } from "../helper-hardhat-config"
import { moveBlocks } from "../utils/move-block"
import { ethers, network } from "hardhat"
import * as fs from 'fs';

export const propose = async (args: any[], functionToCall: string, proposalDescription: string) => {
  const governor = await ethers.getContract("GovernorContract")
  const box = await ethers.getContract("Box")
  const encodedFunctionCall = box.interface.encodeFunctionData(functionToCall, args)
  console.log(encodedFunctionCall)
  console.log(`Proposing ${functionToCall} on ${box.address} with ${args}`)
  console.log(`Proposal description: \n ${proposalDescription}`)
  const proposeTx = await governor.propose([box.address],[0],[encodedFunctionCall],proposalDescription)
  const proposeReceipt = await proposeTx.wait(1)
  if(devChains.includes(network.name)) {
    await moveBlocks(VOTING_DELAY+1)
  }
  const proposalId = proposeReceipt.events[0].args.proposalId;
  let proposals = JSON.parse(fs.readFileSync(proposalsFile,'utf8'))
  proposals[network.config.chainId!.toString()].push(proposalId.toString())
  fs.writeFileSync(proposalsFile,JSON.stringify(proposals))
}


propose([NEW_STORE_VALUE], FUNC, PROPOSAL_DESCRIPTION)
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
