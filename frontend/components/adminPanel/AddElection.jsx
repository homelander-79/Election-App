import { useState } from "react"
import { Form } from "@web3uikit/core"
import { useNotification } from "@web3uikit/core"
import { useWeb3ExecuteFunction } from "react-moralis"
import { abi, contractAddresses } from "../../contracts"

const AddElection = () => {
    const [sub, setSub] = useState(false)
    const dipatch = useNotification()
    const contractProcessor = useWeb3ExecuteFunction()

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

    async function add(title, description, stringCandidates, interval) {
        let candidates = stringCandidates.split(",")

        if (candidates.length < 4) {
            for (let i = 0; i <= 4 - candidates.length; i++) {
                candidates.push("")
            }
        }

        await contractProcessor.fetch({
            params: {
                abi: abi,
                contractAddress: contractAddresses[5][0],
                functionName: "addElection",
                params: {
                    interval: interval,
                    candidates: candidates,
                    title: title,
                    description: description,
                },
            },
            onSuccess: handleSuccess,
            onError: (error) => {
                alert(error)
                setSub(false)
            },
        })
    }

    return (
        <Form
            buttonConfig={{
                isLoading: sub,
                theme: "outline",
                text: "start",
            }}
            data={[
                {
                    name: "title",
                    type: "text",
                    value: "",
                    inputWidth: "100%",
                },
                {
                    name: "description",
                    type: "text",
                    value: "",
                    inputWidth: "100%",
                },
                {
                    name: "condidates",
                    type: "text",
                    value: "",
                    inputWidth: "100%",
                },
                {
                    name: "interval",
                    type: "text",
                    value: "",
                    inputWidth: "100%",
                },
            ]}
            onSubmit={(e) => {
                setSub(true)
                add(
                    e.data[0].inputResult,
                    e.data[1].inputResult,
                    e.data[2].inputResult,
                    e.data[3].inputResult
                )
            }}
            title="Add Election"
        />
    )
}

export default AddElection
