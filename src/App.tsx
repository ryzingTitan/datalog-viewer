import { Box } from "@mui/material";
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
    <Box>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Session></Session>
      </ThemeProvider>
    </Box>
  );
}

export default App;
