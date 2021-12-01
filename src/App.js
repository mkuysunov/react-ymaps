import LocationIcon from "@mui/icons-material/LocationOn";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { GeolocationControl, Map, ZoomControl } from "react-yandex-maps";
import { useStyles } from "./App.styles";

const mapOptions = {
  modules: ["geocode", "SuggestView"],
  defaultOptions: { uppressMapOpenBlock: true },
  width: 600,
  height: 400,
};

const geolocationOptions = {
  defaultOptions: { maxWidth: 128 },
  defaultData: { content: "Determine" },
};

const initialState = {
  title: "",
  center: [38.54, 68.77],
  zoom: 12,
};

export default function YMapsTest() {
  const [state, setState] = useState(initialState);
  const [mapConstructor, setMapConstructor] = useState(false);
  const mapRef = useRef(null);
  const searchRef = useRef(null);
  const classes = useStyles();

  // search popup
  useEffect(() => {
    if (mapConstructor) {
      new mapConstructor.SuggestView(searchRef.current, { options: { kind: "house" } }).events.add(
        "select",
        function (e) {
          const selectedName = e.get("item").value;
          mapConstructor.geocode(selectedName).then((result) => {
            const newCoords = result.geoObjects.get(0).geometry.getCoordinates();
            setState((prevState) => ({ ...prevState, center: newCoords }));
          });
        }
      );
    }
  }, [mapConstructor]);

  // change title
  const handleBoundsChange = (e) => {
    const newCoords = e.originalEvent.map.getCenter();
    mapConstructor.geocode(newCoords).then((res) => {
      var nearest = res.geoObjects.get(0);
      var foundAddress = nearest.properties.get("text");
      setState((prevState) => ({ ...prevState, title: foundAddress }));
    });
  };

  // RENDER
  return (
    <Box sx={{ m: 2, width: 600 }}>
      <Box sx={{ color: "text.primary", fontSize: 34, fontWeight: "medium" }}>
        {/* .{state.title && <Box>{state.title}</Box>} */}
        <input ref={searchRef} placeholder="куда маркер ставить будем?" style={{ width: "100%" }} />
      </Box>

      <Box sx={{ position: "relative" }}>
        <Map
          {...mapOptions}
          state={state}
          onLoad={(map) => setMapConstructor(map)}
          onBoundsChange={handleBoundsChange}
          instanceRef={mapRef}
        >
          <LocationIcon className={classes["placemark"]} />

          <GeolocationControl {...geolocationOptions} />
          <ZoomControl />
        </Map>
      </Box>
    </Box>
  );
}
