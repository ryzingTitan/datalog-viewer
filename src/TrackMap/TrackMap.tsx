import { ReactElement, useEffect, useState } from "react";
import GraphProps from "../Session/GraphProps";
import { Box } from "@mui/system";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import TrackMapMarker from "./TrackMapMarker";

export default function TrackMap(graphProps: GraphProps): ReactElement {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);

  const intervalTime = 250;

  const coordinates = Array<[number, number]>();
  coordinates.push([42.40680666666667, -86.14157166666668]);
  graphProps.datalogs.forEach((datalog) => {
    coordinates.push([datalog.latitude, datalog.longitude]);
  });

  useEffect(() => {
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
  }, [coordinates.length, currentIndex]);

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
    </Box>
  );
}
