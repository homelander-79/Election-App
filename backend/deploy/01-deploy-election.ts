import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { developmentChains } from "../helper-hardhat-config"
import Verify from "../utils/verify"
const deployElection: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { network, deployments, getNamedAccounts } = hre
    const { log, deploy } = deployments
    const { deployer } = await getNamedAccounts()

    const election = await deploy("Election", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: 1,
    })
    log("election deployed !")

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("verifying ....")
        await Verify(election.address, [])
        log("-------------------------------------")
    }
    if (developmentChains.includes(network.name)) {
    }
    log("------------------------------")
}

export default deployElection
deployElection.tags = ["all", "Election"]
