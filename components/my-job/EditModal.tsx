import { useMyJobsData } from "@/hooks/useMyJobsData";
import React from "react";
import Modal from "../libs/Modal";
import { ThemedText } from "../libs/ThemedText";

type Props = {
  visible: number;
  setVisible: React.Dispatch<React.SetStateAction<number>>;
};

const EditModal = ({ visible, setVisible }: Props) => {
  const { handleUpdateJob, isUpdatingJob } = useMyJobsData();
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <ThemedText>Edit your job</ThemedText>
    </Modal>
  );
};

export default EditModal;
