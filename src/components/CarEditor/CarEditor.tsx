"use client";
import { ReactElement, useEffect, useState, useTransition } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridSlots,
} from "@mui/x-data-grid";
import {
  Cancel,
  Close,
  Delete,
  Edit,
  ErrorOutline,
  Save,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {
  closeSnackbar,
  enqueueSnackbar,
  SnackbarKey,
  SnackbarProvider,
} from "notistack";
import theme from "@/theme";
import Car from "@/interfaces/Car";
import GetCars from "@/actions/cars/GetCars";
import CarEditorToolbar from "@/components/CarEditor/CarEditorToolbar";
import UpdateCar from "@/actions/cars/UpdateCar";
import CreateCar from "@/actions/cars/CreateCar";
import DeleteCar from "@/actions/cars/DeleteCar";

export default function CarEditor(): ReactElement {
  const [rows, setRows] = useState(Array<Car>);
  const [isPending, startTransition] = useTransition();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  useEffect(() => {
    startTransition(async () => {
      try {
        setRows(await GetCars());
      } catch (error: any) {
        setRows(Array());
        enqueueSnackbar("Failed to retrieve cars", { variant: "error" });
      }
    });
  }, []);

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
    try {
      await DeleteCar(id as number);
      setRows(rows.filter((row) => row.id !== id));
    } catch (error: any) {
      enqueueSnackbar("Failed to delete car", { variant: "error" });
    }
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
    let id = updatedRow.id;

    if (updatedRow.isNew) {
      try {
        id = await CreateCar(updatedRow as Car);
      } catch (error: any) {
        enqueueSnackbar("Failed to create car", { variant: "error" });
      }
    } else {
      try {
        await UpdateCar(updatedRow as Car);
      } catch (error: any) {
        enqueueSnackbar("Failed to update car", { variant: "error" });
      }
    }

    setRows(
      rows.map((row) =>
        row.id === newRow.id ? (updatedRow as Car) : (row as Car),
      ),
    );

    updatedRow.id = id;
    updatedRow.isNew = false;
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "year",
      type: "number",
      headerName: "Car Year",
      headerAlign: "center",
      align: "center",
      editable: true,
      flex: 1,
      valueFormatter: (value?: number) => value?.toString(),
    },
    {
      field: "make",
      headerName: "Car Make",
      headerAlign: "center",
      align: "center",
      editable: true,
      flex: 1,
    },
    {
      field: "model",
      headerName: "Car Model",
      headerAlign: "center",
      align: "center",
      editable: true,
      flex: 1,
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
              key="Save"
              icon={<Save />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key="Cancel"
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
            key="Edit"
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key="Delete"
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
    <>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={5000}
        action={(snackbarId: SnackbarKey) => (
          <IconButton color="inherit" onClick={() => closeSnackbar(snackbarId)}>
            <Close />
          </IconButton>
        )}
        preventDuplicate={true}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        iconVariant={{
          error: (
            <ErrorOutline
              color="inherit"
              sx={{ paddingRight: 2 }}
              fontSize="large"
            />
          ),
        }}
        style={{ fontFamily: theme.typography.fontFamily }}
      />
      <DataGrid
        sx={{ margin: 2 }}
        autoHeight
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        loading={isPending}
        slots={{
          toolbar: CarEditorToolbar as GridSlots["toolbar"],
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </>
  );
}
