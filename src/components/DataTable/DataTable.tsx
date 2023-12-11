"use client";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import React from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "@/redux/store";
import { createComic } from "@/redux/states/comic.state";
import { createGlass } from "@/redux/states/glass.state";
import { createAccessory } from "@/redux/states/accessory.state";
import { createShirt } from "@/redux/states/shirt.state";
import { createToy } from "@/redux/states/toy.state";

export type DataTableProps = {
  columns: [
    {
      field: string;
      headerName: string;
      width: number;
    }
  ];
  rows: [
    {
      id: string;
      type: string;
      price: string;
      hero: string;
    }
  ];
  type: string;
  // types...
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const DataTable: React.FC<DataTableProps> = ({ columns, rows, type }) => {
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
  const comicState = useSelector((store: AppStore) => store.comic);
  const glassState = useSelector((store: AppStore) => store.glass);
  const accessoryState = useSelector((store: AppStore) => store.accessory);
  const shirtState = useSelector((store: AppStore) => store.shirt);
  const toyState = useSelector((store: AppStore) => store.toy);
  const dispatch = useDispatch();

  const deleteElement = () => {
    if (type == "Comic") {
      let comic = comicState;
      rowSelectionModel.forEach((id) => {
        comic = comic.filter((obj) => obj.id !== id);
        return comic;
      });
      dispatch(createComic(comic));
    }
    if (type == "Vaso") {
      let glass = glassState;
      rowSelectionModel.forEach((id) => {
        glass = glass.filter((obj) => obj.id !== id);
        return glass;
      });
      dispatch(createGlass(glass));
    }
    if (type == "Accesorio") {
      let accessory = accessoryState;
      rowSelectionModel.forEach((id) => {
        accessory = accessory.filter((obj) => obj.id !== id);
        return accessory;
      });
      dispatch(createAccessory(accessory));
    }
    if (type == "Camisa") {
      let shirt = shirtState;
      rowSelectionModel.forEach((id) => {
        shirt = shirt.filter((obj) => obj.id !== id);
        return shirt;
      });
      dispatch(createShirt(shirt));
    }
    if (type == "Juguete") {
      let toy = toyState;
      rowSelectionModel.forEach((id) => {
        toy = toy.filter((obj) => obj.id !== id);
        return toy;
      });
      dispatch(createToy(toy));
    }
  };
  return (
    <div>
      {rowSelectionModel.length > 0 && (
        <Stack spacing={2}>
          <Item>
            <Box>
              <Typography fontFamily={"Edo"} color={"#FE6666"}>
                {rowSelectionModel.length}{" "}
                {rowSelectionModel.length > 1
                  ? "elementos seleccionados."
                  : "elemento seleccionado"}
              </Typography>
              <Tooltip title={"Eliminar"}>
                <Button onClick={deleteElement} sx={{ borderColor: "#FE6666" }}>
                  <DeleteForeverIcon sx={{ color: "#FE6666" }} />
                </Button>
              </Tooltip>
            </Box>
          </Item>
        </Stack>
      )}
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ fontFamily: "Edo", borderColor: "#FE6666", color: "#FE6666" }}
        autoHeight
        disableColumnSelector
        disableRowSelectionOnClick
        style={{ background: "#1F262E", fontFamily: "Edo" }}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
      />
    </div>
  );
};

export default DataTable;
