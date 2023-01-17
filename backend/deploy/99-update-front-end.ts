import { HardhatRuntimeEnvironment } from "hardhat/types"
import { Address, DeployFunction } from "hardhat-deploy/types"
import { fstat, readFileSync, writeFileSync } from "fs"

const FRONT_END_ADDRESSES_FILE = "../frontEnd/contracts/contractAddresses.json"
const FRONT_END_ABI_FILE = "../frontEnd/contracts/abi.json"

const updateUi: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { ethers, network } = hre
    const ellection = await ethers.getContract("Election")

    if (process.env.UPDATE_FRONT_END) {
        const ellectionAddress = ellection.address
        const abi = ellection.interface.format(ethers.utils.FormatTypes.json)
        const chainId: any = network.config.chainId?.toString()

        updateContractAddresses(ellectionAddress, chainId)
        updateAbi(abi)

        console.log("Ui updated")
        console.log("------------------------------")
    }
}

async function updateContractAddresses(ellection: Address, chainId: any) {
    const contractAddresses = JSON.parse(readFileSync(FRONT_END_ADDRESSES_FILE, "utf-8"))
    if (chainId in contractAddresses) {
        if (!contractAddresses[chainId].includes(ellection)) {
            contractAddresses[chainId].push(ellection)
        }
    } else {
        contractAddresses[chainId] = [ellection]
    }
    writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(contractAddresses))
}

async function updateAbi(abi: any) {
    writeFileSync(FRONT_END_ABI_FILE, abi)
}

export default updateUi
updateUi.tags = ["all", "frontend"]
