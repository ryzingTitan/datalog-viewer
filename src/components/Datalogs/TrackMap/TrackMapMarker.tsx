import L from "leaflet";

import React, { ReactElement } from "react";
import TrackMapMarkerProps from "@/interfaces/TrackMapMarkerProps";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";

export default function TrackMapMarker(
  trackMapMarkerProps: TrackMapMarkerProps,
): ReactElement {
  const currentLatitude =
    trackMapMarkerProps.coordinates[trackMapMarkerProps.currentIndex][0];
  const currentLongitude =
    trackMapMarkerProps.coordinates[trackMapMarkerProps.currentIndex][1];
  const previousLatitude =
    trackMapMarkerProps.coordinates[trackMapMarkerProps.previousIndex][0];
  const previousLongitude =
    trackMapMarkerProps.coordinates[trackMapMarkerProps.previousIndex][1];

  const currentPosition = new L.LatLng(currentLatitude, currentLongitude);
  const previousPosition = new L.LatLng(previousLatitude, previousLongitude);

  const icon = L.icon({
    iconSize: [15, 15],
    iconUrl: "/car-solid.svg",
  });

  return (
    <LeafletTrackingMarker
      icon={icon}
      position={currentPosition}
      previousPosition={previousPosition}
      duration={trackMapMarkerProps.intervalTime}
    ></LeafletTrackingMarker>
  );
}
