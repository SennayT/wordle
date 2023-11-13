import { useAtom } from "jotai";
import { useState } from "react";
import { nanoid } from "nanoid";

import { filter } from "./logic/solver";

import {
  exactLetterAtom,
  locationLetterAtom,
  wrongLetterAtom,
} from "./atoms/wordle";
import { Position } from "./types/wordle";
import PositionItem from "./PositionItem";

// const responseSchema = z.object({
//   words: z.array(z.string()),
// });

interface Args {
  location: Array<Position>;
  wrong: string;
  exact: Array<Position>;
}

const getResults = async (args: Args) => {
  console.log(args.exact);
  try {
    // const res = await axios.post("http://localhost:8000", {
    //   ...args,
    // });
    const res = filter({
      ...args,
    });
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return [];
  }
};

function App() {
  const [words, setWords] = useState<string[]>([]);
  const [wrong, setWrong] = useAtom(wrongLetterAtom);
  const [exact] = useAtom(exactLetterAtom);
  const [location] = useAtom(locationLetterAtom);
  const onGetResults = async () => {
    const results = await getResults({
      wrong,
      exact: exact.filter((e) => e.letter !== ""),
      location,
    });
    setWords(results);
  };
  return (
    <div>
      <input value={wrong} onChange={(e) => setWrong(e.target.value)} />
      <Location />
      <Exact />
      <button onClick={() => onGetResults()}>get data</button>
      {words.map((word, index) => (
        <p key={index}>{word}</p>
      ))}
    </div>
  );
}

function Location() {
  const [location, setLocation] = useAtom(locationLetterAtom);
  const addNewLocation = () => {
    setLocation((old) => {
      return [
        ...old,
        {
          letter: "",
          position: 0,
          id: nanoid(),
        },
      ];
    });
  };

  return (
    <div>
      <p>Location</p>
      <button onClick={() => addNewLocation()}>Add</button>
      {location.map((l, index) => (
        <PositionItem
          key={index}
          positionItem={l}
          onPositionChange={(newPosition) => {
            setLocation((old) => {
              return old.map((item) => {
                if (item.id === newPosition.id) {
                  return {
                    ...newPosition,
                  };
                }
                return item;
              });
            });
          }}
          onDelete={(id) => {
            setLocation((data) => data.filter((pos) => pos.id !== id));
          }}
        />
      ))}
    </div>
  );
}

function Exact() {
  const [location, setLocation] = useAtom(exactLetterAtom);

  return (
    <div>
      <p>Exact</p>
      {location.map((l) => (
        <input
          size={1}
          key={l.id}
          value={l.letter}
          onChange={(e) => {
            setLocation((old) => {
              return old.map((item) => {
                if (item.id === l.id) {
                  return {
                    ...item,
                    letter: e.target.value,
                  };
                }
                return item;
              });
            });
          }}
        />
      ))}
    </div>
  );
}

export default App;
