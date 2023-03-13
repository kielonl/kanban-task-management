import { useState } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { Main } from "./Views/Main";
import "./App.scss";
import { Provider } from "react-redux";
import { rootStore } from "./store/store";

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <Provider store={rootStore}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`theme-${theme}`}>
          <div className="App">
            <Main />
          </div>
        </div>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
