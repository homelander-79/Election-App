import { useState, useEffect } from "react"
import Link from "next/link"
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import { Table } from "@web3uikit/core"
import { contractAddresses, abi } from "../../contracts"
import Exclamation from "../../components/Layout/Exclamation"
import { useIsUserExist } from "../../lib/useData"

export default function History(props) {
    const { account } = useMoralis()
    const contractProcessor = useWeb3ExecuteFunction()

    const [data, setData] = useState()
    const IsUserExist = useIsUserExist()

    useEffect(() => {
        async function fetch() {
            const getUserHistoryFromCall = await contractProcessor.fetch({
                params: {
                    abi: abi,
                    contractAddress: contractAddresses[5][0],
                    functionName: "getUserHistory",
                    params: { addr: account },
                },
            })
            if (getUserHistoryFromCall) {
                setData(
                    getUserHistoryFromCall.map((row) => {
                        const electionId = (
                            <Link
                                href={`/directory/elections/${parseInt(
                                    row[0]
                                )}`}
                            >
                                {parseInt(row[0])}
                            </Link>
                        )
                        const status = row[2] ? "Ended" : "Ongoing"
                        return [electionId, row[1], status]
                    })
                )
            }
        }
        fetch()
    }, [IsUserExist])

    return IsUserExist ? (
        <Table
            columnsConfig="10% 70% 20%"
            data={data}
            header={[
                <span>ID</span>,
                <span>Your Vote</span>,
                <span>Status</span>,
            ]}
            pageSize={5}
        ></Table>
    ) : (
        <Exclamation msg="You have not voted yet!" />
    )
}
