import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const Container = styled.ScrollView`
  flex: 1;
  padding: ${hp("2%")}px;
`;

export const Title = styled.Text`
  font-weight: bold;
  color: gray;
  font-size: ${hp("3.5%")}px;
  align-self: center;
  margin-bottom: ${hp("3%")}px;
`;

export const InfoView = styled.View`
  margin-bottom: ${hp("2%")}px;
`;

export const InfoTitle = styled.Text`
  font-weight: bold;
  color: #ccc;
  font-size: ${hp("2.5%")}px;
  margin-bottom: ${hp("2%")}px;
`;

export const PhotoTitle = styled.Text`
  align-self: center;
  font-weight: bold;
  color: #ccc;
  font-size: ${hp("3%")}px;
  margin-bottom: ${hp("5%")}px;
`;

export const InfoText = styled.Text`
  font-weight: bold;
`;
export const Photo = styled.Image`
  height: ${hp("10%")}px;
  width: ${hp("10%")}px;
  margin-left: ${wp("5%")}px;
`;
