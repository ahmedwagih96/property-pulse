type Props = {
  name: string;
  title: string;
  min?: number;
  max?: number;
};

function NumberInput({ name, title, min = 1, max = 10 }: Props) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        name={name}
        min={min}
        max={max}
        required
        className="p-3 border border-gray-300 rounded-lg"
      />
      <p>{title}</p>
    </div>
  );
}

export default NumberInput;
