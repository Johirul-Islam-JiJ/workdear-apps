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
    <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
      <Button
        onPress={() => setShowCategoryModal(1)}
        variant={category.id ? "contained" : "outlined"}
        title={category.name ? category.name : "Select Category"}
      />
      <Button
        onPress={() => setShowCountryModal(1)}
        variant={countryIds.length > 0 ? "contained" : "outlined"}
        title={
          countryIds.length > 0
            ? `${countryIds.length} Selected`
            : "Select Country"
        }
      />

      {!!showCountryModal && (
        <SelectCountryModal
          visible={showCountryModal}
          setVisible={setShowCountryModal}
          countries={countries?.data || []}
          countryIds={countryIds}
          setCountryIds={setCountryIds}
          highlightOnSelect={true}
        />
      )}
      {!!showCategoryModal && (
        <SelectCategoryModal
          visible={showCategoryModal}
          setVisible={setShowCategoryModal}
          category={categories?.data || []}
          selected={category}
          setSelected={setCategory}
        />
      )}
    </View>
  );
};

export default JobListHeader;
