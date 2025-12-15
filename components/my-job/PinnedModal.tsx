import { useMyJobsData } from "@/hooks/useMyJobsData";
import React from "react";
import Modal from "../libs/Modal";
import { ThemedText } from "../libs/ThemedText";

type Props = {
  visible: number;
  setVisible: React.Dispatch<React.SetStateAction<number>>;
};

const PinnedModal = ({ visible, setVisible }: Props) => {
  const { handlePin, isPinningJob } = useMyJobsData();
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <ThemedText>Pin your job</ThemedText>
    </Modal>
  );
};

export default PinnedModal;
