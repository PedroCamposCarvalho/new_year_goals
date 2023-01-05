import React, { useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import GoalItem from '@app/components/GoalItem';
import avatar from '@app/assets/avatar.png';
import ActionButton from 'react-native-action-button';
import { FlatList } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import IconicIon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { ApllicationState } from '@app/store';
import { bindActionCreators, Dispatch } from 'redux';
import * as RepositoriesActions from '@app/store/ducks/repositories/actions';
import { Goals } from '@app/store/ducks/repositories/types';
import AsyncStorage from '@react-native-community/async-storage';
import colors from '@app/utils/colors';
import AddGoalModal from '@app/components/AddGoalModal';

import {
  Container,
  Header,
  GoalsCompletedContainer,
  GoalsCompletedLabel,
  GoalsCompletedValue,
  Avatar,
  Content,
  ContentHeader,
  YourGoalsLabel,
  FiltersContainer,
  FilterButton,
  FilterButtonText,
} from './styles';

interface StateProps {
  goals: Goals[];
}

interface DispatchProps {
  loadGoals(data: Goals[]): void;
  createGoal(data: Goals): void;
}

type Props = StateProps & DispatchProps;

const Home: React.FC<Props> = ({ goals, loadGoals, createGoal }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    AsyncStorage.getItem('StoredGoals').then(response => {
      if (response) {
        loadGoals(JSON.parse(response));
      }
    });
  }, []);

  return (
    <Container>
      <Header>
        <GoalsCompletedContainer>
          <GoalsCompletedLabel>You`ve already completed:</GoalsCompletedLabel>
          <GoalsCompletedValue>
            {goals.filter(i => i.completed).length}
          </GoalsCompletedValue>
        </GoalsCompletedContainer>
        <Avatar source={avatar} style={{ resizeMode: 'contain' }} />
      </Header>
      <Content>
        <ContentHeader>
          <YourGoalsLabel>Your goals</YourGoalsLabel>
          <FiltersContainer>
            <FilterButton
              onPress={() => {
                setSelectedFilter('All');
              }}
            >
              <FilterButtonText selected={selectedFilter === 'All'}>
                All
              </FilterButtonText>
            </FilterButton>
            <FilterButton
              onPress={() => {
                setSelectedFilter('Achieved');
              }}
            >
              <FilterButtonText selected={selectedFilter === 'Achieved'}>
                Achieved
              </FilterButtonText>
            </FilterButton>
          </FiltersContainer>
        </ContentHeader>
        <FlatList
          data={
            selectedFilter === 'All' ? goals : goals.filter(i => i.completed)
          }
          style={{ marginTop: RFValue(16) }}
          keyExtractor={item => String(item)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: goal }) => (
            <GoalItem
              key={goal.id}
              goal={goal}
              loadGoals={(data: Goals[]) => loadGoals(data)}
            />
          )}
        />
      </Content>
      <ActionButton buttonColor={colors.green}>
        <ActionButton.Item
          buttonColor={colors.blue}
          title="New goal"
          onPress={() => setModalOpen(true)}
        >
          <IconicIon name="md-create" color="#fff" size={RFValue(14)} />
        </ActionButton.Item>
      </ActionButton>
      <Modal isVisible={modalOpen}>
        <AddGoalModal closeModal={() => setModalOpen(false)} />
      </Modal>
    </Container>
  );
};

const mapStateToProps = (state: ApllicationState): any => ({
  goals: state.goals.data,
});

const mapDispatchToProps = (dispatch: Dispatch): any =>
  bindActionCreators(RepositoriesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
