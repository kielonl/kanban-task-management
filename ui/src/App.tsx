import { useState } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { Main } from "./Views/Main";
import "./App.scss";

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        <div className="App">
          <Main />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
