import { ReactElement } from "react";
import { Typography } from "@mui/material";
import UploadReviewProps from "./UploadReviewProps";
import { useAuth0 } from "@auth0/auth0-react";

export default function UploadReview(
  uploadReviewProps: UploadReviewProps,
): ReactElement {
  const { user } = useAuth0();

  return uploadReviewProps.uploadAction === "create" ? (
    <>
      <Typography variant={"h5"} gutterBottom>
        Review Session Upload Data
      </Typography>
      <Typography>
        Upload Action: {uploadReviewProps.uploadAction.toUpperCase()}
      </Typography>
      <Typography>File Name: {uploadReviewProps.selectedFile?.name}</Typography>
      <Typography>
        Track Name: {uploadReviewProps.selectedTrack?.name}
      </Typography>
      <Typography>User Email: {user?.email}</Typography>
    </>
  ) : (
    <>
      <Typography variant={"h5"} gutterBottom>
        Review Session Upload Data
      </Typography>
      <Typography>
        Upload Action: {uploadReviewProps.uploadAction.toUpperCase()}
      </Typography>
      <Typography>Session Id: {uploadReviewProps.selectedSessionId}</Typography>
      <Typography>File Name: {uploadReviewProps.selectedFile?.name}</Typography>
      <Typography>
        Track Name: {uploadReviewProps.selectedTrack?.name}
      </Typography>
      <Typography>User Email: {user?.email}</Typography>
    </>
  );
}
