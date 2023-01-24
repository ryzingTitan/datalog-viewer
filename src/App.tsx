import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Session from "./Session/Session";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Session></Session>
      </ThemeProvider>
    </div>
  );
}

export default App;
