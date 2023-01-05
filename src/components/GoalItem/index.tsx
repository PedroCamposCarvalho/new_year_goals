import React, { useCallback, useState, useMemo } from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ProgressBar } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import { Goals } from '@app/store/ducks/repositories/types';
import colors from '@app/utils/colors';
import EditGoalModal from '@app/components/EditGoalModal';
import {
  Container,
  GoalHeader,
  IconContainer,
  GoalDetails,
  GoalName,
  GoalMissingAmount,
  ButtonsContainer,
  EditButton,
  DeleteButton,
  ProgressContainer,
  ProgressValuesContainer,
  ProgressValue,
} from './styles';

interface PageProps {
  goal: Goals;
  loadGoals: (data: Goals[]) => void;
}

const GoalItem: React.FC<PageProps> = ({ goal, loadGoals }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);

  const description = useMemo(() => {
    if (goal.type.name === 'car') {
      return goal.value;
    }
    return `${Number(goal.value) - Number(goal.amount)} to go`;
  }, [goal]);

  const deleteGoals = useCallback(() => {
    AsyncStorage.getItem('StoredGoals').then(response => {
      if (response) {
        loadGoals(JSON.parse(response).filter(i => i.id !== goal.id));
      }
    });
  }, []);

  const handleDeleteGoal = useCallback(() => {
    Alert.alert(
      'Delete goal',
      'Do you really want to delete this goal?',
      [
        {
          style: 'destructive',
          text: 'No',
        },
        {
          style: 'default',
          text: 'Yes',
          onPress: () => {
            deleteGoals();
          },
        },
      ],
      { cancelable: false },
    );
  }, []);

  return (
    <Container
      style={{
        shadowColor: colors.darkGrey,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
      }}
    >
      <GoalHeader>
        <IconContainer>
          <MaterialIcon
            name={goal.type.icon}
            color={colors.blue}
            size={RFValue(20)}
          />
        </IconContainer>
        <GoalDetails>
          <GoalName>{goal.type.label}</GoalName>
          <GoalMissingAmount>{description}</GoalMissingAmount>
        </GoalDetails>
        <ButtonsContainer>
          <EditButton onPress={() => setEditModalOpen(true)}>
            <MaterialIcon name="edit" color={colors.white} size={RFValue(15)} />
          </EditButton>
          <DeleteButton onPress={() => handleDeleteGoal()}>
            <MaterialIcon
              name="delete"
              color={colors.white}
              size={RFValue(15)}
            />
          </DeleteButton>
        </ButtonsContainer>
      </GoalHeader>
      {goal.type.name !== 'car' && (
        <ProgressContainer>
          <ProgressBar progress={Number(goal.amount)} color={colors.blue} />
          <ProgressValuesContainer>
            <ProgressValue>0</ProgressValue>
            <ProgressValue>{goal.value}</ProgressValue>
          </ProgressValuesContainer>
        </ProgressContainer>
      )}
      <Modal isVisible={editModalOpen}>
        <EditGoalModal goal={goal} closeModal={() => setEditModalOpen(false)} />
      </Modal>
    </Container>
  );
};

export default GoalItem;
