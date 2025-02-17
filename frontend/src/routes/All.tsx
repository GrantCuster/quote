import { useEffect } from "react";
import { QuoteType } from "../types";
import { useAtom } from "jotai";
import { quotesAtom } from "../atoms";

function All() {
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

  return (
    <div
      className="w-full grow grid gruv-bg-hard overflow-auto"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      {quotes.map((quote) => {
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
          <div key={quote.id} className="gruv-bg px-4 py-2">
            <div className="gruv-gray">{quote.id}</div>
            <div>&nbsp;</div>
            <div className="">{quote.quote}</div>
            <div>&nbsp;</div>
            <div className="gruv-green">{quote.author}</div>
            <div className="gruv-blue">{sourceFormatted}</div>
            <div>&nbsp;</div>
          </div>
        );
      })}
    </div>
  );
}

export default All;
