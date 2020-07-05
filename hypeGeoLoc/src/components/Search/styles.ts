import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const Container = styled.View`
  position: absolute;
  top: ${hp("7%")}px;
  align-self: center;
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.TextInput`
  background: rgba(255, 255, 255, 0.3);
  height: ${hp("7%")}px;
  width: ${wp("80%")}px;
  border-radius: ${hp("5%")}px;
  padding: 0 ${wp("3%")}px;
  margin-right: ${wp("1%")}px;
  color: #fff;
`;

export const IconView = styled.TouchableOpacity`
  background: rgba(255, 255, 255, 0.3);
  height: ${hp("7%")}px;
  width: ${hp("7%")}px;
  border-radius: ${hp("3.5%")}px;
  justify-content: center;
  align-items: center;
`;
