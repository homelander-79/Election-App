import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import styles from "../../styles/App.module.css"

const Exclamation = ({ msg }) => {
    return (
        <div className="h-[76vh] flex flex-col justify-center items-center">
            <FontAwesomeIcon
                icon={faCircleExclamation}
                className={styles.Exclamation}
            />
            <p className="pt-3">{msg}</p>
        </div>
    )
}

export default Exclamation
