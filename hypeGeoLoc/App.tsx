// implementar design usando https://github.com/nysamnang/react-native-raw-bottom-sheet
// Deep Link para abrir o whatsapp

import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import * as Location from "expo-location";
import api from "./src/services/api";
import { AxiosResponse } from "axios";
import homeMarker from "./src/assets/img/homeMarker.png";
import { filterCoords } from "./src/utils/geolib";
import { Coords } from "./src/utils/geolib";

interface PhotosResponse {
  id: number;
  url: string;
}

interface CoordsResponse {
  latitude: number;
  longitude: number;
}

interface PropertiesResponse {
  id: number;
  ownerName: string;
  description: string;
  address: string;
  photos: PhotosResponse[];
  contact: string;
  coords: CoordsResponse;
}

const App = () => {
  const [location, setLocation] = useState<Location.LocationData>(
    {} as Location.LocationData
  );

  const [locations, setLocations] = useState<Coords[]>([]);

  function getCurrentPositionAsync() {
    return Location.getCurrentPositionAsync({});
  }

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestPermissionsAsync();

      if (status === "granted") {
        const location = await getCurrentPositionAsync();

        setLocation(location);
      }
    }

    async function fetchProperties() {
      try {
        const response: AxiosResponse<PropertiesResponse[]> = await api.get(
          "properties"
        );
        const propertiesFilteredByRange = filterCoords(
          location.coords,
          response.data.map((property) => property.coords),
          100000
        );

        setLocations(propertiesFilteredByRange);
      } catch (error) {
        console.log(error);
      }
    }

    getCurrentLocation();
    fetchProperties();
  }, []);

  return (
    <View style={styles.container}>
      {location.coords && (
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {locations.map((location) => (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="title"
              description="description"
            >
              <Image
                source={homeMarker}
                style={{ width: 50, height: 50 }}
              ></Image>
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default App;
