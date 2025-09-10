import { useGetcontinentQuery } from "@/store/features/jobs";
import { Continent } from "@/types/Job";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import Button from "../libs/Button";
import { ThemedText } from "../libs/ThemedText";
import ButtonCardLoader from "./ButtonCardLoader";
import SelectCountryModal from "./SelectCountryModal";

type Props = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const SelectCountry = ({ step, setStep }: Props) => {
  const [selected, setSelected] = useState<number[]>([]);
  const { data: countryData, isLoading } = useGetcontinentQuery();

  useEffect(() => {
    const countryIds = countryData?.data
      .map((c) => c.countries.map((c) => c.id))
      .flat();
    if (countryIds) {
      setSelected(countryIds);
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        paddingBottom: 15,
      }}
    >
      <ScrollView contentContainerStyle={{ gap: 7 }} style={{ flex: 1 }}>
        <ThemedText type="defaultSemiBold" color="primaryDarker">
          Select country you want to hide from the selected zone (optional)
        </ThemedText>
        {isLoading ? (
          <ButtonCardLoader />
        ) : countryData?.data.length ? (
          countryData?.data.map((continent) => (
            <ContinentList
              key={continent.id}
              continent={continent}
              selected={selected}
              setSelected={setSelected}
            />
          ))
        ) : (
          <ThemedText
            style={{ textAlign: "center", marginVertical: 10 }}
            color="placeHolder"
          >
            No countries found
          </ThemedText>
        )}
      </ScrollView>
      <View style={{ alignItems: "flex-end" }}>
        <Button
          title="Next"
          style={{ width: "50%" }}
          onPress={() => setStep(step + 1)}
        />
      </View>
    </View>
  );
};

type ContinentListProps = {
  continent: Continent;
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
};

function ContinentList({
  continent,
  selected,
  setSelected,
}: ContinentListProps) {
  const [visible, setVisible] = useState(0);
  const hasSelected = continent.countries.some((c) => !selected.includes(c.id));

  return (
    <>
      <Button
        onPress={() => setVisible(continent.id)}
        title={continent.country_category_name}
        variant={hasSelected ? "Contained" : "Outlined"}
      />
      <SelectCountryModal
        visible={visible}
        setVisible={setVisible}
        countries={continent.countries}
        selected={selected}
        setSelected={setSelected}
        checkWhenInclude={false}
      />
    </>
  );
}

export default SelectCountry;
