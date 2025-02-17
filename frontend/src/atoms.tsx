import { atomWithStorage } from "jotai/utils";
import { QuoteType } from "./types";

export const quotesAtom = atomWithStorage<QuoteType[]>("quotes", []);
