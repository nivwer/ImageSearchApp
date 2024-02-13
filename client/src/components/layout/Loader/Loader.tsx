"use client";

import Spinner from "@/components/Spinner/Spinner";
import { useEffect, useState } from "react";
import Background from "../Background/Background";

function Loader() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isStartingServer, setIsStartingServer] = useState<boolean>(false);

  useEffect(() => {
    const BACKEND_URL =process.env.NEXT_PUBLIC_BACKEND_URL;

    const checkServerStatusWithRetry = async () => {
      try {
        const { signal: AbortSignal } = new AbortController();
        const res = await fetch(`${BACKEND_URL}/server/api/v1/health-check/`, {
          signal: AbortSignal,
          cache: "no-store",
        });

        if (res.ok) {
          setIsLoading(true);
          clearInterval(checkInterval);
          setTimeout(() => {
            setIsHidden(true);
          }, 1400);
        }
        setIsStartingServer(false);
      } catch (error) {
        setIsStartingServer(true);
        console.error("Error checking server status:", error);
      }
    };

    const checkInterval = setInterval(checkServerStatusWithRetry, 5000);
  }, []);

  const opacity = isLoading ? " opacity-0" : "";
  const hiddenClass = isHidden ? "hidden" : "";

  return (
    <div className={`z-50  ${hiddenClass}`}>
      <Background className="z-10" />
      <div className={`transition-opacity delay-700 duration-700 ease-in-out ${opacity}`}>
        <div className="w-screen h-screen z-20 fixed bg-white/30">
          <div
            className={`transition-opacity delay-100 duration-500 ease-in-out ${opacity}`}
          >
            <div className="w-screen h-screen grow-0 flex flex-col justify-center items-center text-xl">
              {isStartingServer ? "Starting the server..." : "Loading..."}
              <div className="p-2">
                <Spinner />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
