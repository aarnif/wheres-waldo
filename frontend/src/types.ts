export interface Game {
  id: number;
  title: string;
  level: number;
  difficulty: "easy" | "medium" | "hard";
  image: string;
  width: number;
  height: number;
}
