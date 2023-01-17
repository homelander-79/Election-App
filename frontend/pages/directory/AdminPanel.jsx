import AddAdmin from "../../components/adminPanel/addAdmin"
import AddCandidate from "../../components/adminPanel/AddCandidate"
import AddElection from "../../components/adminPanel/AddElection"

import { TabList, Tab } from "@web3uikit/core"
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import { abi, contractAddresses } from "../../contracts"
import { useEffect, useState } from "react"

const AdminPanel = () => {
    const [isOwner, setIsOwner] = useState(0)
    const { isWeb3Enabled, account } = useMoralis()
    const contractProcessor = useWeb3ExecuteFunction()

    async function validation() {
        const isOwnerFromCall = await contractProcessor.fetch({
            params: {
                abi: abi,
                contractAddress: contractAddresses[5][0],
                functionName: "isOwner",
                params: { addr: account },
            },
        })
        if (isOwnerFromCall == 1) {
            setIsOwner(1)
        } else setIsOwner(0)
    }

    useEffect(() => {
        validation()
    }, [isWeb3Enabled, account])

    return (
        <div className=" m-12 ">
            <TabList isWidthAuto defaultActiveKey={1} tabStyle="bulbUnion">
                <Tab tabKey={1} tabName="Add Candidate">
                    <br />
                    <AddCandidate />
                </Tab>
                <Tab tabKey={2} tabName="New Election">
                    <AddElection />
                </Tab>
                {isOwner ? (
                    <Tab tabKey={3} tabName="Add Admin">
                        <AddAdmin />
                    </Tab>
                ) : (
                    <></>
                )}
            </TabList>
        </div>
    )
}

export default AdminPanel
