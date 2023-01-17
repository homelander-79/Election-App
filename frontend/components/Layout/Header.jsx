import React from "react"
import Link from "next/link"
import { ConnectButton } from "@web3uikit/web3"

export default function Header() {
    return (
        <div className="flex justify-between items-center pl-3  pt-5 pb-7 bg-[#f0f8ff] font-bold fixed top-0 right-0 left-0 z-50">
            <Link href="/">Election App</Link>
            <nav>
                <ul className="flex  ml-5 items-center ">
                    <li></li>
                    <li>
                        <ConnectButton />
                    </li>
                </ul>
            </nav>
        </div>
    )
}
