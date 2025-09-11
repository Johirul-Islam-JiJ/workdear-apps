import { SingleJobSubCategory } from "@/types/Job";
import React from "react";
import { ScrollView, View } from "react-native";
import Button from "../libs/Button";
import Modal from "../libs/Modal";
import { ThemedText } from "../libs/ThemedText";

type Props = {
  visible: number;
  setVisible: React.Dispatch<React.SetStateAction<number>>;
  category: SingleJobSubCategory[];
  selected: number | null;
  setSelected: React.Dispatch<React.SetStateAction<number | null>>;
};

const SelectSubCategoryModal = ({
  visible,
  setVisible,
  category,
  selected,
  setSelected,
}: Props) => {
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <ThemedText
        type="subtitle"
        color="primaryDarker"
        style={{ textAlign: "center", marginBottom: 15 }}
      >
        Select Category
      </ThemedText>

      <ScrollView style={{ maxHeight: 400 }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            rowGap: 7,
            justifyContent: "space-between",
          }}
        >
          {category.map((item, index) => (
            <Button
              key={index}
              style={{ minWidth: "49%" }}
              onPress={() => {
                setSelected(selected !== item.id ? item.id : null);
                setVisible(0);
              }}
              title={item.sub_category_name}
              variant={selected === item.id ? "Contained" : "Outlined"}
            />
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 7,
          marginTop: 15,
        }}
      >
        <Button
          onPress={() => {
            setSelected(null);
            setVisible(0);
          }}
          title="Cancel"
          variant="Contained"
          color="error"
        />
      </View>
    </Modal>
  );
};

export default SelectSubCategoryModal;
