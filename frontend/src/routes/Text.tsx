import { useEffect } from "react";
import { QuoteType } from "../types";
import { useAtom } from "jotai";
import { quotesAtom } from "../atoms";

function Text() {
  const [quotes, setQuotes] = useAtom<QuoteType[]>(quotesAtom);

  useEffect(() => {
    async function fetchQuotes() {
      // atom saved to local storage so should work offline
      const response = await fetch("/api/quotes");
      const data = await response.json();
      setQuotes(data);
    }
    fetchQuotes();
  }, []);

  let combinedText = "";
  for (const quote of quotes) {
    combinedText += `${quote.quote}-- ${quote.author} (${quote.source})\n`;
  }

  return (
    <div className="w-full grow">
      <textarea className="w-full h-full gruv-bg-hard px-3 py-2 whitespace-pre focus:outline-none" value={combinedText} readOnly />
    </div>
  );
}

export default Text;
