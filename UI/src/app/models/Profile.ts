import { Chiime } from "./Chiime";

export interface Profile{
  userName: string;
  bio: string;
  AvatarSelection: string;
  chiimeList: Chiime[];
  followers: string[];
}
