import { Country } from "@/types/Job";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import Button from "../libs/Button";
import Modal from "../libs/Modal";
import { ThemedText } from "../libs/ThemedText";

type Props = {
  visible: number;
  setVisible: React.Dispatch<React.SetStateAction<number>>;
  countries: Country[];
  countryIds: number[];
  setCountryIds: React.Dispatch<React.SetStateAction<number[]>>;
};

const SelectCountryModal = ({
  visible,
  setVisible,
  countries,
  countryIds,
  setCountryIds,
}: Props) => {
  const [selected, setSelected] = useState<number[]>(countryIds);

  function handleClear() {
    if (!selected.length) {
      setVisible(0);
      return;
    }
    setSelected([]);
    setCountryIds([]);
    setVisible(0);
  }

  function handleCountrySelect() {
    setCountryIds(selected);
    setVisible(0);
  }

  function handleToggleId(id: number) {
    setSelected(
      selected.includes(id)
        ? selected.filter((item) => item !== id)
        : selected.concat(id)
    );
  }

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <ThemedText
        variant="subtitle"
        color="primarydarker"
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
          {countries.map((country, index) => {
            const isSelected = selected.includes(country.id);
            return (
              <Button
                key={index}
                style={{ minWidth: "49%" }}
                onPress={() => handleToggleId(country.id)}
                title={country.country_name}
                variant={isSelected ? "contained" : "outlined"}
              />
            );
          })}
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
          onPress={handleClear}
          title={selected.length > 0 ? "Reset" : "Cancel"}
          variant="outlined"
        />
        <Button onPress={handleCountrySelect} title="Done" />
      </View>
    </Modal>
  );
};

export default SelectCountryModal;
