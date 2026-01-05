export interface DailyVerseDetailsInterface {
  id: number;
  chapter: number;
  chapterName: string;
  verseNo: number;
  verse: string;
  verseBanglaTranslation?: string;
  translation?: string;
}