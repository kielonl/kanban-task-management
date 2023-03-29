import React, { useState } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { Root } from "./Views/Root";
import { Provider } from "react-redux";
import { rootStore } from "./store/store";
import "./App.css";
import ModalContextProvider from "./contexts/ModalContetProvider";

function App() {
  const [theme, setTheme] = useState("light");

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
