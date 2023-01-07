import axios from "axios";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { AppDispatch } from "../../redux/utils/types";
import { setPrimitiveField } from "../../redux/slicers/formDataSlicer";
import { useState } from "react";
import { setEnabled } from "../../redux/slicers/disableSelectsSlicer";

const handleGetGeolocation = async (latitude: number, longitude: number) => {
  try {
    const {
      data: { results },
    } = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json?" +
        "key=b73ca574dfab4647b2296dfed9865494" +
        "&q=" +
        encodeURIComponent(latitude + "," + longitude) +
        "&pretty=1" +
        "&no_annotations=1" +
        "&language=en"
    );
    return results;
  } catch (error) {
    console.error(error);
  }
};

const initMap = (results: any[], latitude: number, longitude: number) => {
  return new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center:
      results[0].components.country !== "Russia"
        ? [37.61556, 55.75222]
        : [longitude, latitude],
    zoom: 12,
  });
};

const initDraw = () => {
  return new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
    },
    defaultMode: "draw_polygon",
  });
};

const addNavigation = (map: mapboxgl.Map) => {
  map.addControl(
    new mapboxgl.NavigationControl({
      visualizePitch: true,
    }),
    "bottom-right"
  );
};

const addGeoLocate = (map: mapboxgl.Map) => {
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
};

const updateArea = (dispatch: AppDispatch, draw: MapboxDraw) => (e: any) => {
  if (e.type === "draw.create" || e.type === "draw.update") {
    const data = draw.getAll();
    dispatch(
      setPrimitiveField({
        name: "polygon",
        value: data as unknown as any[],
      })
    );
  }
  if (e.type === "draw.delete") {
    dispatch(
      setPrimitiveField({
        name: "polygon",
        value: null,
      })
    );
  }
};

const addUtils = (map: mapboxgl.Map) => {
  addNavigation(map);
  addGeoLocate(map);
};

const useMapBox = (dispatch: AppDispatch): any => {
  const [draw, setDraw] = useState<MapboxDraw | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  mapboxgl.accessToken =
    "pk.eyJ1IjoidGFraGlya3VkdXNvdiIsImEiOiJjbDJ5eGNtcGUwNTQ1M2ptcWNvdWIwcDBlIn0.Nr0AAp96Ep_eXrbKkyjCOw";

  const init = async () => {
    let errorInit = true;

    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          const results = await handleGetGeolocation(latitude, longitude);

          const map = initMap(results, latitude, longitude);
          const draw = initDraw();

          addUtils(map);

          map.addControl(draw, "top-right");

          setMap(map);
          setDraw(draw);

          map.on("draw.create", updateArea(dispatch, draw));
          map.on("draw.delete", updateArea(dispatch, draw));
          map.on("draw.update", updateArea(dispatch, draw));

          dispatch(setEnabled("isMapDisabled"));
          errorInit = false;
        }
      );
    }
    if (errorInit) {
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [37.61556, 55.75222],
        zoom: 12,
      });
      const draw = initDraw();

      addUtils(map);

      map.addControl(draw, "top-right");

      setMap(map);
      setDraw(draw);

      map.on("draw.create", updateArea(dispatch, draw));
      map.on("draw.delete", updateArea(dispatch, draw));
      map.on("draw.update", updateArea(dispatch, draw));

      dispatch(setEnabled("isMapDisabled"));
    }
  };

  return [map, draw, init];
};

export { useMapBox };
