import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import Button from "../libs/Button";
import Modal from "../libs/Modal";
import { ThemedText } from "../libs/ThemedText";

type Category = {
  category: string;
  id: number;
  subCategories: { name: string; id: number }[];
};

const SelectCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number>(0);

  const categories: Category[] = [
    {
      category: "Category 1",
      id: 1,
      subCategories: [
        { name: "Subcategory 1", id: 1 },
        { name: "Subcategory 2", id: 2 },
        { name: "Subcategory 3", id: 3 },
        { name: "Subcategory 4", id: 4 },
        { name: "Subcategory 5", id: 5 },
        { name: "Subcategory 6", id: 6 },
        { name: "Subcategory 7", id: 7 },
        { name: "Subcategory 8", id: 8 },
        { name: "Subcategory 9", id: 9 },
        { name: "Subcategory 10", id: 10 },
      ],
    },
    {
      category: "Category 2",
      id: 2,
      subCategories: [
        { name: "Subcategory 1", id: 11 },
        { name: "Subcategory 2", id: 12 },
        { name: "Subcategory 3", id: 13 },
        { name: "Subcategory 4", id: 14 },
        { name: "Subcategory 5", id: 15 },
        { name: "Subcategory 6", id: 16 },
        { name: "Subcategory 7", id: 17 },
        { name: "Subcategory 8", id: 18 },
        { name: "Subcategory 9", id: 19 },
        { name: "Subcategory 10", id: 20 },
      ],
    },
    {
      category: "Category 3",
      id: 3,
      subCategories: [
        { name: "Subcategory 1", id: 21 },
        { name: "Subcategory 2", id: 22 },
        { name: "Subcategory 3", id: 23 },
        { name: "Subcategory 4", id: 24 },
        { name: "Subcategory 5", id: 25 },
        { name: "Subcategory 6", id: 26 },
        { name: "Subcategory 7", id: 27 },
        { name: "Subcategory 8", id: 28 },
        { name: "Subcategory 9", id: 29 },
        { name: "Subcategory 10", id: 30 },
      ],
    },
    {
      category: "Category 4",
      id: 4,
      subCategories: [
        { name: "Subcategory 1", id: 31 },
        { name: "Subcategory 2", id: 32 },
        { name: "Subcategory 3", id: 33 },
        { name: "Subcategory 4", id: 34 },
        { name: "Subcategory 5", id: 35 },
        { name: "Subcategory 6", id: 36 },
        { name: "Subcategory 7", id: 37 },
        { name: "Subcategory 8", id: 38 },
        { name: "Subcategory 9", id: 39 },
        { name: "Subcategory 10", id: 40 },
      ],
    },
  ];

  return (
    <View style={{ flex: 1, flexDirection: "column", gap: 7 }}>
      <ThemedText type="defaultSemiBold" color="primaryDarker">
        Please select a category to continue
      </ThemedText>

      {categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
        />
      ))}
    </View>
  );
};

type CategoryProp = {
  category: Category;
  selectedCategory: number;
  setSelectedCategory: (id: number) => void;
  categories: Category[];
  selectedSubCategory: number;
  setSelectedSubCategory: (id: number) => void;
};

function Category({
  category,
  selectedCategory,
  setSelectedCategory,
  categories,
  selectedSubCategory,
  setSelectedSubCategory,
}: CategoryProp) {
  const [visible, setVisible] = useState(0);

  return (
    <>
      <Button
        onPress={() => {
          setSelectedCategory(category.id);
          setSelectedSubCategory(0);
          setVisible(1);
        }}
        title={category.category}
        variant={category.id === selectedCategory ? "Contained" : "Outlined"}
      />
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
            {categories
              .find((category) => category.id === selectedCategory)
              ?.subCategories.map((subCategory, index) => (
                <Button
                  key={index}
                  style={{ width: "49%" }}
                  onPress={() => setSelectedSubCategory(subCategory.id)}
                  title={subCategory.name}
                  variant={
                    selectedSubCategory === subCategory.id
                      ? "Contained"
                      : "Outlined"
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
    </>
  );
}

export default SelectCategory;
