import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '@app/utils/colors';

export const Container = styled.TouchableOpacity`
  height: ${RFValue(50)};
  width: ${RFValue(50)};
  margin: auto;
  align-items: center;
  justify-content: center;
  background: ${colors.blue};
  border-radius: ${RFValue(40)};
`;
