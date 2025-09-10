import { Country } from "@/types/Job";
import React from "react";
import { ScrollView, View } from "react-native";
import Button from "../libs/Button";
import Modal from "../libs/Modal";
import { ThemedText } from "../libs/ThemedText";

type Props = {
  visible: number;
  setVisible: React.Dispatch<React.SetStateAction<number>>;
  countries: Country[];
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  checkWhenInclude?: boolean;
};

const SelectCountryModal = ({
  visible,
  setVisible,
  countries,
  selected,
  setSelected,
  checkWhenInclude = true,
}: Props) => {
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <ThemedText
        type="subtitle"
        color="primaryDarker"
        style={{ textAlign: "center", marginBottom: 15 }}
      >
        Select Country
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
          {countries.map((country, index) => (
            <Button
              key={index}
              style={{ width: "49%" }}
              onPress={() => {
                setSelected(
                  selected.includes(country.id)
                    ? selected.filter((item) => item !== country.id)
                    : selected.concat(country.id)
                );
              }}
              title={country.country_name}
              variant={
                checkWhenInclude
                  ? selected.includes(country.id)
                    ? "Contained"
                    : "Outlined"
                  : !selected.includes(country.id)
                  ? "Contained"
                  : "Outlined"
              }
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
        {checkWhenInclude && (
          <Button
            onPress={() => {
              setSelected([]);
              setVisible(0);
            }}
            title="Clear All"
            variant="Outlined"
          />
        )}
        <Button onPress={() => setVisible(0)} title="Done" />
      </View>
    </Modal>
  );
};

export default SelectCountryModal;
