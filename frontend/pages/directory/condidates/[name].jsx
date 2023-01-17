import React from "react"
import { useRouter } from "next/router"
import { useGetCondidate } from "../../../lib/useData"
import Exclamation from "../../../components/Layout/Exclamation"
import CondidateForm from "../../../components/condidate/Condidate"

const Candidate = () => {
    const router = useRouter()
    const queryName = router.query.name
    const data = useGetCondidate(queryName)

    return data[0] != 0 ? (
        <CondidateForm condidate={data[0]} electionNumber={data[1]} />
    ) : (
        <Exclamation msg="Condidate Not Found" />
    )
}
export default Candidate
