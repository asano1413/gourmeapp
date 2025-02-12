import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { AuthProvider } from '@/context/AuthContext';

function MyApp({ Component, pageProps }: any) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
