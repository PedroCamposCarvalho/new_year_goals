import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '@app/utils/colors';

interface FilterProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  padding-left: ${RFValue(16)};
  padding-right: ${RFValue(16)};
`;

export const Header = styled.View`
  height: ${RFValue(150)};
  flex-direction: row;
`;

export const GoalsCompletedContainer = styled.View`
  width: 70%;
  flex-direction: column;

  justify-content: center;
`;

export const GoalsCompletedLabel = styled.Text`
  font-family: 'Ubuntu-Regular';
  font-size: ${RFValue(16)};
  color: ${colors.darkGrey};
`;

export const GoalsCompletedValue = styled.Text`
  font-family: 'Ubuntu-Regular';
  font-size: ${RFValue(30)};
  color: ${colors.black};
  margin-left: ${RFValue(32)};
  margin-top: ${RFValue(8)};
`;

export const Avatar = styled.Image`
  width: 30%;
  height: ${RFValue(150)};
`;
export const Content = styled.View`
  flex: 1;
  flex-direction: column;
  margin-top: ${RFValue(16)};
`;

export const ContentHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const YourGoalsLabel = styled.Text`
  font-family: 'Ubuntu-Regular';
  font-size: ${RFValue(12)};
  color: ${colors.black};
`;

export const FiltersContainer = styled.View`
  flex-direction: row;
`;

export const FilterButton = styled.TouchableOpacity`
  margin-right: ${RFValue(8)};
`;

export const FilterButtonText = styled.Text<FilterProps>`
  font-family: 'Ubuntu-Regular';
  font-size: ${RFValue(12)}
  color: ${props => (props.selected ? colors.black : colors.lightGrey)};
  text-decoration: ${props => (props.selected ? 'underline' : 'none')};
  text-decoration-color: ${colors.blue};
`;
