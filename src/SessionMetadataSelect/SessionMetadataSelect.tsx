import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";
import { ReactElement, useEffect, useState } from "react";
import SessionMetadata from "./SessionMetadata";
import SessionMetadataSelectProps from "./SessionMetadataSelectProps";
import { compareAsc, format, parseISO } from "date-fns";
import SessionMetadataService from "./SessionMetadataService";
import { useLocation, useNavigate } from "react-router-dom";

function sortByStartDateTimeAsc(
  firstSessionMetadata: SessionMetadata,
  secondSessionMetadata: SessionMetadata,
): number {
  const firstDate = parseISO(firstSessionMetadata.startTime);
  const secondDate = parseISO(secondSessionMetadata.startTime);

  return compareAsc(firstDate, secondDate);
}

const formatDateTime = (dateTime: string): string => {
  const date = parseISO(dateTime);
  return format(date, "MM-dd-yyyy h:mm a");
};

export default function SessionMetadataSelect(
  sessionMetadataSelectProps: SessionMetadataSelectProps,
): ReactElement {
  const navigate = useNavigate();
  const location = useLocation();

  const [sessionMetadataList, setSessionMetadataList] = useState(
    Array<SessionMetadata>(),
  );

  useEffect(
    function () {
      const getAllSessionMetadata = async () => {
        const sessionMetadataService = new SessionMetadataService();
        const response = await sessionMetadataService.getAllSessionMetadata(
          sessionMetadataSelectProps.email,
        );
        setSessionMetadataList([...response.data].sort(sortByStartDateTimeAsc));
      };

      getAllSessionMetadata();
    },
    [sessionMetadataSelectProps.email],
  );

  const handleChange = (event: SelectChangeEvent) => {
    sessionMetadataSelectProps.setSessionId(event.target.value);

    if (location.pathname === "/") {
      navigate(`/sessions/${event.target.value}/summary`);
    } else {
      const currentRoute = location.pathname.split("/").at(3);
      navigate(`/sessions/${event.target.value}/${currentRoute}`);
    }
  };

  return (
    <Box margin={2} textAlign="center">
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel
          data-cy="sessionMetadataSelectLabel"
          id="session-metadata-select-label"
        >
          Session List
        </InputLabel>
        <Select
          labelId="session-metadata-select-label"
          id="session-metadata-select"
          value={sessionMetadataSelectProps.selectedSessionId}
          label="Session List"
          onChange={handleChange}
          autoWidth
          data-cy="sessionMetadataSelect"
        >
          {sessionMetadataList.map((sessionMetadata: SessionMetadata) => {
            return (
              <MenuItem
                key={sessionMetadata.sessionId}
                value={sessionMetadata.sessionId}
              >
                {formatDateTime(sessionMetadata.startTime)} -{" "}
                {formatDateTime(sessionMetadata.endTime)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
