"use client";

import { ReactElement, useState } from "react";
import { IconButton, Modal } from "@mui/material";
import { Preview } from "@mui/icons-material";
import { MapContainer, TileLayer } from "react-leaflet";
import TrackPreviewProps from "@/interfaces/TrackPreviewProps";

import "leaflet/dist/leaflet.css";

export default function TrackPreview(
  trackPreviewProps: TrackPreviewProps,
): ReactElement {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Preview fontSize={trackPreviewProps.iconSize} />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <MapContainer
          style={{ height: 420, width: 900, top: "10%", left: "10%" }}
          center={[trackPreviewProps.latitude, trackPreviewProps.longitude]}
          zoom={16}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </Modal>
    </>
  );
}
