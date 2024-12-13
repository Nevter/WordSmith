import Game from "@/components/Game";
import { HowToPlay } from "@/components/HowToPlay";

export default function Home() {
  return (
    <main className="container mx-auto px-4 pt-8 flex flex-col items-center gap-8 min-h-screen bg-background">
      <Game />
      <HowToPlay />
      <footer className="mt-auto py-2 text-center text-sm text-muted-foreground">
        Made with ❤️ by SolarBloom
      </footer>
    </main>
  );
}
