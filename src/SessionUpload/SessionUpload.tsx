import { ReactElement, ReactNode, SyntheticEvent, useState } from "react";
import {
  Step,
  StepLabel,
  Stepper,
  Box,
  StepContent,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import UploadActionSelect from "../UploadActionSelect/UploadActionSelect";
import { useAuth0 } from "@auth0/auth0-react";
import Track from "../TrackEditor/Track";
import { useLoaderData } from "react-router-dom";
import UploadTrackSelect from "../UploadTrackSelect/UploadTrackSelect";
import UploadDataSelect from "../UploadDataSelect/UploadDataSelect";
import SessionUploadData from "./SessionUploadData";
import SessionService from "../Session/SessionService";
import { AxiosError, AxiosResponse } from "axios";
import UploadReview from "../UploadReview/UploadReview";

const sessionService = new SessionService();

export default function SessionUpload(): ReactElement {
  const sessionUploadData = useLoaderData() as SessionUploadData;
  const [activeStep, setActiveStep] = useState(0);
  const [uploadAction, setUploadAction] = useState("create");
  const [selectedTrack, setSelectedTrack] = useState<Track>();
  const [selectedSessionId, setSelectedSessionId] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File>();
  const { user, getAccessTokenSilently } = useAuth0();
  const [responseStatus, setResponseStatus] = useState<number>();
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>();

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleUpload = async () => {
    setActiveStep(0);
    const accessToken = await getAccessTokenSilently();
    let response: AxiosResponse;
    let statusCode: number;

    try {
      if (uploadAction === "update") {
        response = await sessionService.updateSession(
          selectedSessionId!!,
          selectedTrack!!,
          user!!,
          selectedFile!!,
          accessToken,
        );
      } else {
        response = await sessionService.createSession(
          selectedTrack!!,
          user!!,
          selectedFile!!,
          accessToken,
        );
      }

      statusCode = response.status;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      statusCode = axiosError?.response?.status ?? 500;
    }

    switch (statusCode) {
      case 200: {
        setAlertMessage("File uploaded successfully");
        break;
      }
      case 409: {
        setAlertMessage("Session already exists");
        break;
      }
      case 410: {
        setAlertMessage("Session does not exist");
        break;
      }
      default: {
        setAlertMessage("File failed to upload");
        break;
      }
    }

    setOpen(true);
    setResponseStatus(statusCode);
  };

  const steps = [
    {
      label: "Select Upload Action",
      content: (
        <>
          <UploadActionSelect
            uploadAction={uploadAction}
            setUploadAction={setUploadAction}
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
            uploadAction={uploadAction}
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
          <UploadReview
            uploadAction={uploadAction}
            selectedSessionId={selectedSessionId}
            selectedFile={selectedFile}
            selectedTrack={selectedTrack}
          />
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
    <>
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
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={responseStatus === 200 ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
