import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Router from "./Router/Router";
import { ReactElement } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App(): ReactElement {
  return (
    <GoogleOAuthProvider
      clientId={
        "272176763337-1b7jgk6dhvc01br9vih0hfcirvar31pa.apps.googleusercontent.com"
      }
    >
      <Box>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Router />
        </ThemeProvider>
      </Box>
    </GoogleOAuthProvider>
  );
}

export default App;
