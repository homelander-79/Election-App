import { Election } from "../typechain-types"
import { ethers, network, deployments, getNamedAccounts } from "hardhat"
import { time } from "@nomicfoundation/hardhat-network-helpers"

async function main() {
    let election: Election
    const chainId: number = network.config.chainId!
    const deployer = (await getNamedAccounts()).deployer

    await deployments.fixture(["all"])
    election = await ethers.getContract("Election", deployer)
    console.log(`---------${await election.getReminingTime()}-------------`)
    await time.increase(31)
    console.log(`----------${await election.getReminingTime()}-------------`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

// const sleep = () =>
//     new Promise((resolve) => {
//         setTimeout(resolve, 20_000)
//     })
