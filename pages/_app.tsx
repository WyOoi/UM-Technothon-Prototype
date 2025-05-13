import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Add debug logging for route changes
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log('App is changing to route:', url);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    
    // Clean up the event listener
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return <Component {...pageProps} />;
}
