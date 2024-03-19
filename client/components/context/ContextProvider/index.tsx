"use client";
import { SocketProvider } from "components/context/SocketProvider";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <SocketProvider>{children}</SocketProvider>;
};

export default ContextProvider;
