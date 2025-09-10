import { useGetJobsCategoryQuery } from "@/store/features/jobs";
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

const SelectCategory = ({ step, setStep }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    null
  );
  const { data: categories, isLoading } = useGetJobsCategoryQuery();

  return (
    <View
      style={{
        justifyContent: "space-between",
        paddingBottom: 15,
        gap: 15,
        flex: 1,
      }}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={{ gap: 7 }}>
          <ThemedText type="defaultSemiBold" color="primaryDarker">
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
            <ThemedText
              color="placeHolder"
              style={{ textAlign: "center", marginVertical: 10 }}
            >
              Category not found
            </ThemedText>
          )}
        </View>
      </ScrollView>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Button
          disabled={step === 0}
          onPress={() => setStep(step - 1)}
          title="Previews"
          variant="Outlined"
          style={{ flex: 1 }}
        />
        <Button
          title="Next"
          style={{ flex: 1 }}
          onPress={() => setStep(step + 1)}
        />
      </View>
    </View>
  );
};

type CategoryProp = {
  category: JobCategory;
  selectedCategory: number | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>>;
  selectedSubCategory: number | null;
  setSelectedSubCategory: React.Dispatch<React.SetStateAction<number | null>>;
};

function Category({
  category,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
}: CategoryProp) {
  const [visible, setVisible] = useState(0);

  return (
    <>
      <Button
        onPress={() => {
          setSelectedCategory(category.id);
          setSelectedSubCategory(null);
          setVisible(1);
        }}
        title={category.category_name}
        variant={category.id === selectedCategory ? "Contained" : "Outlined"}
      />

      <SelectSubCategoryModal
        category={category.sub_categories}
        selected={selectedSubCategory}
        setSelected={setSelectedSubCategory}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
}

export default SelectCategory;
