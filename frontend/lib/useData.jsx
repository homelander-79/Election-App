import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../contracts"

export function useGetCondidate(queryName) {
    const { isWeb3Enabled } = useMoralis()
    const [condidate, setCondidate] = useState(0)
    const [electionNumber, setElectionNumber] = useState()

    const { runContractFunction: getcandidate } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddresses[5][0],
        functionName: "getcandidate",
        params: { name: queryName },
    })

    const { runContractFunction: getElectionsCount } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddresses[5][0],
        functionName: "getElectionsCount",
        params: {},
    })

    async function updateUIValues() {
        const getElectionsCountFromCall = await getElectionsCount()
        const getCondidatesFormCall = await getcandidate()
        setCondidate(getCondidatesFormCall)
        setElectionNumber(getElectionsCountFromCall)
        if (!getCondidatesFormCall) {
            setCondidate(0)
        }
    }

    useEffect(() => {
        updateUIValues()
    }, [isWeb3Enabled, queryName])

    return [condidate, electionNumber]
}

export function useIsVoting() {
    const { isWeb3Enabled } = useMoralis()
    const [isVoting, setVoting] = useState()

    const { runContractFunction: getReminingTime } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddresses[5][0],
        functionName: "getReminingTime",
        params: {},
    })

    async function isOpen() {
        const getReminingTimeFromCall = await getReminingTime()

        if (!getReminingTimeFromCall) {
            setVoting(NaN)
        }
        setVoting(getReminingTimeFromCall)
        console.log(`getReminingTime:${getReminingTimeFromCall}`)
    }

    useEffect(() => {
        isOpen()
    }, [isWeb3Enabled])

    return isVoting
}

export function useIsUserExist() {
    const [exist, setExist] = useState()
    const { isWeb3Enabled, account } = useMoralis()
    const { runContractFunction: isUserExist } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddresses[5][0],
        functionName: "isUserExist",
        params: { addr: account },
    })

    async function isExist() {
        const isUserExistFromCall = await isUserExist()
        if (!isUserExistFromCall) setExist(undefined)
        else setExist(1)
    }

    useEffect(() => {
        isExist()
    }, [isWeb3Enabled])

    return exist
}
