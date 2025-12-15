import React from "react";
import { Pressable, Modal as RNModal, ViewStyle } from "react-native";
import { ThemedView } from "./ThemedView";

type Props = {
  visible: number;
  setVisible: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
  style?: ViewStyle;
};

const Modal = ({ visible, setVisible, children, style = {} }: Props) => {
  return (
    <RNModal
      visible={!!visible}
      onRequestClose={() => setVisible(0)}
      animationType="fade"
      transparent
    >
      <Pressable
        onPress={() => setVisible(0)}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <ThemedView
          color="card"
          style={{
            width: "90%",
            borderRadius: 10,
            padding: 15,
          }}
        >
          <Pressable style={style} onPress={(e) => e.stopPropagation()}>
            {children}
          </Pressable>
        </ThemedView>
      </Pressable>
    </RNModal>
  );
};

export default Modal;
