import React from "react";
import Modal from "../libs/Modal";
import { ThemedText } from "../libs/ThemedText";

type Props = {
  visible: number;
  setVisible: React.Dispatch<React.SetStateAction<number>>;
};

const BoostModal = ({ visible, setVisible }: Props) => {
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <ThemedText>Boost your job</ThemedText>
    </Modal>
  );
};

export default BoostModal;
