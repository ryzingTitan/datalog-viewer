import { ChangeEvent, ReactElement } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import UploadActionSelectProps from "./UploadActionSelectProps";

export default function UploadActionSelect(
  uploadActionSelectProps: UploadActionSelectProps,
): ReactElement {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    uploadActionSelectProps.setUploadType(
      (event.target as HTMLInputElement).value,
    );
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={uploadActionSelectProps.uploadType}
        onChange={handleChange}
      >
        <FormControlLabel value="create" control={<Radio />} label="Create" />
        <FormControlLabel value="update" control={<Radio />} label="Update" />
      </RadioGroup>
    </FormControl>
  );
}
