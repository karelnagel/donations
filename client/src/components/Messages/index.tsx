import { useEffect } from "react";
import { Message } from "../../consts/interfaces";
import styles from "./styles.module.css";

export function Messages({ messages, setMessages }: { messages: Message[]; setMessages: React.Dispatch<React.SetStateAction<Message[]>> }) {
  useEffect(() => {
    messages.forEach((message) => {
      if (message.time) {
        setTimeout(function () {
          setMessages(messages.filter((m) => m.type !== message.type));
        }, message.time * 1000);
      }
    });
  }, [messages, setMessages]);
  return (
    <div className={styles.messages}>
      {messages.map((message, i) => (
        <div key={i} className={`message message-${message.type}`}>
          {message.message}
        </div>
      ))}
    </div>
  );
}
