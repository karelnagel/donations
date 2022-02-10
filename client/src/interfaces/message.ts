export interface Message {
  message: string;
  type: MessageType;
  time?: number;
}
export enum MessageType {
  network,
  donation,
  error,
  success,
  else,
}
