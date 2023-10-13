type Props = { title: string, name: string };

function Checkbox({ title, name }: Props) {
  return (
    <div className="flex gap-2">
      <input type="checkbox" name= {name} className="w-5" />
      <span>{title}</span>
    </div>
  );
}

export default Checkbox;
