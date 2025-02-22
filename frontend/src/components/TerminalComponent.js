import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { io } from "socket.io-client";
import "xterm/css/xterm.css";

function TerminalComponent() {
  const terminalRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    const term = new Terminal({ cursorBlink: true });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    // Connect to Flask WebSocket
    socket.current = io("http://127.0.0.1:5000");

    socket.current.on("connect", () => {
      socket.current.emit("start_terminal");
      term.writeln("[frontend] Connected to Flask Terminal!");
    });

    socket.current.on("terminal_output", (data) => {
      term.write(data);
    });

   term.onData((data) => {
      console.log("Sending input to server:", data); // Debugging line
      socket.current.emit("terminal_input", data);
    });
    return () => {
      socket.current.disconnect();
      term.dispose();
    };
  }, []);

  return <div ref={terminalRef} className="terminal"></div>;
}

export default TerminalComponent;
