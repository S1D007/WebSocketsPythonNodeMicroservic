import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const nodeSocket = io(import.meta.env.VITE_NODE_LISTENER_URL, {
  transports: ["websocket"],
});

const App = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nodeSocket.on("connect", () => {
      console.log("connected");
    });

    nodeSocket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    if (input.trim() !== "") {
      nodeSocket.emit("py", input);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div>
      <h1>MicroService Websocket Project</h1>
      <div>
        <h3>Python WebSocket Emitter</h3>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h3>Node WebSocket Listener</h3>
        <ul>
          {messages.reverse().map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
