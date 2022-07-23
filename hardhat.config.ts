
import 'hardhat-deploy'
import '@nomiclabs/hardhat-ethers'
import '@typechain/hardhat'
import { HardhatUserConfig } from 'hardhat/types'
require("dotenv").config()


const RPC_URL_RINKEBY = process.env.RPC_URL_RINKEBY || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""

const config: HardhatUserConfig = {
  solidity: { compilers: [{ version: "0.8.9" }, { version: "0.6.6" }] },
  namedAccounts: { deployer: { default: 0 }, player: { default: 1 } },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true
    },
    localhost: {
      chainId: 31337,
      allowUnlimitedContractSize: true
    },
    rinkeby: {
      chainId: 4,
      url: RPC_URL_RINKEBY,
      accounts: [PRIVATE_KEY],
      allowUnlimitedContractSize: true
    },
  },
}


export default config;