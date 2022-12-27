import styled from "styled-components";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { mapboxHandler } from "../../common/geolocation.helper";
import { useRouter } from "next/router";
import { ArrowIosBackOutline } from "@styled-icons/evaicons-outline/ArrowIosBackOutline";

const Map = () => {
  const [polygon, setPolygon] = useState<any[] | null>(null);

  const router = useRouter();

  useEffect(() => {
    mapboxHandler(setPolygon);
  }, []);

  const handleReturnClick = () => {
    router.push("/");
  };

  return (
    <>
      <MapContainer id="map" />
      <ReturnButton onClick={handleReturnClick}>
        <ArrowIcon />
      </ReturnButton>
    </>
  );
};

const ArrowIcon = styled(ArrowIosBackOutline)`
  height: 25px;
  color: #333333;
`;

const ReturnButton = styled.div`
  display: flex;
  height: 29px;
  width: 29px;
  border-radius: 5px;
  box-sizing: content-box;
  border: 2px rgba(0, 0, 0, 0.75) solid;
  cursor: pointer;
  position: fixed;
  background-color: rgb(255, 255, 255);
  z-index: 10;
  top: 8px;
  left: 8px;
  justify-content: center;
  align-items: center;
`;

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default Map;
