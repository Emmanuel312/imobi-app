import React from "react";
import { PropertiesResponse } from "../../interfaces";
import { Container, CustomMarker } from "./styles";
import { ImageRequireSource } from "react-native";

interface Props {
  id: number;
  latitude: number;
  longitude: number;
  image: ImageRequireSource;
  title: string;
  description: string;
  onPress(id: number): void;
}

const HomeMarker: React.FC<Props> = ({
  id,
  latitude,
  longitude,
  image,
  title,
  description,
  onPress,
}) => {
  return (
    <Container
      key={id}
      coordinate={{
        latitude,
        longitude,
      }}
      title={title}
      description={description}
      onPress={() => onPress(id)}
    >
      <CustomMarker source={image} />
    </Container>
  );
};

export default HomeMarker;
