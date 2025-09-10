import { CategoryState } from "@/app/(mainLayout)/(tabs)/jobs";
import {
  useGetcountryQuery,
  useGetJobsCategoryQuery,
} from "@/store/features/jobs";
import React, { useState } from "react";
import { View } from "react-native";
import Button from "../libs/Button";
import SelectCategoryModal from "./SelectCategoryModal";
import SelectCountryModal from "./SelectCountryModal";

type Props = {
  countryIds: number[];
  setCountryIds: React.Dispatch<React.SetStateAction<number[]>>;
  category: CategoryState;
  setCategory: React.Dispatch<React.SetStateAction<CategoryState>>;
};

const JobListHeader = ({
  countryIds,
  setCountryIds,
  category,
  setCategory,
}: Props) => {
  const [showCategoryModal, setShowCategoryModal] = useState(0);
  const [showCountryModal, setShowCountryModal] = useState(0);
  const { data: categories } = useGetJobsCategoryQuery();
  const { data: countries } = useGetcountryQuery();

  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <Button
        onPress={() => setShowCategoryModal(1)}
        style={{ flex: 1 }}
        title={category.name ? category.name : "Select Category"}
      />
      <Button
        onPress={() => setShowCountryModal(1)}
        style={{ flex: 1 }}
        title={
          countryIds.length > 0
            ? `${countryIds.length} Selected`
            : "Select Country"
        }
      />

      <SelectCountryModal
        visible={showCountryModal}
        setVisible={setShowCountryModal}
        countries={countries?.data || []}
        selected={countryIds}
        setSelected={setCountryIds}
      />
      <SelectCategoryModal
        visible={showCategoryModal}
        setVisible={setShowCategoryModal}
        category={categories?.data || []}
        selected={category}
        setSelected={setCategory}
      />
    </View>
  );
};

export default JobListHeader;
