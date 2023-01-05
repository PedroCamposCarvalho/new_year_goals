import React, { useCallback, useEffect, useState } from 'react';
import { Platform, Keyboard } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ApllicationState } from '@app/store';
import { bindActionCreators, Dispatch } from 'redux';
import * as RepositoriesActions from '@app/store/ducks/repositories/actions';
import { Goals } from '@app/store/ducks/repositories/types';
import IGoalsTypes from '@app/interfaces/IGoalsTypes';
import colors from '@app/utils/colors';
import makeId from '@app/utils/createRandomId';
import {
  Container,
  Header,
  Title,
  CloseButton,
  Content,
  GoalTypeContainer,
  GoalTypeItem,
  GoalItemIconContainer,
  GoalTypeName,
  DateSelectorContainer,
  SelectDateLabel,
  AndroidDateButton,
  AndroidDateButtonText,
  InputContainer,
  InputLabel,
  ValueInput,
  SaveButton,
  SaveButtonText,
} from './styles';

interface PageProps {
  closeModal: () => void;
}

interface DispatchProps {
  createGoal(data: Goals): void;
}

type Props = PageProps & DispatchProps;

const AddGoalModal: React.FC<Props> = ({ closeModal, createGoal }) => {
  const [selectedType, setSelectedType] = useState<IGoalsTypes>(
    {} as IGoalsTypes,
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [goalsTypes] = useState<IGoalsTypes[]>([
    {
      name: 'money',
      label: 'Save money',
      icon: 'monetization-on',
      inputLabel: 'How much do you want to save?',
      inputPlaceholder: 'Ex.: $ 1000.00',
      keyboardType: 'numeric',
    },
    {
      name: 'fitness',
      label: 'Lose weight',
      icon: 'fitness-center',
      inputLabel: 'How much weight do you want to loose?',
      inputPlaceholder: 'Ex.: 10 pounds',
      keyboardType: 'numeric',
    },
    {
      name: 'car',
      label: 'Buy a car',
      icon: 'time-to-leave',
      inputLabel: 'What is the car name?',
      inputPlaceholder: 'Ex.: Tesla',
      keyboardType: 'default',
    },
  ]);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      setShowDatePicker(false);
      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    createGoal({
      id: makeId(10),
      type: selectedType,
      date: selectedDate,
      value: inputValue,
      amount: '',
      completed: false,
    });
    closeModal();
  }, [closeModal, createGoal, selectedType, selectedDate, inputValue]);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state);
  }, []);

  useEffect(() => {
    setInputValue('');
  }, [selectedType]);

  return (
    <Container onStartShouldSetResponder={() => Keyboard.dismiss()}>
      <Header>
        <Title>New goal</Title>
        <CloseButton onPress={() => closeModal()}>
          <MaterialCommunityIcon name="close" color="#fff" size={RFValue(20)} />
        </CloseButton>
      </Header>
      <Content>
        <GoalTypeContainer>
          {goalsTypes.map(item => (
            <GoalTypeItem onPress={() => setSelectedType(item)}>
              <GoalItemIconContainer selected={selectedType === item}>
                <MaterialIcon
                  name={item.icon}
                  color={selectedType === item ? colors.white : colors.blue}
                  size={RFValue(20)}
                />
              </GoalItemIconContainer>
              <GoalTypeName>{item.label}</GoalTypeName>
            </GoalTypeItem>
          ))}
        </GoalTypeContainer>
        {selectedType.name > '' && (
          <>
            <DateSelectorContainer>
              <SelectDateLabel>Achievement date:</SelectDateLabel>
              {Platform.OS === 'ios' ? (
                <DateTimePicker
                  mode="date"
                  display="default"
                  value={selectedDate}
                  onChange={handleDateChanged}
                  locale="pt-BR"
                  style={{
                    borderRadius: 10,
                    height: 35,
                    width: RFValue(98),
                    backgroundColor: colors.grey,
                    alignItems: 'center',
                  }}
                />
              ) : (
                <>
                  <AndroidDateButton
                    onPress={() => {
                      handleToggleDatePicker();
                    }}
                  >
                    <AndroidDateButtonText>
                      {format(selectedDate, " dd'/'MM'/'yyyy", {
                        locale: ptBR,
                      })}
                    </AndroidDateButtonText>
                  </AndroidDateButton>
                  {showDatePicker && (
                    <DateTimePicker
                      display="calendar"
                      value={selectedDate}
                      onChange={handleDateChanged}
                    />
                  )}
                </>
              )}
            </DateSelectorContainer>
            <InputContainer>
              <InputLabel>{selectedType.inputLabel}</InputLabel>
              <ValueInput
                placeholder={selectedType.inputPlaceholder}
                keyboardType={selectedType.keyboardType}
                value={inputValue}
                onChangeText={setInputValue}
              />
            </InputContainer>
            <SaveButton onPress={() => handleSubmit()}>
              <SaveButtonText>Save</SaveButtonText>
            </SaveButton>
          </>
        )}
      </Content>
    </Container>
  );
};

const mapStateToProps = (state: ApllicationState): any => ({
  goals: state.goals.data,
});

const mapDispatchToProps = (dispatch: Dispatch): any =>
  bindActionCreators(RepositoriesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddGoalModal);
