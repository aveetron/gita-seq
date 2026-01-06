"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DailyVerseDetailsInterface } from "../interface/common";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import data from "../../public/data/data.json";

// Type for raw data from JSON (can have either verseBanglaTranslation or translation)
type RawVerseData = {
  id: number;
  chapter: number;
  chapterName: string;
  verseNo: number;
  verse: string;
  verseBanglaTranslation?: string;
  translation?: string;
};

// find the verse by id from the data.json
const findVerseById = (id: number | null): DailyVerseDetailsInterface | null => {
  if (!id) return null;
  
  // find the verse by id from the data.json
  const verse = (data as unknown as RawVerseData[]).find((verse: RawVerseData) => verse.id === id);
  if (!verse) return null;
  
  // Convert to DailyVerseDetailsInterface format
  return {
    id: verse.id,
    chapter: verse.chapter,
    chapterName: verse.chapterName,
    verseNo: verse.verseNo,
    verse: verse.verse,
    verseBanglaTranslation: verse.verseBanglaTranslation,
    translation: verse.translation,
  };
}

export default function VerseCard({ dailyVerseDetails }: { dailyVerseDetails: DailyVerseDetailsInterface }) {
  // Initialize state with the verse from localStorage or default
  const getInitialVerse = (): DailyVerseDetailsInterface | null => {
    if (typeof window === 'undefined') return null;
    
    const lastReadVerseId = localStorage.getItem("lastReadVerseId");
    
    if (lastReadVerseId) {
      const verse = findVerseById(parseInt(lastReadVerseId));
      return verse;
    } else {
      // set last read verse id to 1 to the hook and local storage
      localStorage.setItem("lastReadVerseId", "1");
      const verse = findVerseById(1);
      return verse;
    }
  };
  
  const [lastReadVerse, setLastReadVerse] = useState<DailyVerseDetailsInterface | null>(getInitialVerse);

  // Use lastReadVerse if available, otherwise use dailyVerseDetails
  const displayVerse = lastReadVerse || dailyVerseDetails;
  const currentVerseId = displayVerse?.id || 1;
  const isFirstVerse = currentVerseId === 1;

  // Handle previous verse (আগে)
  const handlePrevious = () => {
    const previousId = currentVerseId - 1;
    if (previousId >= 1) {
      const verse = findVerseById(previousId);
      if (verse) {
        setLastReadVerse(verse);
        localStorage.setItem("lastReadVerseId", previousId.toString());
      }
    }
  };

  // Handle next verse (পরে)
  const handleNext = () => {
    const nextId = currentVerseId + 1;
    const verse = findVerseById(nextId);
    if (verse) {
      setLastReadVerse(verse);
      localStorage.setItem("lastReadVerseId", nextId.toString());
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className="border border-foreground/20 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="border-b border-foreground/10">
          <div className="flex flex-col gap-2">
            <CardTitle className="text-lg md:text-xl text-foreground">
              শ্লোক {displayVerse?.verseNo} • অধ্যায় {displayVerse?.chapter}
            </CardTitle>
            <CardAction className="text-sm md:text-base text-muted-foreground font-medium">
              {displayVerse?.chapterName}
            </CardAction>
          </div>
        </CardHeader>
        <CardContent className="pt-2 space-y-3">
          {/* Sanskrit Verse Section */}
          {/* <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-5 bg-foreground rounded-full"></div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                সংস্কৃত
              </h3>
            </div>
            <div className="pl-3">
              <p className="text-sm md:text-base leading-relaxed whitespace-pre-line font-medium text-foreground">
                {displayVerse?.verse}
              </p>
            </div>
          </div> */}

          {/* Translation Section */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-5 bg-foreground rounded-full"></div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                অনুবাদ
              </h3>
            </div>
            <div className="pl-3">
              <p className="text-sm md:text-base leading-relaxed font-semibold">
                {displayVerse?.verseBanglaTranslation || displayVerse?.translation}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-foreground/10 pt-3">
          <div className="flex w-full justify-between gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePrevious}
              disabled={isFirstVerse}
              className="flex-1 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-foreground/5 dark:hover:bg-foreground/10"
            >
              ← আগে
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNext}
              className="flex-1 font-medium hover:bg-foreground/5 dark:hover:bg-foreground/10"
            >
              পরে →
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}