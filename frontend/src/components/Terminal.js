import { ReactTerminal } from "react-terminal";

function Terminal(props) {
  // Define commands here
  const commands = {
    whoami: "student",
    cd: (directory) => `changed path to ${directory}`,
    echo: (msg) => `${msg}`,
    ls: () => `cs240 cs250 cs251`,
    usage: () => 'ls,  echo <msg>,   cd <dir>,   clear'
  };

  return (
    <ReactTerminal
      commands={commands}
      welcomeMessage={`Welcome to AcornShell ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n`}
      prompt="🐿️~"
      themes={{
        "custom-theme": {
          themeBGColor: "#d9dec8",
          themeToolbarColor: "#263a38",
          themeColor: "#11544a",
          themePromptColor: "#11544a"
        }
      }}
      theme="custom-theme"
    />
  );
}

export default Terminal;
