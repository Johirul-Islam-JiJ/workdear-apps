import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import Button from "../libs/Button";
import Modal from "../libs/Modal";
import { ThemedText } from "../libs/ThemedText";

const SelectCountry = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [visible, setVisible] = useState(0);

  const countries = [
    {
      id: 1,
      continent: "Africa",
      contries: [
        { label: "Egypt", value: 13 },
        { label: "Morocco", value: 14 },
        { label: "Algeria", value: 15 },
        { label: "Tunisia", value: 16 },
        { label: "Libya", value: 17 },
        { label: "Sudan", value: 18 },
        { label: "Ethiopia", value: 19 },
        { label: "Kenya", value: 20 },
        { label: "Tanzania", value: 21 },
        { label: "Uganda", value: 22 },
        { label: "Rwanda", value: 23 },
        { label: "Burundi", value: 24 },
        { label: "Somalia", value: 25 },
        { label: "Djibouti", value: 26 },
        { label: "Eritrea", value: 27 },
        { label: "South Sudan", value: 28 },
        { label: "Nigeria", value: 29 },
        { label: "Ghana", value: 30 },
        { label: "Cameroon", value: 31 },
        { label: "Congo", value: 32 },
        { label: "South Africa", value: 33 },
        { label: "Zambia", value: 34 },
        { label: "Zimbabwe", value: 35 },
        { label: "Mozambique", value: 36 },
        { label: "Angola", value: 37 },
        { label: "Namibia", value: 38 },
        { label: "Botswana", value: 39 },
        { label: "Malawi", value: 40 },
        { label: "Lesotho", value: 41 },
        { label: "Mauritius", value: 42 },
        { label: "Mali", value: 43 },
        { label: "Senegal", value: 44 },
        { label: "Guinea", value: 45 },
      ],
    },
    {
      id: 2,
      continent: "Asia",
      contries: [
        { label: "India", value: 1 },
        { label: "Pakistan", value: 2 },
        { label: "Bangladesh", value: 3 },
        { label: "Nepal", value: 4 },
      ],
    },
    {
      id: 3,
      continent: "Europe",
      contries: [
        { label: "Germany", value: 5 },
        { label: "France", value: 6 },
        { label: "Italy", value: 7 },
        { label: "Spain", value: 8 },
      ],
    },
    {
      id: 4,
      continent: "America",
      contries: [
        { label: "United States", value: 9 },
        { label: "Canada", value: 10 },
        { label: "Mexico", value: 11 },
        { label: "Brazil", value: 12 },
      ],
    },
  ];

  return (
    <View style={{ flex: 1, flexDirection: "column", gap: 7 }}>
      {countries.map((continent) => {
        const hasSelected = continent.contries.some((c) =>
          selected.includes(c.value)
        );

        return (
          <Button
            onPress={() => setVisible(continent.id)}
            key={continent.id}
            title={continent.continent}
            variant={hasSelected ? "Contained" : "Outlined"}
          />
        );
      })}

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
            {countries
              .find((country) => country.id === visible)
              ?.contries.map((country, index) => (
                <Button
                  style={{ width: "49%" }}
                  onPress={() => {
                    setSelected(
                      selected.includes(country.value)
                        ? selected.filter((item) => item !== country.value)
                        : selected.concat(country.value)
                    );
                  }}
                  key={index}
                  title={country.label}
                  variant={
                    selected.includes(country.value) ? "Contained" : "Outlined"
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
          <Button
            onPress={() => setVisible(0)}
            title="Cancel"
            variant="Outlined"
          />
          <Button onPress={() => setVisible(0)} title="Done" />
        </View>
      </Modal>
    </View>
  );
};

export default SelectCountry;
