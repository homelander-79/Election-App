import { BigNumber, ethers } from "ethers"

export interface networkVonfigItem {
    name?: string
    vrfCordinatorv2?: string
    blockConfirmations?: number
    EntranceFee?: string
    gasLane?: string
    suscriptionId?: string
    callbackGasLimit?: string
    interval?: string
}

export interface networkVonfigInfo {
    [key: number]: networkVonfigItem
}

export const networkConfig: networkVonfigInfo = {
    5: {
        name: "goerli",
        vrfCordinatorv2: "0x271682DEB8C4E0901D1a1550aD2e64D568E69909",
        blockConfirmations: 5,
        suscriptionId: "6416",
        EntranceFee: ethers.utils.parseEther("0.1").toString(),
    },
    31337: {
        name: "localhaost",
        EntranceFee: ethers.utils.parseEther("0.1").toString(),
    },
}

export const VERIFICATION_BLOCK_CONFIRMATIONS = 6

export const developmentChains = ["hardhat", "localhost", "Ganache"]
