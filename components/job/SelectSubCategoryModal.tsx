import { SingleJobSubCategory } from "@/types/Job";
import React from "react";
import { ScrollView, View } from "react-native";
import Button from "../libs/Button";
import Modal from "../libs/Modal";
import { ThemedText } from "../libs/ThemedText";
import { SubCategoryValue } from "./SelectCategory";

type Props = {
  visible: number;
  setVisible: React.Dispatch<React.SetStateAction<number>>;
  category: SingleJobSubCategory[];
  selected: SubCategoryValue;
  setSelected: React.Dispatch<React.SetStateAction<SubCategoryValue>>;
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
        variant="subtitle"
        color="primarydarker"
        darkColor="white"
        style={{ textAlign: "center", marginBottom: 15 }}
      >
        Select Sub Category
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
                    ? { id: item.id, price: item.minimum_pay }
                    : { id: null, price: null }
                );
                setVisible(0);
              }}
              title={item.sub_category_name}
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
          onPress={() => setVisible(0)}
          title="Cancel"
          variant="contained"
        />
      </View>
    </Modal>
  );
};

export default SelectSubCategoryModal;
