import { wordleLa } from "./wordle-La";

interface Position {
  position: number;
  letter: string;
}

interface args {
  location: Array<Position>;
  wrong: string;
  exact: Array<Position>;
}

export function filter({ location, wrong, exact }: args) {
  return filterWords(location, wrong.split(""), exact);
}

function filterWords(
  locationLetters: Array<Position>,
  wrong: Array<string>,
  exactLetters: Array<Position>
) {
  const wrongLetters = wrong
    .filter(
      (letter) => exactLetters.findIndex((e) => e.letter === letter) === -1
    )
    .filter(
      (letter) => locationLetters.findIndex((e) => e.letter === letter) === -1
    );

  const words = wordleLa.filter((word) => {
    for (let i = 0; i < wrongLetters.length; i++) {
      if (word.includes(wrongLetters[i])) return false;
    }
    for (let i = 0; i < locationLetters.length; i++) {
      if (!word.includes(locationLetters[i].letter)) return false;
      if (
        word.charAt(locationLetters[i].position) === locationLetters[i].letter
      )
        return false;
    }
    for (let i = 0; i < exactLetters.length; i++) {
      const l = exactLetters[i];

      if (word.charAt(l.position) !== l.letter) return false;
    }

    return true;
  });

  return words;
}
