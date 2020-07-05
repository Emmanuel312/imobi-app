import React from "react";
import HomeMarker from "../HomeMarker";
import MyMarker from "../MyMarker";
import homeMarker from "../../assets/img/homeMarker.png";
import myLocationMarker from "../../assets/img/myLocationMarker.png";
import { Container, mapStyle } from "./styles";
import { LocationData } from "expo-location";
import { PropertiesResponse } from "../../interfaces";
interface Props {
  location: LocationData;
  properties: PropertiesResponse[];
  handlePressProperties(id: number): void;
}

const MapView: React.FC<Props> = ({
  location,
  properties,
  handlePressProperties,
}) => {
  return (
    <>
      {location.coords && (
        <Container
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MyMarker
            latitude={location?.coords?.latitude}
            longitude={location?.coords?.longitude}
            image={myLocationMarker}
          />

          {properties?.map((property) => (
            <HomeMarker
              id={property.id}
              latitude={property.coords.latitude}
              longitude={property.coords.longitude}
              image={homeMarker}
              title={property.address}
              description={property.description}
              onPress={() => handlePressProperties(property.id)}
            />
          ))}
        </Container>
      )}
    </>
  );
};

export default MapView;
