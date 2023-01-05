import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '@app/utils/colors';

export const Container = styled.View`
  margin-top: ${RFValue(8)};
  margin-bottom: ${RFValue(8)};
  background: ${colors.white};
  border-radius: ${RFValue(8)};
  padding-left: ${RFValue(16)};
  padding-right: ${RFValue(16)};
  padding-top: ${RFValue(20)};
  padding-bottom: ${RFValue(20)};
`;

export const GoalHeader = styled.View`
  flex-direction: row;
`;

export const IconContainer = styled.View`
  background: ${colors.lightBlue};
  height: ${RFValue(45)};
  width: ${RFValue(45)};
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(12)};
`;

export const GoalDetails = styled.View`
  margin-left: ${RFValue(14)};
  padding-top: ${RFValue(2)};
  width: 40%;
`;

export const GoalName = styled.Text`
  font-family: 'Ubuntu-bold';
  font-size: ${RFValue(14)};
  color: ${colors.black};
`;

export const GoalMissingAmount = styled.Text`
  font-family: 'Ubuntu-Regular';
  font-size: ${RFValue(14)};
  color: ${colors.darkGrey};
  margin-top: ${RFValue(4)};
`;

export const ButtonsContainer = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  width: 39%;
`;

export const EditButton = styled.TouchableOpacity`
  background: ${colors.green};
  align-items: center;
  justify-content: center;
  height: ${RFValue(30)};
  width: ${RFValue(30)};
  border-radius: ${RFValue(20)};
  margin-right: ${RFValue(8)};
`;

export const DeleteButton = styled.TouchableOpacity`
  background: ${colors.red};
  align-items: center;
  justify-content: center;
  height: ${RFValue(30)};
  width: ${RFValue(30)};
  border-radius: ${RFValue(20)};
`;

export const ProgressContainer = styled.View`
  margin-top: ${RFValue(24)};
  flex-direction: column;
`;

export const ProgressValuesContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(8)};
`;

export const ProgressValue = styled.Text`
  color: ${colors.darkGrey};
`;
