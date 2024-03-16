import io from "socket.io-client";
import { createContext, useContext, useMemo } from "react";

const SocketContext = createContext<null | { socket: any }>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useMemo(() => io("localhost:8000"), []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): any => {
  const socket = useContext(SocketContext);
  return socket;
};
