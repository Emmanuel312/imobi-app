import React, { useState, useEffect, useRef } from "react";
import BottomSheet from "react-native-raw-bottom-sheet";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import * as Location from "expo-location";
import api from "../../services/api";
import { AxiosResponse } from "axios";
import { filterCoords } from "../../utils/geolib";

import { Container } from "./styles";
import { PropertiesResponse } from "../../interfaces";

import Search from "../../components/Search";
import Property from "../../components/Property";
import MapView from "../../components/MapView";

const Main: React.FC = () => {
  const [range, setRange] = useState<number>(1000);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number>(0);
  const [properties, setProperties] = useState<PropertiesResponse[]>([]);
  const [location, setLocation] = useState<Location.LocationData>(
    {} as Location.LocationData
  );
  const refRBSheet = useRef();

  function getCurrentPositionAsync() {
    return Location.getCurrentPositionAsync({});
  }

  async function fetchProperties(range: number) {
    try {
      const response: AxiosResponse<PropertiesResponse[]> = await api.get(
        "property"
      );
      console.log(response.data);
      const propertiesFilteredByRange = filterCoords(
        location,
        response.data,
        range
      );
      console.log(propertiesFilteredByRange.length);
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
      fetchProperties(range);
    }
  }, [location.coords]);

  function handlePressProperties(id: number) {
    setSelectedPropertyId(id);
    refRBSheet?.current?.open();
  }

  async function handleSearch(meters: string) {
    setRange(Number(meters));
    await fetchProperties(Number(meters));
  }

  return (
    <Container>
      <MapView
        handlePressProperties={(id) => handlePressProperties(id)}
        location={location}
        properties={properties}
      />

      <Search handleSearch={(meters) => handleSearch(meters)} />

      <BottomSheet
        ref={refRBSheet}
        animationType="slide"
        height={hp("80%")}
        openDuration={250}
      >
        {selectedPropertyId && <Property id={selectedPropertyId} />}
      </BottomSheet>
    </Container>
  );
};

export default Main;
