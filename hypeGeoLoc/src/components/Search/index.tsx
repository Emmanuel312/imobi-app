import React, { useState } from "react";
import { Container, Input, IconView } from "./styles";
import { EvilIcons } from "@expo/vector-icons";

interface Props {
  handleSearch(meters: string): void;
}

const Search: React.FC<Props> = ({ handleSearch }) => {
  const [meters, setMeters] = useState("");

  function handlePress() {
    handleSearch(meters);
    setMeters("");
  }
  return (
    <Container>
      <Input
        value={meters}
        onChangeText={setMeters}
        placeholder="Procurando imovel em quantos metros?"
      />
      <IconView onPress={handlePress}>
        <EvilIcons name="search" size={24} color="white" />
      </IconView>
    </Container>
  );
};

export default Search;
