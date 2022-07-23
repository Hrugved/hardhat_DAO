import { devChains, FUNC, NEW_STORE_VALUE, proposalsFile, PROPOSAL_DESCRIPTION, VOTING_DELAY, VOTING_PERIOD } from "../helper-hardhat-config"
import { moveBlocks } from "../utils/move-block"
import { ethers, network } from "hardhat"
import * as fs from 'fs';

const index = 0;

export const vote = async (proposalIndex:number) => {
  const proposals = JSON.parse(fs.readFileSync(proposalsFile,'utf8'))
  const proposalId = proposals[network.config.chainId!][proposalIndex]
  /** against: 0
   * for: 1
   * abstain: 2
   */
  const voteWay = 1
  const governor = await ethers.getContract('GovernorContract')
  const reason = 'no reason'
  const voteTxResponse = await governor.castVoteWithReason(proposalId,voteWay,reason)
  await voteTxResponse.wait(1)
  if(devChains.includes(network.name)) { 
    await moveBlocks(VOTING_PERIOD+1)
  }
  console.log('voted!')
}

vote(index)
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })

