import Button from "@/components/libs/Button";
import { DropdownMenu } from "@/components/libs/DropdownMenu";
import { ThemedText } from "@/components/libs/ThemedText";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useGetJobsCategoryQuery } from "@/store/features/jobs";
import { setJobPostFinalForm } from "@/store/slices/jobform";
import { JobCategory } from "@/types/Job";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import ButtonCardLoader from "./ButtonCardLoader";

type Props = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

type SelectedCategory = {
  category: number | null;
  subCategory: number | null;
  price: string | null;
};

const SelectCategory = ({ step, setStep }: Props) => {
  const { data: categories, isLoading } = useGetJobsCategoryQuery();
  const { jobPostFinalForm } = useAppSelector((state) => state.jobForm);
  const dispatch = useAppDispatch();

  const initialSelection = {
    category: jobPostFinalForm.job_category_id,
    subCategory: jobPostFinalForm.job_sub_category_id,
    price: jobPostFinalForm.minimum_pay,
  };
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory>(initialSelection);

  const handleNext = () => {
    dispatch(
      setJobPostFinalForm({
        ...jobPostFinalForm,
        job_category_id: selectedCategory.category,
        job_sub_category_id: selectedCategory.subCategory,
        minimum_pay: selectedCategory.price,
      })
    );
    setStep(step + 1);
  };

  return (
    <View
      style={{
        justifyContent: "space-between",
        gap: 15,
        flex: 1,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          gap: 7,
        }}
        style={{ flex: 1 }}
      >
        <ThemedText
          variant="bodySemiBold"
          color="primarydarker"
          darkColor="white"
          style={{ marginBottom: 10 }}
        >
          Please select a category to continue
        </ThemedText>

        {isLoading ? (
          <ButtonCardLoader />
        ) : categories?.data?.length ? (
          categories?.data.map((category) => (
            <Category
              key={category.id}
              category={category}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          ))
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ThemedText color="gray.800" darkColor="gray.300">
              Category not found
            </ThemedText>
          </View>
        )}
      </ScrollView>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Button
          disabled={step === 0}
          onPress={() => setStep(step - 1)}
          title="Previews"
          variant="outlined"
          style={{ flex: 1 }}
        />
        <Button
          disabled={!selectedCategory.category || !selectedCategory.subCategory}
          title="Next"
          style={{ flex: 1 }}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

type CategoryProp = {
  category: JobCategory;
  selectedCategory: SelectedCategory;
  setSelectedCategory: React.Dispatch<React.SetStateAction<SelectedCategory>>;
};

function Category({
  category,
  selectedCategory,
  setSelectedCategory,
}: CategoryProp) {
  const subCategoryOptions = category.sub_categories.map((subCategory) => ({
    label: subCategory.sub_category_name,
    value: subCategory.id.toString(),
    price: subCategory.minimum_pay,
  }));

  const handleSelect = (value: string) => {
    const price =
      subCategoryOptions.find((item) => item.value === value)?.price ?? null;
    setSelectedCategory({
      category: category.id,
      subCategory: parseInt(value),
      price: price,
    });
  };

  return (
    <DropdownMenu
      items={subCategoryOptions}
      onSelect={handleSelect}
      value={selectedCategory.subCategory?.toString()}
      placeholder={category.category_name}
      title="Select sub category"
      border
      multiple
      variant={
        selectedCategory.category === category.id ? "contained" : "outlined"
      }
    />
  );
}

export default SelectCategory;
