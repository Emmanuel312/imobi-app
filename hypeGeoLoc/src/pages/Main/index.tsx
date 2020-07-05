import React, { useState, useEffect, useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import * as Location from "expo-location";
import api from "../../services/api";
import { AxiosResponse } from "axios";
import homeMarker from "../../assets/img/homeMarker.png";
import { filterCoords } from "../../utils/geolib";
import myLocationMarker from "../../assets/img/myLocationMarker.png";
import { Container, MapViewStyled, mapStyle } from "./styles";
import { PropertiesResponse } from "../../interfaces";
import HomeMarker from "../../components/HomeMarker";
import { View, Text } from "react-native";
import MyMarker from "../../components/MyMarker";

const Main: React.FC = () => {
  const refRBSheet = useRef();

  const [location, setLocation] = useState<Location.LocationData>(
    {} as Location.LocationData
  );

  const [properties, setProperties] = useState<PropertiesResponse[]>([]);

  function getCurrentPositionAsync() {
    return Location.getCurrentPositionAsync({});
  }

  async function fetchProperties() {
    try {
      const response: AxiosResponse<PropertiesResponse[]> = await api.get(
        "properties"
      );
      const propertiesFilteredByRange = filterCoords(
        location,
        response.data,
        100000
      );

      setProperties(propertiesFilteredByRange);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestPermissionsAsync();

      if (status === "granted") {
        const location = await getCurrentPositionAsync();

        setLocation(location);
      }
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (location.coords) {
      fetchProperties();
    }
  }, [location.coords]);

  function handlePressProperties(id: number) {
    console.log(id);
    refRBSheet?.current?.open();
  }

  return (
    <Container>
      {location.coords && (
        <MapViewStyled
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MyMarker
            latitude={location.coords.latitude}
            longitude={location.coords.longitude}
            image={myLocationMarker}
          />

          {properties.map((property) => (
            <HomeMarker
              id={property.id}
              latitude={property.coords.latitude}
              longitude={property.coords.longitude}
              image={homeMarker}
              title={property.address}
              description={property.description}
              onPress={handlePressProperties}
            />
          ))}
        </MapViewStyled>
      )}
      <View>
        <Text style={{ color: "white", position: "absolute", top: 10 }}>
          Massa
        </Text>
      </View>
      <RBSheet ref={refRBSheet} height={300} openDuration={250}></RBSheet>
    </Container>
  );
};

export default Main;
