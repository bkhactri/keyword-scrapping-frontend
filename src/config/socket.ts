import { Keyword } from "@interfaces/keyword.interface";
import { io, Socket } from "socket.io-client";
import appConfig from "@constants/appConfig";

class SocketIO {
  private socket: Socket | null = null;

  connect(userId: string, disconnectCallback: () => void) {
    this.socket = io(appConfig.apiEndpoint);

    this.socket.on("connect", () => {
      this.socket?.emit("identify", userId);
    });

    this.socket.on("disconnect", () => {
      disconnectCallback();
    });
  }

  onKeywordProcessed(callback: (data: Keyword) => void) {
    this.socket?.on("keyword-processed", callback);
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

export const socketIO = new SocketIO();
