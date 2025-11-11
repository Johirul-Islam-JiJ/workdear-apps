import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useGetJobsCategoryQuery } from "@/store/features/jobs";
import { setJobPostFinalForm } from "@/store/slices/jobform";
import { JobCategory } from "@/types/Job";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import Button from "../libs/Button";
import { ThemedText } from "../libs/ThemedText";
import ButtonCardLoader from "./ButtonCardLoader";
import SelectSubCategoryModal from "./SelectSubCategoryModal";

type Props = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export type SubCategoryValue = {
  id: number | null;
  price: string | null;
};

const SelectCategory = ({ step, setStep }: Props) => {
  const { jobPostFinalForm } = useAppSelector((state) => state.jobForm);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    jobPostFinalForm.job_category_id
  );
  const { data: categories, isLoading } = useGetJobsCategoryQuery();
  const dispatch = useAppDispatch();
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategoryValue>({
      id: jobPostFinalForm.job_sub_category_id,
      price: jobPostFinalForm.minimum_pay,
    });

  const handleNext = () => {
    dispatch(
      setJobPostFinalForm({
        ...jobPostFinalForm,
        job_category_id: selectedCategory,
        job_sub_category_id: selectedSubCategory.id,
        minimum_pay: selectedSubCategory.price,
      })
    );
    setStep(step + 1);
  };

  return (
    <View
      style={{
        justifyContent: "space-between",
        paddingBottom: 15,
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
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
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
          disabled={!selectedCategory || !selectedSubCategory.id}
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
  selectedCategory: number | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>>;
  selectedSubCategory: SubCategoryValue;
  setSelectedSubCategory: React.Dispatch<
    React.SetStateAction<SubCategoryValue>
  >;
};

function Category({
  category,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
}: CategoryProp) {
  const [visible, setVisible] = useState(0);

  function handleSelect() {
    setSelectedCategory(category.id);
    setVisible(1);
    if (category.id !== selectedCategory) {
      setSelectedSubCategory({
        id: null,
        price: null,
      });
    }
  }

  return (
    <>
      <Button
        onPress={handleSelect}
        title={category.category_name}
        variant={category.id === selectedCategory ? "contained" : "outlined"}
      />

      {!!visible && (
        <SelectSubCategoryModal
          category={category.sub_categories}
          selected={selectedSubCategory}
          setSelected={setSelectedSubCategory}
          visible={visible}
          setVisible={setVisible}
        />
      )}
    </>
  );
}

export default SelectCategory;
