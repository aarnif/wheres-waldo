export interface Game {
  id: number;
  title: string;
  level: number;
  difficulty: "easy" | "medium" | "hard";
  image: string;
  width: number;
  height: number;
}

export interface Placeholder {
  id: number;
  isPlaceholder: true;
}

export type GameCardData = Game | Placeholder;

export interface User {
  id: number;
  username: string;
}

export interface DecodedToken {
  id: number;
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface InputField {
  name: string;
  type: string;
  value: string;
  placeholder: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export interface SignUpCredentials extends LoginCredentials {
  confirmPassword: string;
}

export interface Character {
  name: string;
  displayName: string;
  image: string;
}

export interface GameCharacter {
  id: number;
  character: Character;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GameDetails extends Game {
  description: string;
  characters: GameCharacter[];
}
