"use client";

import { useCallback, useEffect, useState } from "react";
import { Text } from "@rms-forge/ui-text";
import { useSocket } from "components/context/SocketProvider";
import { Button } from "@rms-forge/ui-button";
import ReactPlayer from "react-player";

export type UserJoined = {
  socketId: string;
  email: string;
};

const RMeet = ({ meetId }: { meetId: string }) => {
  const socket = useSocket();
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);

  const handleUserJoined = useCallback((data: UserJoined) => {
    setRemoteSocketId(data.socketId);
  }, []);

  const handleCallConnectedUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    setMyStream(stream);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("user:joined", handleUserJoined);

      return () => {
        socket.off("user:joined", handleUserJoined);
      };
    }
  }, [socket, handleUserJoined]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Text color="black100">
        {remoteSocketId ? "Connected" : "No one in room"}
      </Text>

      {remoteSocketId && (
        <Button size="medium" onClick={handleCallConnectedUser}>
          Call
        </Button>
      )}

      {myStream && (
        <ReactPlayer playing muted height={300} width={500} url={myStream} />
      )}
    </main>
  );
};

export { RMeet };
