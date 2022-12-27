import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const geolocationHandler = (
  setCurrCoords: Dispatch<SetStateAction<[number, number]>>
) => {
  if (navigator?.geolocation) {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        axios
          .get(
            "https://api.opencagedata.com/geocode/v1/json?" +
              "key=b73ca574dfab4647b2296dfed9865494" +
              "&q=" +
              encodeURIComponent(latitude + "," + longitude) +
              "&pretty=1" +
              "&no_annotations=1" +
              "&language=en"
          )
          .then(({ data: { results } }) => {
            if (results[0].components.country === "Russia") {
              setCurrCoords([latitude, longitude]);
            }
          })
          .catch((error) => console.log(error));
      }
    );
  }
};

const mapboxHandler = (
  currCoords: [number, number],
  setPolygon: Dispatch<SetStateAction<[number, number][] | null>>
) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoidGFraGlya3VkdXNvdiIsImEiOiJjbDJ5eGNtcGUwNTQ1M2ptcWNvdWIwcDBlIn0.Nr0AAp96Ep_eXrbKkyjCOw";
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: currCoords,
    zoom: 12,
  });
  const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
    },
    defaultMode: "draw_polygon",
  });

  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    }),
    "bottom-left"
  );

  map.addControl(
    new mapboxgl.NavigationControl({
      visualizePitch: true,
    }),
    "bottom-right"
  );
  map.addControl(draw, "top-left");

  map.on("draw.create", updateArea);
  map.on("draw.delete", updateArea);
  map.on("draw.update", updateArea);

  function updateArea(e: any) {
    const data = draw.getAll();
    if (e.type === "draw.create" || e.type === "draw.update") {
      setPolygon((draw.getAll().features[0].geometry as any).coordinates[0]);
    }
    if (e.type === "draw.delete") {
      setPolygon(null);
    }
  }
};

export { geolocationHandler, mapboxHandler };
