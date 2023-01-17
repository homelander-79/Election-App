import { useState } from "react"
import { Form } from "@web3uikit/core"
import { useNotification } from "@web3uikit/core"
import { useWeb3ExecuteFunction } from "react-moralis"
import { abi, contractAddresses } from "../../contracts"

const AddCandidate = () => {
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

    async function add(candidateName, description, party) {
        contractProcessor.fetch({
            params: {
                abi: abi,
                contractAddress: contractAddresses[5][0],
                functionName: "addcandidate",
                params: {
                    candidateName: candidateName,
                    description: description,
                    party: party,
                },
            },
            onSuccess: handleSuccess,
            onError: (e) => {
                alert(e)
                setSub(false)
            },
        })
    }

    return (
        <Form
            buttonConfig={{
                isLoading: sub,
                loadingText: "adding",
                theme: "outline",
                text: "add",
            }}
            data={[
                {
                    name: "candidateName",
                    type: "text",
                    value: "",
                    inputWidth: "100%",
                },
                {
                    name: "party",
                    type: "text",
                    value: "",
                    inputWidth: "100%",
                },
                {
                    name: "description",
                    type: "textarea",
                    value: "",
                    inputWidth: "100%",
                },
            ]}
            onSubmit={(e) => {
                setSub(true)
                add(
                    e.data[0].inputResult,
                    e.data[2].inputResult,
                    e.data[1].inputResult
                )
            }}
            title="New condidate"
        />
    )
}

export default AddCandidate
