import { ReactElement, useState } from "react";
import { Modal } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Preview } from "@mui/icons-material";
import TrackPreviewProps from "./TrackPreviewProps";
import { MapContainer, TileLayer } from "react-leaflet";

export default function TrackPreview(
  trackPreviewProps: TrackPreviewProps,
): ReactElement {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Preview titleAccess={"Preview"} />
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
