import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useGetcontinentQuery } from "@/store/features/jobs";
import { setJobPostFinalForm } from "@/store/slices/jobform";
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
  const { jobPostFinalForm } = useAppSelector((state) => state.jobForm);
  const { data: countryData, isLoading } = useGetcontinentQuery();
  const [selected, setSelected] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const countries = countryData?.data ?? [];

  useEffect(() => {
    if (countries.length === 0) return;

    if (jobPostFinalForm.country_ids.length > 0) {
      setSelected(jobPostFinalForm.country_ids);
    } else {
      const countryIds = countries
        .map((c) => c.countries.map((c) => c.id))
        .flat();
      if (countryIds) {
        setSelected(countryIds);
      }
    }
  }, [countryData]);

  const handleNext = () => {
    setStep(step + 1);
    dispatch(
      setJobPostFinalForm({ ...jobPostFinalForm, country_ids: selected })
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        paddingBottom: 15,
      }}
    >
      <ScrollView contentContainerStyle={{ gap: 7 }} style={{ flex: 1 }}>
        <ThemedText
          variant="bodySemiBold"
          color="primarydarker"
          darkColor="white"
          style={{ marginBottom: 10 }}
        >
          Select country you want to hide from the selected zone (optional)
        </ThemedText>
        {isLoading ? (
          <ButtonCardLoader />
        ) : countries.length ? (
          countries.map((continent) => (
            <ContinentList
              key={continent.id}
              continent={continent}
              selected={selected}
              setSelected={setSelected}
            />
          ))
        ) : (
          <ThemedText
            color="gray.800"
            darkColor="gray.300"
            style={{ textAlign: "center", width: "100%" }}
          >
            No country found
          </ThemedText>
        )}
      </ScrollView>
      <View style={{ alignItems: "flex-end" }}>
        <Button title="Next" style={{ width: "50%" }} onPress={handleNext} />
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
  const countries = continent.countries;
  const hasSelected = countries.some((c) => !selected.includes(c.id));

  return (
    <>
      <Button
        onPress={() => setVisible(continent.id)}
        title={continent.country_category_name}
        variant={hasSelected ? "contained" : "outlined"}
      />
      {!!visible && (
        <SelectCountryModal
          visible={visible}
          setVisible={setVisible}
          countries={countries}
          countryIds={countries.length ? selected : []}
          setCountryIds={setSelected}
          highlightOnSelect={false}
        />
      )}
    </>
  );
}

export default SelectCountry;
