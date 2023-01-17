import Router from "next/router"
import { useEffect, useState } from "react"
import { useNotification } from "@web3uikit/core"
import { contractAddresses, abi } from "../../contracts"
import {
    useMoralis,
    useWeb3ExecuteFunction,
    useWeb3Contract,
} from "react-moralis"
import { Form } from "@web3uikit/core"

const VoteForm = ({ time }) => {
    const { isWeb3Enabled, account } = useMoralis()
    const dipatch = useNotification()
    const contractProcessor = useWeb3ExecuteFunction()

    const [sub, setSub] = useState(false)

    const [title, setTitle] = useState()
    const [description, SetDescription] = useState()
    const [candidates, setCandidates] = useState([])

    const { runContractFunction: getCurrrentElection } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddresses[5][0],
        functionName: "getCurrrentElection",
        params: {},
    })

    useEffect(() => {
        async function fetch() {
            const getCurrrentElectionFromCall = await getCurrrentElection()
            if (getCurrrentElectionFromCall) {
                setTitle(getCurrrentElectionFromCall[0])
                SetDescription(getCurrrentElectionFromCall[1])
                setCandidates(getCurrrentElectionFromCall[2])
            }
        }
        fetch()
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification()
    }

    const handleNewNotification = async function (tx) {
        dipatch({
            type: "info",
            message: "Added",
            position: "bottomR",
            icon: "bell",
        })
    }

    async function giveVote(candidateName) {
        console.log(candidateName, account)
        contractProcessor.fetch({
            params: {
                abi: abi,
                contractAddress: contractAddresses[5][0],
                functionName: "vote",
                params: {
                    voter: account,
                    candidateName: candidateName,
                },
            },
            onSuccess: handleSuccess,
            onError: (e) => {
                console.log(e)
                alert(e)
                setSub(false)
            },
        })
    }

    return (
        <Form
            buttonConfig={{
                isLoading: sub,
                loadingText: "voting",
                theme: "outline",
                text: "vote",
            }}
            data={[
                {
                    name: "voting",
                    options: candidates,
                    type: "radios",
                    value: description,
                    validation: {
                        required: true,
                    },
                },
            ]}
            onSubmit={(e) => {
                giveVote(e.data[0].inputResult[0])
                setSub(true)
            }}
            title={title}
        />
    )
}

export default VoteForm
