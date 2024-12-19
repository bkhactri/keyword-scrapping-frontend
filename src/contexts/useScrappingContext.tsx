import { createContext, useMemo, useState, useContext } from "react";

interface ScrappingContextType {
  isScrapping: boolean;
  setIsScrapping: (isScrapping: boolean) => void;
  processingKeywords: string[];
  setProcessingKeywords: (keywords: string[]) => void;
}

const ScrappingContext = createContext<ScrappingContextType>({
  setIsScrapping: () => {},
  isScrapping: false,
  processingKeywords: [],
  setProcessingKeywords: () => {},
});

export const ScrappingProvider = ({ children }) => {
  const [isScrapping, setIsScrapping] = useState<boolean>(false);
  const [processingKeywords, setProcessingKeywords] = useState<string[]>([]);

  const contextValue = useMemo(
    () => ({
      setIsScrapping,
      isScrapping,
      setProcessingKeywords,
      processingKeywords,
    }),
    [isScrapping, processingKeywords]
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
