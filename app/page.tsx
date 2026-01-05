import Title from "./components/title";
import VerseCard from "./components/verse";
import { DailyVerseDetailsInterface } from "./interface/common";

export default function Home() {
  const dailyVerseDetails: DailyVerseDetailsInterface = {
    id: 1,
    chapter: 1,
    chapterName: "অর্জুন বিষাদ যোগ",
    verseNo: 1,
    verse: "ধৃতরাষ্ট্র উবাচ\nধর্মক্ষেত্রে কুরুক্ষেত্রে সমবেতা যুযুৎসবঃ ।\nমামকাঃ পাণ্ডবাশ্চৈব কিমকুর্বত সঞ্জয় ॥১॥\nধর্মক্ষেত্রে, কুরুক্ষেত্রে, সমবেতাঃ, যুযুৎসবঃ,\nমামকাঃ, পাণ্ডবাঃ, চ, এব, কিম্, অকুর্বত, সঞ্জয় ॥১॥\n",
    verseBanglaTranslation: "ধৃতরাষ্ট্র জিজ্ঞাসা করলেন-\nহে সঞ্জয় ! ধর্মক্ষেত্রে যুদ্ধ করার মানসে সমবেত হয়ে আমার পুত্র এবং পান্ডুর পুত্রেরা তারপর কি করল ?\nশ্লোকের তাৎপর্য ও পাঠকের মতামত\n"
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-6 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <Title title="শ্রীমদ্ভগবতগীতা প্রতিদিন" />
        <div className="w-full">
          <VerseCard dailyVerseDetails={dailyVerseDetails} />
        </div>
      </div>
    </div>
  );
}