import Link from "next/link"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { abi, contractAddresses } from "../../contracts"

const VoteFormHeader = () => {
    const { account, isWeb3Enabled } = useMoralis()
    const [isAdmin, setIsAdmin] = useState()

    const { runContractFunction: isAdmins } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddresses[5][0],
        functionName: "isAdmins",
        params: { addr: account },
    })

    useEffect(() => {
        async function is_admin() {
            const isAdminsFromCall = await isAdmins()

            if (isAdminsFromCall) {
                if (isAdminsFromCall == 1) setIsAdmin(1)
                else setIsAdmin(0)
            }
        }
        is_admin()
    }, [isWeb3Enabled, account])

    return (
        <div className="flex justify-between items-center pt-5 pb-10 pr-5 pl-5 ">
            <div className=" font-black text-[20px] ">welcome</div>
            <div className="font-bold text-xs	">
                <Link
                    href="/directory/History"
                    className="mr-4 hover:border-b-4 border-sky-500"
                >
                    history
                </Link>
                {isAdmin ? (
                    <Link
                        href="/directory/AdminPanel"
                        className="mr-4 hover:border-b-4 border-sky-500"
                    >
                        Admin Panel
                    </Link>
                ) : (
                    <></>
                )}
                <Link
                    href="#last"
                    className="mr-4 hover:border-b-4 border-sky-500"
                >
                    last elections
                </Link>
            </div>
        </div>
    )
}

export default VoteFormHeader
