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
        { name: "Egypt", id: 13 },
        { name: "Morocco", id: 14 },
        { name: "Algeria", id: 15 },
        { name: "Tunisia", id: 16 },
        { name: "Libya", id: 17 },
        { name: "Sudan", id: 18 },
        { name: "Ethiopia", id: 19 },
        { name: "Kenya", id: 20 },
        { name: "Tanzania", id: 21 },
        { name: "Uganda", id: 22 },
        { name: "Rwanda", id: 23 },
        { name: "Burundi", id: 24 },
        { name: "Somalia", id: 25 },
        { name: "Djibouti", id: 26 },
        { name: "Eritrea", id: 27 },
        { name: "South Sudan", id: 28 },
        { name: "Nigeria", id: 29 },
        { name: "Ghana", id: 30 },
        { name: "Cameroon", id: 31 },
        { name: "Congo", id: 32 },
        { name: "South Africa", id: 33 },
        { name: "Zambia", id: 34 },
        { name: "Zimbabwe", id: 35 },
        { name: "Mozambique", id: 36 },
        { name: "Angola", id: 37 },
        { name: "Namibia", id: 38 },
        { name: "Botswana", id: 39 },
        { name: "Malawi", id: 40 },
        { name: "Lesotho", id: 41 },
        { name: "Mauritius", id: 42 },
        { name: "Mali", id: 43 },
        { name: "Senegal", id: 44 },
        { name: "Guinea", id: 45 },
      ],
    },
    {
      id: 2,
      continent: "Asia",
      contries: [
        { name: "India", id: 1 },
        { name: "Pakistan", id: 2 },
        { name: "Bangladesh", id: 3 },
        { name: "Nepal", id: 4 },
      ],
    },
    {
      id: 3,
      continent: "Europe",
      contries: [
        { name: "Germany", id: 5 },
        { name: "France", id: 6 },
        { name: "Italy", id: 7 },
        { name: "Spain", id: 8 },
      ],
    },
    {
      id: 4,
      continent: "America",
      contries: [
        { name: "United States", id: 9 },
        { name: "Canada", id: 10 },
        { name: "Mexico", id: 11 },
        { name: "Brazil", id: 12 },
      ],
    },
  ];

  return (
    <View style={{ flex: 1, flexDirection: "column", gap: 7 }}>
      <ThemedText type="defaultSemiBold" color="primaryDarker">
        Select country you want to hide from the selected zone (optional)
      </ThemedText>
      {countries.map((continent) => {
        const hasSelected = continent.contries.some((c) =>
          selected.includes(c.id)
        );

        return (
          <Button
            key={continent.id}
            onPress={() => setVisible(continent.id)}
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
                  key={index}
                  style={{ width: "49%" }}
                  onPress={() => {
                    setSelected(
                      selected.includes(country.id)
                        ? selected.filter((item) => item !== country.id)
                        : selected.concat(country.id)
                    );
                  }}
                  title={country.name}
                  variant={
                    selected.includes(country.id) ? "Contained" : "Outlined"
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
