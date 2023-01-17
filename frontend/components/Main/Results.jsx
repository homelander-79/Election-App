import Link from "next/link"
import { Table, Tag } from "@web3uikit/core"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { contractAddresses, abi } from "../../contracts"
import { useEffect, useState } from "react"

const Result = () => {
    const [data, setData] = useState()
    const { isWeb3Enabled } = useMoralis()

    const { runContractFunction: getElectionsTable } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddresses[5][0],
        functionName: "getElectionsTable",
        params: {},
    })

    useEffect(() => {
        async function fetch() {
            const getElectionsTableFromCall = await getElectionsTable()
            if (getElectionsTableFromCall) {
                setData(
                    getElectionsTableFromCall.map((e) => {
                        const status = e[3] == "-1" ? "on going" : "ended"
                        const electionId = parseInt(e[0])

                        return [
                            electionId,
                            <Link href={`/directory/elections/${electionId}`}>
                                <Tag text={e[1]} />
                            </Link>,
                            status,
                        ]
                    })
                )
            }
        }
        fetch()
    }, [isWeb3Enabled])

    return (
        <div id="last">
            <Table
                columnsConfig="10% 70% 20%"
                data={data}
                header={[
                    <span>ID</span>,
                    <span>Description</span>,
                    <span>Status</span>,
                ]}
                pageSize={5}
            ></Table>
        </div>
    )
}

export default Result
