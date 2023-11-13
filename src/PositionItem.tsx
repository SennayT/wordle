import { Position } from "./types/wordle";
import "./styles/positionItem.css";

interface Props {
  positionItem: Position;
  onPositionChange: (position: Position) => void;
  onDelete: (id: string) => void;
}

const PositionItem = ({ positionItem, onPositionChange, onDelete }: Props) => {
  const { id, letter, position } = positionItem;

  return (
    <div>
      <input
        className="position-input"
        size={1}
        value={letter}
        onChange={(e) =>
          onPositionChange({
            ...positionItem,
            letter: e.target.value.charAt(0),
          })
        }
      />
      <select
        value={position}
        onChange={(e) =>
          onPositionChange({
            ...positionItem,
            position: Number(e.target.value),
          })
        }
      >
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
      <button onClick={() => onDelete(id)}>x</button>
    </div>
  );
};

export default PositionItem;
