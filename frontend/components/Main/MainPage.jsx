import VoteFormHeader from "./VoteFormHeader"
import { useIsVoting } from "../../lib/useData"
import VoteForm from "./VoteForm"
import Result from "./Results"
import Exclamation from "../Layout/Exclamation"

export default function MainPage() {
    const voting = useIsVoting()

    return (
        <div className="m-10">
            <VoteFormHeader />
            {voting != 0 || undefined ? (
                <div>
                    <VoteForm time={voting} />
                </div>
            ) : (
                <div>
                    <Exclamation msg="There are currently no elections in progress" />
                </div>
            )}
            <br />
            <Result />
        </div>
    )
}
