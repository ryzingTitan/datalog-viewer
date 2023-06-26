import { ReactElement, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import TrackMapMarker from "./TrackMapMarker";
import DataGauges from "../DataGauges/DataGauges";
import { useLoaderData } from "react-router-dom";
import Datalog from "../Session/Datalog";
import TrackMapButtons from "../TrackMapButtons/TrackMapButtons";

export default function TrackMap(): ReactElement {
  const datalogs: Datalog[] = useLoaderData() as Datalog[];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const intervalTime = 500;

  const coordinates = Array<[number, number]>();

  datalogs.forEach((datalog) => {
    coordinates.push([datalog.latitude, datalog.longitude]);
  });

  function changePlaySpeed(speed: number) {
    // playSpeed = speed;
  }

  function restartSession() {
    //   setCurrentIndex(0);
    //   setPreviousIndex(0);
    //  clear interval if it exists
  }

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
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [coordinates.length, currentIndex, isPlaying]);

  return (
    <Box sx={{ paddingTop: 2 }}>
      <MapContainer
        style={{ height: 420 }}
        center={[42.4086, -86.1374]}
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
          intervalTime={intervalTime}
        />
      </MapContainer>
      <TrackMapButtons
        setIsPlaying={setIsPlaying}
        changePlaySpeed={changePlaySpeed}
      ></TrackMapButtons>
      <DataGauges datalogs={datalogs} currentIndex={currentIndex}></DataGauges>
    </Box>
  );
}
