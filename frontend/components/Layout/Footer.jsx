import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faInstagram,
    faTelegram,
    faTwitter,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons"
import styles from "../../styles/App.module.css"

export default function Footer() {
    return (
        <div
            className={`flex justify-between items-center  p-7  bg-gradient-to-r from-cyan-500 to-blue-500 `}
        >
            <h5 className=" ">copyright © 2022 all rights reserved .</h5>
            <div className={` flex `} id="about">
                <a href="https://www.linkedin.com/in/mostafa-ahmadi-5bb331207?lipi=urn%3Ali%3Apage%3Aprofile_edit_contact_info%3B9bce2dc7-3716-4507-9913-4f8059733013">
                    <FontAwesomeIcon
                        icon={faLinkedin}
                        className={styles.icons}
                    />
                </a>
                <a href="https://www.instagram.com/mostafa__ahmadi">
                    {" "}
                    <FontAwesomeIcon
                        icon={faInstagram}
                        className={styles.icons}
                    />
                </a>
                <a href="https://t.me/Mustafahmadi">
                    {" "}
                    <FontAwesomeIcon
                        icon={faTelegram}
                        className={styles.icons}
                    />
                </a>
                <a href="https://twitter.com/__moah__">
                    <FontAwesomeIcon
                        icon={faTwitter}
                        className={styles.icons}
                    />
                </a>
            </div>
        </div>
    )
}
