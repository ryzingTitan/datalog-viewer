import { ReactElement, ReactNode, useState } from "react";
import {
  Step,
  StepLabel,
  Stepper,
  Box,
  StepContent,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import UploadActionSelect from "../UploadActionSelect/UploadActionSelect";
import { useAuth0 } from "@auth0/auth0-react";
import Track from "../TrackEditor/Track";
import { useLoaderData } from "react-router-dom";
import UploadTrackSelect from "../UploadTrackSelect/UploadTrackSelect";
import UploadDataSelect from "../UploadDataSelect/UploadDataSelect";
import SessionUploadData from "./SessionUploadData";
import SessionService from "../Session/SessionService";

const sessionService = new SessionService();

export default function SessionUpload(): ReactElement {
  const sessionUploadData = useLoaderData() as SessionUploadData;
  const [activeStep, setActiveStep] = useState(0);
  const [uploadType, setUploadType] = useState("create");
  const [selectedTrack, setSelectedTrack] = useState<Track>();
  const [selectedSessionId, setSelectedSessionId] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File>();
  const { user, getAccessTokenSilently } = useAuth0();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleUpload = async () => {
    const accessToken = await getAccessTokenSilently();

    if (uploadType === "update") {
      await sessionService.updateSession(
        selectedSessionId!!,
        selectedTrack!!,
        user!!,
        selectedFile!!,
        accessToken,
      );
    } else {
      await sessionService.createSession(
        selectedTrack!!,
        user!!,
        selectedFile!!,
        accessToken,
      );
    }
  };

  const steps = [
    {
      label: "Select Upload Action",
      content: (
        <>
          <UploadActionSelect
            uploadType={uploadType}
            setUploadType={setUploadType}
          />
          <Stack direction="row">
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 1, mr: 1 }}
            >
              Continue
            </Button>
          </Stack>
        </>
      ),
    },
    {
      label: "Select Data",
      content: (
        <>
          <UploadDataSelect
            uploadType={uploadType}
            sessionMetadataList={sessionUploadData.sessionMetadataList}
            selectedSessionId={selectedSessionId ?? ""}
            setSelectedSessionId={setSelectedSessionId}
            setSelectedFile={setSelectedFile}
          />
          <Stack direction="row">
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 1, mr: 1 }}
            >
              Continue
            </Button>
            <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
              Back
            </Button>
          </Stack>
        </>
      ),
    },
    {
      label: "Select Track",
      content: (
        <>
          <UploadTrackSelect
            tracks={sessionUploadData.tracks}
            selectedTrack={selectedTrack}
            setSelectedTrack={setSelectedTrack}
          />
          <Stack direction="row">
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 1, mr: 1 }}
            >
              Continue
            </Button>
            <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
              Back
            </Button>
          </Stack>
        </>
      ),
    },
    {
      label: "Upload Session",
      content: (
        <Stack>
          <Typography>Upload Type: {uploadType.toUpperCase()}</Typography>
          <Typography>
            Session Id: {selectedSessionId ?? "New Session"}
          </Typography>
          <Typography>File Name: {selectedFile?.name}</Typography>
          <Typography>Track Name: {selectedTrack?.name}</Typography>
          <Typography>User Email: {user?.email}</Typography>
          <Stack direction="row">
            <Button
              variant="contained"
              onClick={handleUpload}
              sx={{ mt: 1, mr: 1 }}
            >
              Upload
            </Button>
            <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
              Back
            </Button>
          </Stack>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: "50%" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: ReactNode;
          } = {};
          return (
            <Step key={step.label} {...stepProps}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
              <StepContent>{step.content}</StepContent>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
