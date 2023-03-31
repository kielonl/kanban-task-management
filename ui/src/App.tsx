import React, { useState } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { Root } from "./Views/Root";
import { Provider } from "react-redux";
import { rootStore } from "./store/store";
import "./App.css";
import ModalContextProvider from "./contexts/ModalContextProvider";
import { load } from "./services/StorageManager";

function App() {
  const themeStorage = load("theme") || "dark";
  const [theme, setTheme] = useState(themeStorage.theme);

  return (
    <Provider store={rootStore}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ModalContextProvider>
          <div className={theme}>
            <div className="App">
              <Root />
            </div>
          </div>
        </ModalContextProvider>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
