import { useEffect, useRef, useState } from "react";
import { QuoteType } from "../types";
import { useAtom } from "jotai";
import { quotesAtom } from "../atoms";

function Index() {
  const [quotes, setQuotes] = useAtom<QuoteType[]>(quotesAtom);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    async function fetchQuotes() {
      // atom saved to local storage so should work offline
      const response = await fetch("/api/quotes");
      const data = await response.json();
      setQuotes(data);
    }
    fetchQuotes();
  }, []);

  const runOnceQuotesRef = useRef(false);
  useEffect(() => {
    if (quotes.length > 0 && !runOnceQuotesRef.current) {
      setActiveIndex(Math.floor(Math.random() * quotes.length));
      runOnceQuotesRef.current = true;
    }
  }, [quotes]);

  const quote = quotes[activeIndex ?? 0];
  if (!quote) return null;

  const sourceFormatted: JSX.Element | string = quote.source.includes(
    "http",
  ) ? (
    <a
      href={quote.source}
      target="_blank"
      rel="noreferrer"
      className="underline"
    >
      {new URL(quote.source).hostname.replace("www.", "")}
    </a>
  ) : (
    quote.source
  );

  return (
    <div key={quote.id} className="w-full max-w-[600px]">
      <div className="">{quote.quote}</div>
      <div>&nbsp;</div>
      <div className="gruv-green">{quote.author}</div>
      <div className="gruv-blue">{sourceFormatted}</div>
    </div>
  );
}

export default Index;
