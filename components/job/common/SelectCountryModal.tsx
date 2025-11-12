import Button from "@/components/libs/Button";
import Modal from "@/components/libs/Modal";
import { ThemedText } from "@/components/libs/ThemedText";
import { Country } from "@/types/Job";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";

type Props = {
  visible: number;
  setVisible: React.Dispatch<React.SetStateAction<number>>;
  countries: Country[];
  countryIds: number[];
  setCountryIds: React.Dispatch<React.SetStateAction<number[]>>;
  highlightOnSelect: boolean;
};

const SelectCountryModal = ({
  visible,
  setVisible,
  countries,
  countryIds,
  setCountryIds,
  highlightOnSelect,
}: Props) => {
  const [selected, setSelected] = useState<number[]>(countryIds);

  function handleClear() {
    if (!countryIds.length) {
      setVisible(0);
      return;
    }
    if (highlightOnSelect) {
      setSelected([]);
      setCountryIds([]);
    }
    setVisible(0);
  }

  function handleCountrySelect() {
    setCountryIds(selected);
    setVisible(0);
  }

  function handleToggleSelect(id: number) {
    const isSelected = selected.includes(id);
    setSelected(
      isSelected ? selected.filter((item) => item !== id) : selected.concat(id)
    );
  }

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <ThemedText
        variant="subtitle"
        color="primarydarker"
        darkColor="white"
        style={{ textAlign: "center", marginBottom: 20 }}
      >
        Select Country
      </ThemedText>

      <ScrollView style={{ maxHeight: 400 }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            rowGap: 10,
            justifyContent: "space-between",
          }}
        >
          {countries.length ? (
            countries.map((country, index) => {
              const isSelected = highlightOnSelect
                ? selected.includes(country.id)
                : !selected.includes(country.id);

              return (
                <Button
                  key={index}
                  style={{ minWidth: "49%" }}
                  onPress={() => handleToggleSelect(country.id)}
                  title={country.country_name}
                  variant={isSelected ? "contained" : "outlined"}
                />
              );
            })
          ) : (
            <ThemedText
              color="gray.800"
              darkColor="gray.300"
              style={{ textAlign: "center", width: "100%" }}
            >
              No country found
            </ThemedText>
          )}
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 10,
          marginTop: 25,
        }}
      >
        <Button
          onPress={handleClear}
          title={!!countryIds.length && highlightOnSelect ? "Reset" : "Cancel"}
          variant="outlined"
        />
        <Button onPress={handleCountrySelect} title="Done" />
      </View>
    </Modal>
  );
};

export default SelectCountryModal;
