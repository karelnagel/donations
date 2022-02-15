export function Input({
  edit = true,
  value,
  className,
  isNumber = false,
  onChange,
  onClick,
  style,
  placeholder = "Edit this",
}: {
  edit?: boolean;
  value: number | string;
  className?: string | undefined;
  isNumber?: boolean;
  placeholder?: string;
  style?: React.CSSProperties | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onClick?: React.MouseEventHandler<HTMLParagraphElement> | undefined;
}) {
  if (edit)
    return (
      <input
        onChange={onChange}
        className={className}
        value={value}
        style={style}
        type={isNumber ? "number" : "text"}
        placeholder={placeholder}
      />
    );
  else
    return (
      <p className={className} onClick={onClick}>
        {value}
      </p>
    );
}
