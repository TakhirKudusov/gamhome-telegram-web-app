import styled from "styled-components";
import React, { useContext, useEffect } from "react";
import { mapboxHandler } from "../../common/geolocation.helper";
import { ArrowIosBackOutline } from "@styled-icons/evaicons-outline/ArrowIosBackOutline";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TFormData } from "../../redux/slicers/types";
import { AppContext } from "../../common/AppContext";

const Map = () => {
  const { isMapOpen, setIsMapOpen } = useContext(AppContext);

  const {
    data: { polygon },
  } = useAppSelector<TFormData>((state) => state.formData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    mapboxHandler(dispatch, polygon);
  }, []);

  const handleReturnClick = () => {
    setIsMapOpen!(false);
  };

  return (
    <>
      <Wrapper isOpen={isMapOpen as boolean}>
        <MapContainer id="map" />
        <ReturnButton onClick={handleReturnClick}>
          <ArrowIcon />
        </ReturnButton>
      </Wrapper>
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
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div<{ isOpen: boolean }>`
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
`;

export default Map;
