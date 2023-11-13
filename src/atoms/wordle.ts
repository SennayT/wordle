import { atom } from "jotai";
import { nanoid } from "nanoid";
import { Position } from "../types/wordle";

export const wrongLetterAtom = atom("");

export const exactLetterAtom = atom<Position[]>([
  { position: 0, letter: "", id: nanoid() },
  { position: 1, letter: "", id: nanoid() },
  { position: 2, letter: "", id: nanoid() },
  { position: 3, letter: "", id: nanoid() },
  { position: 4, letter: "", id: nanoid() },
]);

export const locationLetterAtom = atom<Position[]>([]);
