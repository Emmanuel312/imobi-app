import styled from "styled-components/native";
import { Marker } from "react-native-maps";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const Container = styled(Marker)``;

export const CustomMarker = styled.Image`
  width: ${wp("10%")}px;
  height: ${wp("10%")}px;
`;
