import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppIcon from "./AppIcon";
import Button from "./Button";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
  maxVisible?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onChange,
  maxVisible = 5,
}) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onChange(currentPage + 1);
  };

  const generatePages = () => {
    const pages = [];
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <View style={styles.container}>
      {/* Previous Button */}
      <Button
        onPress={handlePrev}
        disabled={currentPage === 1}
        style={[styles.iconButton, { opacity: currentPage === 1 ? 0.5 : 1 }]}
        title={
          <AppIcon color="white">
            <MaterialIcons name="chevron-left" />
          </AppIcon>
        }
      />

      {/* Page Numbers */}
      {generatePages().map((page) => (
        <Button
          key={page}
          onPress={() => onChange(page)}
          title={`${page}`}
          variant={page === currentPage ? "contained" : "outlined"}
          color={page === currentPage ? "info" : undefined}
        />
      ))}

      {/* Next Button */}
      <Button
        onPress={handleNext}
        disabled={currentPage === totalPages}
        color={currentPage === totalPages ? "border" : "primarydark"}
        style={styles.iconButton}
        title={
          <AppIcon color="white">
            <MaterialIcons name="chevron-right" />
          </AppIcon>
        }
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  iconButton: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 0,
    paddingVertical: 0,
    height: 40,
    width: 40,
  },
});

export default Pagination;
