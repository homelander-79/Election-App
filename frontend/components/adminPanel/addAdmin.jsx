import { useState } from "react"
import { Form } from "@web3uikit/core"
import { useNotification } from "@web3uikit/core"
import { useWeb3ExecuteFunction } from "react-moralis"
import { abi, contractAddresses } from "../../contracts"

const AddAdmin = () => {
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
            position: "topR",
            icon: "bell",
        })
    }

    async function add(addr) {
        await contractProcessor.fetch({
            params: {
                abi: abi,
                contractAddress: contractAddresses[5][0],
                functionName: "addAdmin",
                params: { addr: addr },
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
                loadingText: "adding",
                theme: "outline",
                text: "add",
            }}
            data={[
                {
                    name: "address",
                    type: "text",
                    value: "",
                    inputWidth: "100%",
                },
            ]}
            onSubmit={(e) => {
                setSub(true)
                add(e.data[0].inputResult)
            }}
            title="add Admin"
        />
    )
}

export default AddAdmin
