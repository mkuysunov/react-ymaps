import React, { useEffect, useRef, useState } from "react";
import LocationPlacemark from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import clsx from "clsx";
import { Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GeolocationControl, Map, ZoomControl } from "react-yandex-maps";
import { useStyles } from "./App.styles";

const mapOptions = {
  modules: ["geocode", "SuggestView"],
  defaultOptions: { suppressMapOpenBlock: true },
  width: 600,
  height: 400,
};

const geolocationOptions = {
  defaultOptions: { maxWidth: 128 },
  defaultData: { content: "Determine" },
};

const initialState = {
  title: "",
  center: [38.54, 68.76],
  zoom: 12,
};

export default function YMapsTest() {
  const [state, setState] = useState({ ...initialState });
  const [mapConstructor, setMapConstructor] = useState(null);
  const mapRef = useRef(null);
  const searchRef = useRef(null);
  const classes = useStyles();

  // submits
  const handleSubmit = () => {
    console.log(mapRef.current.getCenter());
  };

  // reset state & search
  const handleReset = () => {
    setState({ ...initialState });
    searchRef.current.value = "";
    mapRef.current.setCenter(initialState.center);
    mapRef.current.setZoom(initialState.zoom);
  };

  // search popup
  useEffect(() => {
    if (mapConstructor) {
      new mapConstructor.SuggestView(searchRef.current).events.add("select", function (e) {
        const selectedName = e.get("item").value;
        mapConstructor.geocode(selectedName).then((result) => {
          const newCoords = result.geoObjects.get(0).geometry.getCoordinates();
          setState((prevState) => ({ ...prevState, center: newCoords }));
        });
      });
    }
  }, [mapConstructor]);

  // change title
  const handleBoundsChange = () => {
    const newCoords = mapRef.current.getCenter();
    mapConstructor.geocode(newCoords).then((res) => {
      var nearest = res.geoObjects.get(0);
      var foundAddress = nearest.properties.get("text");
      setState((prevState) => ({ ...prevState, title: foundAddress }));
    });
  };

  // RENDER
  return (
    <Box sx={{ m: 2, width: 600 }}>
      <Box className={classes["searchRoot"]}>
        <Box className={classes["searchFieldBox"]}>
          <input ref={searchRef} placeholder="Search..." />
          <Box className={clsx(classes["titleBox"], { [classes["titleBox_show"]]: Boolean(state.title.length) })}>
            <Typography title={state.title} gutterBottom={false}>
              {state.title}
            </Typography>
            <IconButton onClick={handleReset}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Button onClick={handleSubmit} disabled={Boolean(!state.title.length)} className={classes["searchSubmitBtn"]}>
          Ok
        </Button>
      </Box>

      <Box className={classes["mapRoot"]}>
        <Map
          {...mapOptions}
          state={state}
          onLoad={setMapConstructor}
          onBoundsChange={handleBoundsChange}
          instanceRef={mapRef}
        >
          <LocationPlacemark className={classes["placemark"]} />
          <GeolocationControl {...geolocationOptions} />
          <ZoomControl />
        </Map>
      </Box>
    </Box>
  );
}
