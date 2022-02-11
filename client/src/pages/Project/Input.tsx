export function Input({
  edit=true,
  value,
  className,
  isNumber = false,
  onChange,
  onClick,
}: {
  edit?: boolean;
  value: number|string;
  className?: string | undefined;
  isNumber?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onClick?: React.MouseEventHandler<HTMLParagraphElement> | undefined;
}) {
  if (edit) return <input onChange={onChange} className={className} value={value} type={isNumber ? "number" : "text"} />;
  else return <p className={className} onClick={onClick}>{value}</p>;
}
