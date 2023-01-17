import "@typechain/hardhat"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-ethers"
import "hardhat-gas-reporter"
import "dotenv/config"
import "solidity-coverage"
import "hardhat-deploy"
import "@nomiclabs/hardhat-waffle"
import "solidity-coverage"
import "@nomicfoundation/hardhat-network-helpers"
import { HardhatUserConfig } from "hardhat/config"

const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const RPC_URL = process.env.RPC_URL || ""
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        goerli: {
            url: RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            saveDeployments: true,
            chainId: 5,
        },
        Ganache: {
            url: "http://127.0.0.1:8545",
            accounts: ["0x7fc357828f424f1ab7f8ef87f03323d655646aa35ecdc3aafbb5cb5e159b4fd8"],
        },
    },
    solidity: { compilers: [{ version: "0.8.9" }, { version: "0.4.24" }] },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
        player: {
            default: 1,
        },
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    mocha: {
        timeout: 20000,
    },
}

export default config
