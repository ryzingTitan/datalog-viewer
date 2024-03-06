import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Router from "./Router/Router";
import { ReactElement } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App(): ReactElement {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

export default App;
