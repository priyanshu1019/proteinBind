"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";

import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/app/context/UserContext";

// Initialize the Ably client outside the component to avoid re-creation on every render
const ablyClient = new Ably.Realtime({
  key: "6emjiQ.uVTmvQ:QjhEbYFSTbKtmrviYCsJiBGAyZm9CI95qeZxnJ6vbxE",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <SessionProvider>
          <UserProvider>
            <AblyProvider client={ablyClient}>
              <ChannelProvider channelName="chat-demo1">
                <div className="font-poppins dark:bg-boxdark-2 dark:text-bodydark">
                  {loading ? <Loader /> : children}
                </div>
              </ChannelProvider>
            </AblyProvider>
          </UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
