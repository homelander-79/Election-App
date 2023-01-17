import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import { abi, contractAddresses } from "../../../contracts"
import Exclamation from "../../../components/Layout/Exclamation"
import ElectionById from "../../../components/Election/election"

const Election = () => {
    const [data, setData] = useState(0)

    const router = useRouter()
    const queryId = router.query.id

    const { isWeb3Enabled } = useMoralis()
    const contractProcessor = useWeb3ExecuteFunction()

    useEffect(() => {
        async function fetch() {
            const getElectionFromCall = await contractProcessor.fetch({
                params: {
                    abi: abi,
                    contractAddress: contractAddresses[5][0],
                    functionName: "getElectionById",
                    params: { electionId: queryId },
                },
            })
            if (getElectionFromCall) setData(getElectionFromCall)
        }
        fetch()
    }, [isWeb3Enabled, queryId])

    return data ? (
        <ElectionById feed={data} />
    ) : (
        <Exclamation msg="Election Not Found" />
    )
}

export default Election
