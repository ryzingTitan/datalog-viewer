import { ChangeEvent, ReactElement } from "react";
import {
  Box,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import UploadDataSelectProps from "./UploadDataSelectProps";
import SessionMetadata from "../SessionMetadataSelect/SessionMetadata";
import { compareAsc, format, parseISO } from "date-fns";

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

export default function UploadDataSelect(
  uploadDataSelectProps: UploadDataSelectProps,
): ReactElement {
  const handleSessionChange = (event: SelectChangeEvent) => {
    uploadDataSelectProps.setSelectedSessionId(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent) => {
    const htmlInputElement = event.target as HTMLInputElement;
    uploadDataSelectProps.setSelectedFile(htmlInputElement.files?.item(0));
  };

  return uploadDataSelectProps.uploadType === "create" ? (
    <Input type="file" onChange={handleFileChange} />
  ) : (
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
          value={uploadDataSelectProps.selectedSessionId}
          label="Session List"
          onChange={handleSessionChange}
          autoWidth
          data-cy="sessionMetadataSelect"
        >
          {uploadDataSelectProps.sessionMetadataList
            .sort(sortByStartDateTimeAsc)
            .map((sessionMetadata: SessionMetadata) => {
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
      <Input type="file" onChange={handleFileChange} />
    </Box>
  );
}
