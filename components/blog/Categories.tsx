import { BlogCategory } from "@/types/blog";
import React from "react";
import { ScrollView, View } from "react-native";
import Button from "../libs/Button";
import Skeleton from "../libs/Skeleton";

type CategoriesProps = {
  categories: BlogCategory[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | number>>;
  selectedCategory: number | string;
  isLoading: boolean;
};

const Categories = ({
  categories,
  setSelectedCategory,
  selectedCategory,
  isLoading,
}: CategoriesProps) => {
  if (isLoading)
    return (
      <ScrollView horizontal={true}>
        <View style={{ gap: 10, flexDirection: "row" }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} height={32} width={100} />
          ))}
        </View>
      </ScrollView>
    );

  return (
    <ScrollView horizontal={true}>
      <View style={{ gap: 10, flexDirection: "row" }}>
        <Button
          size="small"
          onPress={() => setSelectedCategory("")}
          variant={!selectedCategory ? "contained" : "outlined"}
          title="All"
        />

        {categories.map((category) => (
          <Button
            key={category.id}
            size="small"
            onPress={() => setSelectedCategory(category.id)}
            variant={
              selectedCategory === category.id ? "contained" : "outlined"
            }
            title={category.category_name}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Categories;
