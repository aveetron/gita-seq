import ThemeToggle from "./theme-toggle";

export default function Title({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between mb-8 pb-4 border-b border-foreground/10">
      <div className="flex-1"></div>
      <div className="flex-1 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">
          {title}
        </h1>
        <div className="w-16 h-0.5 bg-foreground mx-auto"></div>
      </div>
      <div className="flex-1 flex justify-end">
        <ThemeToggle />
      </div>
    </div>
  );
}