"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { LayoutContainer } from "@/styled-components";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSelector, useDispatch } from "react-redux";
import { AppStore } from "@/redux/store";
import { addComic, createComic } from "@/redux/states/comic.state";
import { addAccessory, createAccessory } from "@/redux/states/accessory.state";
import { addGlass, createGlass } from "@/redux/states/glass.state";
import { addToy, createToy } from "@/redux/states/toy.state";
import { addShirt, createShirt } from "@/redux/states/shirt.state";
import { services } from "@/services/services";
export type HomeProps = {
  // types...
};

const columns = [
  { field: "hero", headerName: "Heroes", width: 130 },
  { field: "price", headerName: "Precio", width: 130 },
  { field: "type", headerName: "Tipo", width: 130 },
];
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Home: React.FC<HomeProps> = () => {
  const textEmpty = {
    id: "",
    type: "",
    price: "",
    hero: "",
  };
  const [states, setStates] = useState({
    add: false,
    textErrorHero: false,
    textErrorPrice: false,
    open: false,
  });
  const [value, setValue] = useState(0);
  const [text, setText] = useState(textEmpty);
  const comicState = useSelector((store: AppStore) => store.comic);
  const glassState = useSelector((store: AppStore) => store.glass);
  const accessoryState = useSelector((store: AppStore) => store.accessory);
  const shirtState = useSelector((store: AppStore) => store.shirt);
  const toyState = useSelector((store: AppStore) => store.toy);
  const dispatch = useDispatch();

  const AddData = async () => {
    setStates({
      ...states,
      open: true,
    });
    try {
      const { data } = await services();
      if (Array.isArray(data)) {
        const comics = data.filter((el) => el.type === "Comic");
        dispatch(createComic(comics));
        const accessories = data.filter((el) => el.type === "Accesorio");
        dispatch(createAccessory(accessories));
        const shirts = data.filter((el) => el.type === "Camisa");
        dispatch(createShirt(shirts));
        const glasses = data.filter((el) => el.type === "Vaso");
        dispatch(createGlass(glasses));
        const toys = data.filter((el) => el.type === "Juguete");
        dispatch(createToy(toys));
        setStates({
          ...states,
          open: false,
        });
      }
    } catch (error) {
      setStates({
        ...states,
        open: false,
      });
      console.log(error);
    }
  };

  const handleAddProduct = (type: string) => {
    if (text.hero != "" && text.price != "") {
      const newProduct = {
        id: new Date().toString(),
        type,
        hero: text.hero,
        price: text.price,
      };
      if (type == "Comic") {
        dispatch(addComic(newProduct));
      }
      if (type == "Vaso") {
        dispatch(addGlass(newProduct));
      }
      if (type == "Juguete") {
        dispatch(addToy(newProduct));
      }
      if (type == "Accesorio") {
        dispatch(addAccessory(newProduct));
      }
      if (type == "Camiseta") {
        dispatch(addShirt(newProduct));
      }
      setStates({
        ...states,
        textErrorHero: false,
        textErrorPrice: false,
      });
      setText(textEmpty);
    } else if (text.hero == "" && text.price == "") {
      setStates({
        ...states,
        textErrorHero: true,
        textErrorPrice: true,
      });
    } else if (text.price == "") {
      setStates({
        ...states,
        textErrorPrice: true,
      });
    } else if (text.hero == "") {
      setStates({
        ...states,
        textErrorHero: true,
      });
    }
  };

  const showAddproduct = () => {
    if (!states.add) {
      setText(textEmpty);
      setStates({
        ...states,
        textErrorHero: false,
        textErrorPrice: false,
      });
    }
    setStates({
      ...states,
      add: !states.add,
    });
  };

  const nextTab = () => {
    setStates({
      ...states,
      add: false,
    });
    setText(textEmpty);
  };

  useEffect(() => {
    AddData();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
	setValue(newValue);
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={states.open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <LayoutContainer>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            fontStyle={"Edo"}
          >
            <Tabs
              allowScrollButtonsMobile
              aria-label="scrollable auto tabs example"
              scrollButtons="auto"
              variant="scrollable"
              textColor="inherit"
              value={value}
              onChange={handleChange}
              style={{ fontFamily: "Edo" }}
              sx={{ background: "#1F262E", fontFamily: "Edo" }}
              TabIndicatorProps={{
                style: { background: "#FE6666", backgroundColor: "#FE6666" },
              }}
            >
              <Tab onClick={nextTab} sx={{ color: "#FE6666" }} label="Comics" />
              <Tab onClick={nextTab} sx={{ color: "#FE6666" }} label="Vasos" />
              <Tab
                onClick={nextTab}
                sx={{ color: "#FE6666" }}
                label="Juguetes"
              />
              <Tab
                onClick={nextTab}
                sx={{ color: "#FE6666" }}
                label="Accesorios"
              />
              <Tab
                onClick={nextTab}
                sx={{ color: "#FE6666" }}
                label="Camisetas"
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <DataTable columns={columns} rows={comicState} type={"Comic"} />
            <Tooltip title="Añadir Comic">
              <Button onClick={showAddproduct}>
                {states.add ? (
                  <DoDisturbOnIcon sx={{ color: "#FE6666" }} />
                ) : (
                  <AddCircleIcon sx={{ color: "#FE6666" }} />
                )}
              </Button>
            </Tooltip>
            {states.add && (
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  error={states.textErrorHero}
                  value={text.hero}
                  onChange={(e) => setText({ ...text, hero: e.target.value })}
                  id="outlined-basic"
                  label="Heroe"
                  variant="outlined"
                />
                <TextField
                  error={states.textErrorPrice}
                  value={text.price}
                  onChange={(e) => setText({ ...text, price: e.target.value })}
                  id="outlined-basic"
                  label="Precio"
                  variant="outlined"
                />
                <Button onClick={() => handleAddProduct("Comic")}>
                  <CheckCircleIcon sx={{ color: "#FE6666" }} />
                </Button>
              </Box>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <DataTable columns={columns} rows={glassState} type={"Vaso"} />
            <Button onClick={showAddproduct}>
              {states.add ? (
                <DoDisturbOnIcon sx={{ color: "#FE6666" }} />
              ) : (
                <AddCircleIcon sx={{ color: "#FE6666" }} />
              )}
            </Button>
            {states.add && (
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  value={text.hero}
                  onChange={(e) => setText({ ...text, hero: e.target.value })}
                  id="outlined-basic"
                  label="Heroe"
                  variant="outlined"
                />
                <TextField
                  value={text.price}
                  onChange={(e) => setText({ ...text, price: e.target.value })}
                  id="outlined-basic"
                  label="Precio"
                  variant="outlined"
                />
                <Button onClick={() => handleAddProduct("Vaso")}>
                  <CheckCircleIcon sx={{ color: "#FE6666" }} />
                </Button>
              </Box>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <DataTable columns={columns} rows={toyState} type={"Juguete"} />
            <Button onClick={showAddproduct}>
              {states.add ? (
                <DoDisturbOnIcon sx={{ color: "#FE6666" }} />
              ) : (
                <AddCircleIcon sx={{ color: "#FE6666" }} />
              )}
            </Button>
            {states.add && (
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  value={text.hero}
                  onChange={(e) => setText({ ...text, hero: e.target.value })}
                  id="outlined-basic"
                  label="Heroe"
                  variant="outlined"
                />
                <TextField
                  value={text.price}
                  onChange={(e) => setText({ ...text, price: e.target.value })}
                  id="outlined-basic"
                  label="Precio"
                  variant="outlined"
                />
                <Button onClick={() => handleAddProduct("Juguete")}>
                  <CheckCircleIcon sx={{ color: "#FE6666" }} />
                </Button>
              </Box>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <DataTable
              columns={columns}
              rows={accessoryState}
              type={"Accesorio"}
            />
            <Button onClick={showAddproduct}>
              {states.add ? (
                <DoDisturbOnIcon sx={{ color: "#FE6666" }} />
              ) : (
                <AddCircleIcon sx={{ color: "#FE6666" }} />
              )}
            </Button>
            {states.add && (
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  value={text.hero}
                  onChange={(e) => setText({ ...text, hero: e.target.value })}
                  id="outlined-basic"
                  label="Heroe"
                  variant="outlined"
                />
                <TextField
                  value={text.price}
                  onChange={(e) => setText({ ...text, price: e.target.value })}
                  id="outlined-basic"
                  label="Precio"
                  variant="outlined"
                />
                <Button onClick={() => handleAddProduct("Accesorio")}>
                  <CheckCircleIcon sx={{ color: "#FE6666" }} />
                </Button>
              </Box>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <DataTable columns={columns} rows={shirtState} type={"Camisa"} />
            <Button onClick={showAddproduct}>
              {states.add ? (
                <DoDisturbOnIcon sx={{ color: "#FE6666" }} />
              ) : (
                <AddCircleIcon sx={{ color: "#FE6666" }} />
              )}
            </Button>
            {states.add && (
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  value={text.hero}
                  onChange={(e) => setText({ ...text, hero: e.target.value })}
                  id="outlined-basic"
                  label="Heroe"
                  variant="outlined"
                />
                <TextField
                  value={text.price}
                  onChange={(e) => setText({ ...text, price: e.target.value })}
                  id="outlined-basic"
                  label="Precio"
                  variant="outlined"
                />
                <Button onClick={() => handleAddProduct("Camisa")}>
                  <CheckCircleIcon sx={{ color: "#FE6666" }} />
                </Button>
              </Box>
            )}
          </CustomTabPanel>
        </Box>
      </LayoutContainer>
      {/* <TableHulk/> */}
    </div>
  );
};

export default Home;
