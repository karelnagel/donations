export function Icon({ url, icon }: { url: string; icon: string }) {
  if (!url) return null;
    return (
      <a href={url}>
        <img src={`/icons/${icon}.png`} alt={icon} />
      </a>
    );
}
