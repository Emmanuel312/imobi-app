import React from "react";
import { Container, CustomMarker } from "./styles";
import { ImageRequireSource } from "react-native";

interface Props {
  latitude: number;
  longitude: number;
  image: ImageRequireSource;
}

const MyMarker: React.FC<Props> = ({ latitude, longitude, image }) => {
  return (
    <Container
      coordinate={{
        latitude,
        longitude,
      }}
    >
      <CustomMarker source={image} />
    </Container>
  );
};

export default MyMarker;
