import { ReactTerminal } from "react-terminal";

function Terminal(props) {
  // Define commands here
  const commands = {
    whoami: "",
    cd: (directory) => `changed path to ${directory}`,
    echo: (msg) => `${msg}`,
  };

  return (
    <ReactTerminal
      commands={commands}
      welcomeMessage={"Welcome to Squirrel Terminal!\n"}
      prompt="🐿️~"
      theme="light"
    />
  );
}

export default Terminal;
