import React, { useCallback, useState } from 'react';
import { Platform, Keyboard, Switch } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import { ApllicationState } from '@app/store';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { bindActionCreators, Dispatch } from 'redux';
import * as RepositoriesActions from '@app/store/ducks/repositories/actions';
import AsyncStorage from '@react-native-community/async-storage';
import { Goals } from '@app/store/ducks/repositories/types';
import IGoalsTypes from '@app/interfaces/IGoalsTypes';
import colors from '@app/utils/colors';
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
  CompletedContainer,
  CompletedLabel,
  SaveButton,
  SaveButtonText,
} from './styles';

interface PageProps {
  goal: Goals;
  closeModal: () => void;
}

interface DispatchProps {
  loadGoals(data: Goals[]): void;
}

type Props = PageProps & DispatchProps;

const AddGoalModal: React.FC<Props> = ({ goal, closeModal, loadGoals }) => {
  const [selectedType, setSelectedType] = useState<IGoalsTypes>(goal.type);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(goal.date));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [completed, setCompleted] = useState(goal.completed);
  const [inputValue, setInputValue] = useState(goal.value);
  const [progressAmount, setProgressAmount] = useState(goal.amount);

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

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state);
  }, []);

  const handleSubmit = useCallback(() => {
    AsyncStorage.getItem('StoredGoals').then(response => {
      if (response) {
        const goals: Goals[] = JSON.parse(response);
        const index = goals.findIndex(i => i.id === goal.id);

        goals[index].type = selectedType;
        goals[index].date = selectedDate;
        goals[index].value = inputValue;
        goals[index].amount = progressAmount;
        goals[index].completed = completed;

        loadGoals(goals);
        AsyncStorage.setItem('StoredGoals', JSON.stringify(goals));
      }
    });
    closeModal();
  }, [
    closeModal,
    loadGoals,
    selectedType,
    selectedDate,
    inputValue,
    progressAmount,
    completed,
    goal,
  ]);

  return (
    <Container onStartShouldSetResponder={() => Keyboard.dismiss()}>
      <Header>
        <Title>Edit goal</Title>
        <CloseButton onPress={() => closeModal()}>
          <MaterialCommunityIcon name="close" color="#fff" size={RFValue(20)} />
        </CloseButton>
      </Header>
      <Content>
        <GoalTypeContainer>
          {goalsTypes.map(item => (
            <GoalTypeItem onPress={() => setSelectedType(item)}>
              <GoalItemIconContainer selected={selectedType.name === item.name}>
                <MaterialIcon
                  name={item.icon}
                  color={
                    selectedType.name === item.name ? colors.white : colors.blue
                  }
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
              {goal.type.name !== 'car' && (
                <ValueInput
                  placeholder="Your progress so far"
                  keyboardType={selectedType.keyboardType}
                  value={progressAmount}
                  onChangeText={setProgressAmount}
                />
              )}
            </InputContainer>
            <CompletedContainer>
              <CompletedLabel>Completed? </CompletedLabel>
              <Switch
                trackColor={{ false: colors.darkGrey, true: colors.green }}
                thumbColor={completed ? '#fff' : '#fff'}
                ios_backgroundColor={colors.darkGrey}
                onValueChange={() => setCompleted(!completed)}
                value={completed}
              />
            </CompletedContainer>
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
