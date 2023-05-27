import { Box } from "@mui/material";
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
    <Box>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </Box>
  );
}

export default App;
