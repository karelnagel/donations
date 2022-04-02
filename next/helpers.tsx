export function getProjectId(title: string, projectId: string | number) {
  return `${title}_p${projectId}`;
}

export function short(address: string | null | undefined) {
  if (!address) return "";
  return `${address.substr(0, 5)}...${address.substr(address.length - 5)}`;
}
