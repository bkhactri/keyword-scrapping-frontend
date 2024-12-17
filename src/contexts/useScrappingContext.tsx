import { createContext, useMemo, useState, useContext } from "react";
import { io, Socket } from "socket.io-client";
import appConfig from "@constants/appConfig";

interface ScrappingContextType {
  socket: Socket | null;
  isScrapping: boolean;
  setIsScrapping: (isScrapping: boolean) => void;
  processingKeywords: string[];
  setProcessingKeywords: (keywords: string[]) => void;
}

const ScrappingContext = createContext<ScrappingContextType>({
  socket: null,
  setIsScrapping: () => {},
  isScrapping: false,
  processingKeywords: [],
  setProcessingKeywords: () => {},
});

export const ScrappingProvider = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(
    io(appConfig.apiEndpoint)
  );
  const [isScrapping, setIsScrapping] = useState<boolean>(false);
  const [processingKeywords, setProcessingKeywords] = useState<string[]>([]);

  const contextValue = useMemo(
    () => ({
      socket,
      setSocket,
      setIsScrapping,
      isScrapping,
      setProcessingKeywords,
      processingKeywords,
    }),
    [socket, isScrapping, processingKeywords]
  );

  return (
    <ScrappingContext.Provider value={contextValue}>
      {children}
    </ScrappingContext.Provider>
  );
};

export const useScrapping = () => {
  return useContext(ScrappingContext);
};
