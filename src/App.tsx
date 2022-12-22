import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SessionMetadataSelect from './SessionMetadataSelect/SessionMetadataSelect'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <SessionMetadataSelect />
      </ThemeProvider>
    </div>
  );
}

export default App;
