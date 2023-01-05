import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '@app/utils/colors';
import { darken } from 'polished';

interface ItemButtonProps {
  selected: boolean;
}

export const Container = styled.View`
  height: ${RFValue(500)};
  background: ${colors.grey};
  border-radius: ${RFValue(8)};
  align-items: center;
`;

export const Header = styled.View`
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
  width: 80%;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: 'Ubuntu-Regular';
  font-size: ${RFValue(18)};
  color: ${colors.darkGrey};
`;

export const CloseButton = styled.TouchableOpacity`
  height: ${RFValue(30)};
  width: ${RFValue(30)};
  align-items: center;
  justify-content: center;
  background: ${colors.red};
  border-radius: ${RFValue(50)};
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  padding-top: ${RFValue(16)};
  padding-bottom: ${RFValue(16)};
`;

export const GoalTypeContainer = styled.View`
  width: 90%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const GoalTypeItem = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: ${RFValue(75)};
  width: ${RFValue(75)};
  border-radius: ${RFValue(8)};
`;

export const GoalItemIconContainer = styled.View<ItemButtonProps>`
  background: ${props =>
    props.selected ? darken(0.001, colors.blue) : colors.lightBlue};
  height: ${RFValue(45)};
  width: ${RFValue(45)};
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(12)};
`;

export const GoalTypeName = styled.Text`
  font-family: 'Ubuntu-Regular';
  font-size: ${RFValue(10)};
  color: ${colors.darkGrey};
  margin-top: ${RFValue(8)};
`;

export const DateSelectorContainer = styled.View`
  width: 80%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(14)};
`;

export const SelectDateLabel = styled.Text`
  font-family: 'Ubuntu-Regular';
  font-size: ${RFValue(14)};
  color: ${colors.darkGrey};
`;

export const AndroidDateButton = styled.TouchableOpacity`
  background: ${colors.blue};
  width: 40%;
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(30)};
`;

export const AndroidDateButtonText = styled.Text`
  color: #fff;
  font-family: 'RobotoSlab-Medium';
`;

export const InputContainer = styled.View`
  width: 80%;
  margin-top: ${RFValue(20)};
`;

export const InputLabel = styled.Text`
  font-family: 'Ubuntu-Regular';
  font-size: ${RFValue(14)};
  color: ${colors.darkGrey};
  width: 100%;
`;

export const ValueInput = styled.TextInput`
  background: ${colors.grey};
  width: 100%;
  height: ${RFValue(40)};
  margin-top: ${RFValue(14)};
  padding-left: ${RFValue(8)};
  border-radius: ${RFValue(8)};
  border-width: ${RFValue(1)};
  border-color: ${colors.darkGrey};
`;

export const SaveButton = styled.TouchableOpacity`
  background: ${colors.blue};
  width: 80%;
  height: ${RFValue(40)};
  margin-top: auto;
  border-radius: ${RFValue(8)};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const SaveButtonText = styled.Text`
  color: #fff;
  font-size: ${RFValue(18)};
`;
