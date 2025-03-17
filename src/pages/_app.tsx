import { AppProps } from "next/app";
import { LoadScript } from "@react-google-maps/api";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import AppLayout from "@/components/AppLayout";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  if (typeof process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY !== "string") {
    throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY が設定されていません")
  }

  return (
    <SessionProvider>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        language="ja"
        region="JP"
        libraries={["maps"]}
        loadingElement={<GoogleMapsLoading />}
      >
        <Component {...pageProps} session={session} />
      </LoadScript>
    </SessionProvider>
  );
}

function GoogleMapsLoading() {
  return (
    <AppLayout>
      <div className="my-20 text-center">Loading...</div>
    </AppLayout>
  )
}

export default App;
