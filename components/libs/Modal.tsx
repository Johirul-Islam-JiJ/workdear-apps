import React from "react";
import { Modal as RNModal, View } from "react-native";

type Props = {
  visible: number;
  setVisible: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
};

const Modal = ({ visible, setVisible, children }: Props) => {
  return (
    <RNModal
      visible={visible ? true : false}
      onRequestClose={() => setVisible(0)}
      animationType="fade"
      transparent
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <View
          style={{
            width: "90%",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 15,
          }}
        >
          {children}
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;
