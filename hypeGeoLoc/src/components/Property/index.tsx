import React, { useState, useEffect } from "react";

import {
  Container,
  InfoView,
  InfoTitle,
  InfoText,
  Title,
  Photo,
  PhotoTitle,
} from "./styles";
import api from "../../services/api";
import { AxiosResponse } from "axios";
import { PropertiesResponse } from "../../interfaces";
import { FlatList } from "react-native";

interface Props {
  id: number;
}

const Property: React.FC<Props> = ({ id }) => {
  const [property, setProperty] = useState({} as PropertiesResponse);

  async function fetchProperty() {
    try {
      const response: AxiosResponse<PropertiesResponse> = await api.get(
        `property/${id}`
      );
      setProperty(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProperty();
  }, [id]);

  return (
    <Container>
      <Title>Detalhes do imóvel</Title>
      <InfoView>
        <InfoTitle>Proprietário:</InfoTitle>
        <InfoText>{property.ownerName}</InfoText>
      </InfoView>

      <InfoView>
        <InfoTitle>Endereço:</InfoTitle>
        <InfoText>{property.address}</InfoText>
      </InfoView>

      <InfoView>
        <InfoTitle>Sobre o imóvel</InfoTitle>
        <InfoText>{property.description}</InfoText>
      </InfoView>
      <InfoView>
        <PhotoTitle>Photos</PhotoTitle>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={property.photos}
          keyExtractor={(item) => String(item.id)}
          horizontal
          renderItem={({ item }) => <Photo source={{ uri: item.url }} />}
        />
      </InfoView>
    </Container>
  );
};

export default Property;
