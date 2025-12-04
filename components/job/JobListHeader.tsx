import {
  useGetcountryQuery,
  useGetJobsCategoryQuery,
} from "@/store/features/jobs";
import React from "react";
import { View } from "react-native";
import { DropdownMenu } from "../libs/DropdownMenu";

type Props = {
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const JobListHeader = ({
  selectedCountry,
  setSelectedCountry,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  const { data: categories } = useGetJobsCategoryQuery();
  const { data: countries } = useGetcountryQuery();

  const countriesData = countries?.data || [];
  const countriesOption = countriesData.map((item) => {
    return {
      value: item.id.toString(),
      label: item.country_name,
    };
  });
  countriesOption.unshift({ value: "", label: "All" });
  const categoriesData = categories?.data || [];
  const categoriesOption = categoriesData.map((item) => {
    return {
      value: item.id.toString(),
      label: item.category_name,
    };
  });
  categoriesOption.unshift({ value: "", label: "All" });

  return (
    <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
      <DropdownMenu
        items={categoriesOption}
        onSelect={setSelectedCategory}
        placeholder="Select category"
        value={selectedCategory}
        border
      />

      <DropdownMenu
        items={countriesOption}
        onSelect={setSelectedCountry}
        placeholder="Select country"
        value={selectedCountry}
        border
      />
    </View>
  );
};

export default JobListHeader;
