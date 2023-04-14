import "@/styles/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";

function useIsRouterReady() {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsReady(router.isReady);
  }, [router.isReady]);

  return isReady;
}

export default function App({ Component, pageProps }: AppProps) {
  const isRouterReady = useIsRouterReady();

  return isRouterReady ? <Component {...pageProps} /> : null;
}
