import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import colors from '@app/utils/colors';
import AddGoalModal from './AddGoalModal';
import { Container } from './styles';

interface PageProps {
  onPress: any;
}

const TabBarItem: React.FC<PageProps> = ({ onPress }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Container onPress={() => setModalOpen(true)}>
      <FeatherIcon name="plus" color={colors.white} size={RFValue(24)} />
      <Modal isVisible={modalOpen}>
        <AddGoalModal closeModal={() => setModalOpen(false)} />
      </Modal>
    </Container>
  );
};

export default TabBarItem;
