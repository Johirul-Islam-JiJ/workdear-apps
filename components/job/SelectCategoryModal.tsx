import { CategoryState } from "@/app/(mainLayout)/(tabs)/jobs";
import { JobCategory } from "@/types/Job";
import React from "react";
import { ScrollView, View } from "react-native";
import Button from "../libs/Button";
import Modal from "../libs/Modal";
import { ThemedText } from "../libs/ThemedText";

type Props = {
  visible: number;
  setVisible: React.Dispatch<React.SetStateAction<number>>;
  category: JobCategory[];
  selected: CategoryState;
  setSelected: React.Dispatch<React.SetStateAction<CategoryState>>;
};

const SelectCategoryModal = ({
  visible,
  setVisible,
  category,
  selected,
  setSelected,
}: Props) => {
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <ThemedText
        variant="subtitle"
        color="primarydarker"
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
                setSelected(
                  selected.id !== item.id
                    ? { id: item.id, name: item.category_name }
                    : { id: null, name: null }
                );
                setVisible(0);
              }}
              title={item.category_name}
              variant={selected.id === item.id ? "contained" : "outlined"}
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
            setSelected({ id: null, name: null });
            setVisible(0);
          }}
          title={selected.id ? "Reset" : "Cancel"}
          variant="outlined"
        />
        <Button onPress={() => setVisible(0)} title="Done" />
      </View>
    </Modal>
  );
};

export default SelectCategoryModal;
