import { Button } from "@material-ui/core";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { GeolocationControl, Map, Placemark, ZoomControl } from "react-yandex-maps";
import locationIcon from "../assets/pin.png";

const mapOptions = {
  defaultOptions: { suppressMapOpenBlock: true },
  width: 600,
  height: 400,
};

const placemarkOptions = {
  defaultOptions: {
    iconLayout: "default#image",
    iconImageHref: locationIcon,
    iconImageSize: [30, 30],
    zIndex: 999,
  },
};

const geolocationOptions = {
  defaultOptions: { maxWidth: 128 },
  defaultData: { content: "Determine" },
};

const initialCoords = [38.546624598789506, 68.77815409999992];

export default function YMapsTest() {
  const [coords, setCoords] = useState(initialCoords);
  const [title, setTitle] = useState(null);
  const [mapConstructor, setMapConstructor] = useState(false);

  const mapRef = useRef(null);
  const placemarkRef = useRef(null);
  const searchRef = useRef(null);

  // placemark pinned center
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.events.add("actiontickcomplete", function (e) {
        const { globalPixelCenter, zoom } = e.get("tick");
        placemarkRef.current.geometry.setCoordinates(
          mapRef.current.options.get("projection").fromGlobalPixels(globalPixelCenter, zoom)
        );
      });
    }
  }, [mapConstructor]);

  console.log(coords);

  // search popup select
  useEffect(() => {
    if (mapConstructor) {
      new mapConstructor.SuggestView(searchRef.current).events.add("select", function (e) {
        const selectedName = e.get("item").value;
        mapConstructor.geocode(selectedName).then((result) => {
          const newCoords = result.geoObjects.get(0).geometry.getCoordinates();
          setCoords(newCoords);
        });
      });
    }
  }, [mapConstructor]);

  const handleBoundsChange = (e) => {
    const newCoords = e.originalEvent.map.getCenter();
    mapConstructor.geocode(newCoords).then((res) => {
      const firstGeoObject = res.geoObjects.get(0);
      const newAddress = [
        firstGeoObject.getLocalities().length
          ? firstGeoObject.getLocalities()
          : firstGeoObject.getAdministrativeAreas(),
        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
      ]
        .filter(Boolean)
        .join(", ");

      setTitle(newAddress);
      setCoords(newCoords);
    });
  };

  const handleReset = () => {
    searchRef.current.value = "";
    setTitle(null);
    setCoords(initialCoords);
  };

  // RENDER
  return (
    <Box sx={{ p: 2, m: 2, width: 600 }}>
      <Box>
        <input
          ref={searchRef}
          placeholder="куда маркер ставить будем?"
          style={{ width: "100%", opacity: title ? 0 : 1 }}
        />
        {title && (
          <Box>
            {title} <Button onClick={handleReset}>Clear</Button>
          </Box>
        )}
      </Box>

      <Map
        {...mapOptions}
        state={{ center: coords, zoom: 9, controls: [] }}
        onLoad={(map) => setMapConstructor(map)}
        onBoundsChange={handleBoundsChange}
        instanceRef={mapRef}
      >
        {/* <SearchControl {...searchControlOptions} onLoad={setIsLoadedSearch} instanceRef={searchRef} /> */}
        <Placemark {...placemarkOptions} geometry={coords} instanceRef={placemarkRef} />
        <GeolocationControl {...geolocationOptions} />
        <ZoomControl />
      </Map>
    </Box>
  );
}

/*

 

*/
