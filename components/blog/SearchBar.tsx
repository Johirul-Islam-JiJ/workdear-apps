import { Ionicons } from "@expo/vector-icons";
import React from "react";
import AppIcon from "../libs/AppIcon";
import Input from "../libs/Input";
import { ThemedView } from "../libs/ThemedView";

const SearchBar = () => {
  return (
    <ThemedView color="card" style={{ borderRadius: 10 }}>
      <Input
        placeholder="Search here"
        endIcon={
          <AppIcon size={24} color="gray.500" darkColor="gray.300">
            <Ionicons name="search" />
          </AppIcon>
        }
      />
    </ThemedView>
  );
};

export default SearchBar;
