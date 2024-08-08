"use client";

import {
  ReactElement,
  SyntheticEvent,
  useEffect,
  useState,
  useTransition,
} from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Session } from "@/interfaces/Session";
import GetSessions from "@/actions/sessions/GetSessions";
import { enqueueSnackbar } from "notistack";
import { compareAsc, format, parseISO } from "date-fns";
import DatalogTabs from "@/components/Datalogs/DatalogTabs";

function sortByStartDateTimeAsc(
  firstSession: Session,
  secondSession: Session,
): number {
  const firstDate = parseISO(firstSession.startTime);
  const secondDate = parseISO(secondSession.startTime);

  return compareAsc(firstDate, secondDate);
}

const formatDateTime = (dateTime: string): string => {
  const date = parseISO(dateTime);
  return format(date, "MM-dd-yyyy h:mm a");
};

export default function SessionSummary(): ReactElement {
  const [sessions, setSessions] = useState(Array<Session>());
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleChange = (event: SyntheticEvent, value: Session | null) => {
    if (value !== null) {
      setSessionId(value.id);
    }
  };

  useEffect(() => {
    startTransition(async () => {
      try {
        setSessions(await GetSessions());
      } catch (error: any) {
        setSessions(Array());
        enqueueSnackbar(error.message, { variant: "error" });
      }
    });
  }, []);

  return (
    <>
      <Autocomplete
        disablePortal
        onChange={handleChange}
        loading={isPending}
        options={sessions.sort(sortByStartDateTimeAsc)}
        getOptionLabel={(option) =>
          `${option.trackName}: ${formatDateTime(option.startTime)} - ${formatDateTime(option.endTime)}`
        }
        sx={{ width: 500, margin: 2 }}
        renderInput={(params) => <TextField {...params} label="Sessions" />}
      />
      <DatalogTabs sessionId={sessionId}></DatalogTabs>
    </>
  );
}
