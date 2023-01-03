import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactElement, useEffect } from "react";
import SessionMetadata from "./SessionMetadata";
import SessionMetadataSelectProps from "./SessionMetadataSelectProps";
import SessionMetadataService from "./SessionMetadataService";

export default function SessionMetadataSelect(
  sessionMetadataSelectProps: SessionMetadataSelectProps
): ReactElement {
  const [sessionMetadataList, setSessionMetadataList] = React.useState(
    Array<SessionMetadata>()
  );
  const sessionMetadataService = new SessionMetadataService();

  useEffect(() => {
    const getAllSessionMetadata = async () => {
      const response = await sessionMetadataService.getAllSessionMetadata();
      setSessionMetadataList(response.data);
    };

    if (sessionMetadataList.length === 0) {
      getAllSessionMetadata();
    }
  });

  const handleChange = (event: SelectChangeEvent) => {
    sessionMetadataSelectProps.setSessionId(event.target.value);
  };

  return (
    <Box margin={2} textAlign="center">
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="session-metadata-select-label">Session Id</InputLabel>
        <Select
          labelId="session-metadata-select-label"
          id="session-metadata-select"
          value={sessionMetadataSelectProps.selectedSessionId}
          label="SessionId"
          onChange={handleChange}
          autoWidth
        >
          {sessionMetadataList.map((sessionMetadata: SessionMetadata) => {
            return (
              <MenuItem
                key={sessionMetadata.sessionId}
                value={sessionMetadata.sessionId}
              >
                {sessionMetadata.sessionId}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
