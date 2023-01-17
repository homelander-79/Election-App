import { Console } from "console"
import { run } from "hardhat"

const verify = async (contractAddress: string, args: any[]) => {
    console.log("Verifying contract...")
    try {
        console.log("verifying contract ...")
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(e)
        }
    }
}

export default verify
