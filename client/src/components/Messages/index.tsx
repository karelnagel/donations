import { useEffect } from "react";
import { Message } from "../../consts/interfaces";
import styles from "./styles.module.css";

export function Messages({ messages, setMessages }: { messages: Message[]; setMessages: React.Dispatch<React.SetStateAction<Message[]>> }) {
  const removeMessage = (index: number) => {
    console.log("asd")
    setMessages((m) => [...m.filter((mes,i)=>i!==index)]);
  };
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
        <div key={i} className={styles.message} onClick={() => removeMessage(i)}>
          {message.message}
        </div>
      ))}
    </div>
  );
}
