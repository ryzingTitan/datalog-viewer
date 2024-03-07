import * as React from "react";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

import { ReactElement, useState } from "react";
import { Button } from "@mui/material";
import { Add, Cancel, Delete, Edit, Save } from "@mui/icons-material";
import Track from "./Track";
import { useLoaderData } from "react-router-dom";
import TrackService from "./TrackService";
import { useAuth0 } from "@auth0/auth0-react";
import TrackPreview from "../TrackPreview/TrackPreview";

let initialRows: GridRowsProp = [];
const trackService = new TrackService();

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = crypto.randomUUID();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: "", latitude: null, longitude: null, isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<Add />} onClick={handleClick}>
        Add track
      </Button>
    </GridToolbarContainer>
  );
}

export default function TrackEditor(): ReactElement {
  const tracks: Track[] = useLoaderData() as Track[];

  initialRows = tracks.map((track) => {
    return {
      id: track.id,
      name: track.name,
      longitude: track.longitude,
      latitude: track.latitude,
      isNew: false,
    };
  });

  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { getAccessTokenSilently } = useAuth0();

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    const accessToken = await getAccessTokenSilently();
    await trackService.delete(accessToken, id as string);
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    const updatedRow = { ...newRow };

    const accessToken = await getAccessTokenSilently();
    if (updatedRow.isNew) {
      await trackService.save(accessToken, updatedRow as Track);
    } else {
      await trackService.update(accessToken, updatedRow as Track);
    }

    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Track UUID",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Track Name",
      headerAlign: "center",
      align: "center",
      editable: true,
      flex: 1,
    },
    {
      field: "latitude",
      headerName: "Track Latitude",
      type: "number",
      headerAlign: "center",
      align: "center",
      editable: true,
      flex: 1,
    },
    {
      field: "longitude",
      headerName: "Track Longitude",
      headerAlign: "center",
      align: "center",
      editable: true,
      type: "number",
      flex: 1,
    },
    {
      field: "trackPreview",
      headerName: "Track Preview",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <TrackPreview
          longitude={params.row.longitude}
          latitude={params.row.latitude}
        />
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      flex: 1,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<Save />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<Cancel />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <DataGrid
      sx={{ margin: 1 }}
      autoHeight
      rows={rows}
      columns={columns}
      editMode="row"
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      slots={{
        toolbar: EditToolbar,
      }}
      slotProps={{
        toolbar: { setRows, setRowModesModel },
      }}
    />
  );
}
