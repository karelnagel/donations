import { Input } from "./Input";

export function Icon({
  url,
  icon,
  edit,
  onChange,
}: {
  url?: string;
  icon: string;
  edit: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}) {
  if (edit)
    return (
      <div>
        <a href={url}>
          <img src={`/icons/${icon}.png`} alt={icon} />
        </a>
        {edit && <Input value={url!} onChange={onChange} />}
      </div>
    );
  else if (!url) return null;
  return (
    <a href={url}>
      <img src={`/icons/${icon}.png`} alt={icon} />
    </a>
  );
}
