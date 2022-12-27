import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

const mapboxHandler = (setPolygon: Dispatch<SetStateAction<any>>) => {
  if (navigator?.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
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

          mapboxgl.accessToken =
            "pk.eyJ1IjoidGFraGlya3VkdXNvdiIsImEiOiJjbDJ5eGNtcGUwNTQ1M2ptcWNvdWIwcDBlIn0.Nr0AAp96Ep_eXrbKkyjCOw";
          const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v12",
            center:
              results[0].components.country !== "Russia"
                ? [37.61556, 55.75222]
                : [longitude, latitude],
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
          map.addControl(draw, "top-right");

          const updateArea = (e: any) => {
            if (e.type === "draw.create" || e.type === "draw.update") {
              const data = draw.getAll();
              setPolygon(data);
            }
            if (e.type === "draw.delete") {
              setPolygon(null);
            }
          };

          map.on("draw.create", updateArea);
          map.on("draw.delete", updateArea);
          map.on("draw.update", updateArea);
        } catch (error) {
          console.error(error);
        }
      }
    );
  }
};

export { mapboxHandler };
