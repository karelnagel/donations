export function getProjectId(title: string, projectId: string | number) {
  return `${title}_p${projectId}`;
}
export function getTokenId(title: string, tokenId: string | number) {
  return `${title}_t${tokenId}`;
}

export function short(address: string | null | undefined) {
  if (!address) return "";
  return `${address.substr(0, 5)}...${address.substr(address.length - 5)}`;
}

export function getProjectImage(title: string, projectId: string) {
  return `https://ethdon.xyz/api/images/${title}/${projectId}`;
}
