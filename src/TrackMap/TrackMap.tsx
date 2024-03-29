import { ReactElement, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import TrackMapMarker from "./TrackMapMarker";
import { useLoaderData } from "react-router-dom";
import Datalog from "../Session/Datalog";
import TrackMapButtons from "../TrackMapButtons/TrackMapButtons";
import { Stack } from "@mui/material";
import Dashboard from "../Dashboard/Dashboard";

export default function TrackMap(): ReactElement {
  const datalogs: Datalog[] = useLoaderData() as Datalog[];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1);

  const intervalTime = 1000;

  const coordinates = Array<[number, number]>();
  const trackLongitude = datalogs.at(0)?.trackInfo.longitude;
  const trackLatitude = datalogs.at(0)?.trackInfo.latitude;

  datalogs.forEach((datalog) => {
    coordinates.push([datalog.data.latitude, datalog.data.longitude]);
  });

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (currentIndex >= coordinates.length - 1) {
          setCurrentIndex(0);
          setPreviousIndex(0);
          return;
        }

        setPreviousIndex(currentIndex);
        setCurrentIndex(currentIndex + 1);
      }, intervalTime / playSpeed);

      return () => clearInterval(interval);
    }
  }, [coordinates.length, currentIndex, isPlaying, playSpeed]);

  return (
    <Box sx={{ paddingTop: 2 }}>
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <MapContainer
          style={{ height: 420, width: 900 }}
          center={[trackLatitude!, trackLongitude!]}
          zoom={16}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <TrackMapMarker
            coordinates={coordinates}
            previousIndex={previousIndex}
            currentIndex={currentIndex}
            intervalTime={intervalTime / playSpeed}
          />
        </MapContainer>
        <TrackMapButtons
          setIsPlaying={setIsPlaying}
          setPlaySpeed={setPlaySpeed}
          playSpeed={playSpeed}
          setCurrentIndex={setCurrentIndex}
        ></TrackMapButtons>
      </Stack>
      <Dashboard datalogs={datalogs} currentIndex={currentIndex} />
    </Box>
  );
}
