import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "@web3uikit/core"
import Header from "../components/Layout/Header"
import Footer from "../components/Layout/Footer"

export default function App({ Component, pageProps }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                <div className="relative text-[#0b72c4] font-sans  bg-[#f8f8ff]">
                    <Header />
                    <div className="overflow-auto mt-[5.5rem] min-h-[77.15vh]">
                        <Component {...pageProps} />
                    </div>

                    <Footer />
                </div>
            </NotificationProvider>
        </MoralisProvider>
    )
}
