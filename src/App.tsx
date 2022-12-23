import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import IntakeAirTemperatureGraph from './IntakeAirTemperatureGraph/IntakeAirTemperatureGraph';
import Datalog from './Session/Datalog';
import SessionService from './Session/SessionService';
import SessionMetadataSelect from './SessionMetadataSelect/SessionMetadataSelect'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [selectedSessionId, setSelectedSessionId] = React.useState('');
  const [datalogList, setDatalogList] = React.useState(Array<Datalog>())

  const setSessionId = (newSessionId: string) => {
    const getSessionById = async (sessionId: string) => {
      const sessionService = new SessionService()
      const response = await sessionService.getSessionById(sessionId)
      setDatalogList(response.data)
    }

    if (newSessionId !== selectedSessionId) {
      getSessionById(newSessionId)
    }

    setSelectedSessionId(newSessionId);
  };


  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <SessionMetadataSelect selectedSessionId={selectedSessionId} setSessionId={setSessionId}/>
        <IntakeAirTemperatureGraph datalogs={datalogList} />
      </ThemeProvider>
    </div>
  );
}

export default App;
