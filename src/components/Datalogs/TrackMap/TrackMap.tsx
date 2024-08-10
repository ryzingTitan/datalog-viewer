import { ReactElement, useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import TrackMapProps from "@/interfaces/TrackMapProps";
import TrackMapButtons from "@/components/Datalogs/TrackMap/TrackMapButtons";
import TrackMapMarker from "@/components/Datalogs/TrackMap/TrackMapMarker";

export default function TrackMap(trackMapProps: TrackMapProps): ReactElement {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1);

  const intervalTime = 1000;

  const coordinates = Array<[number, number]>();
  const trackLongitude = trackMapProps.session?.trackLongitude;
  const trackLatitude = trackMapProps.session?.trackLatitude;

  trackMapProps.datalogs.forEach((datalog) => {
    coordinates.push([datalog.latitude, datalog.longitude]);
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
      {/*<Dashboard datalogs={datalogs} currentIndex={currentIndex} />*/}
    </Box>
  );
}
