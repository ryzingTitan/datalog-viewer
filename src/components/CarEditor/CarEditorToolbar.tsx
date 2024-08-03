import EditToolbarProps from "@/interfaces/EditToolbarProps";
import { GridRowModes, GridToolbarContainer } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function CarEditorToolbar(editToolbarProps: EditToolbarProps) {
  const { setRows, setRowModesModel } = editToolbarProps;

  const handleClick = () => {
    const id = Math.floor(Math.random());
    setRows((oldRows) => [
      ...oldRows,
      { id, year: null, make: "", model: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "year" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<Add />} onClick={handleClick}>
        Add car
      </Button>
    </GridToolbarContainer>
  );
}
