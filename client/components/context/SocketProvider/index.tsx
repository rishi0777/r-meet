import io, { Socket } from "socket.io-client";
import { createContext, useContext, useMemo } from "react";

const SocketContext = createContext<null | Socket<any, any>>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useMemo(() => io("localhost:8000"), []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = (): null | Socket<any, any> => {
  const socket = useContext(SocketContext);
  return socket;
};
