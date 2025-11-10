import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "./ThemedText";

type DropdownItem = {
  label: string;
  value: any;
};

type DropdownProps = {
  items: DropdownItem[];
  placeholder: string;
  onSelect: (item: string) => void;
  error?: string;
  value?: string;
  disabled?: boolean;
};

export const DropdownMenu: React.FC<DropdownProps> = ({
  items,
  placeholder,
  onSelect,
  error,
  value,
  disabled,
}) => {
  const [selected, setSelected] = useState({ label: "", value: "" });
  const [visible, setVisible] = useState(false);
  const borderColor = useThemeColor(error ? "error" : "border");
  const iconColor = useThemeColor(error ? "error" : "placeholder");
  const dropdownBgColor = useThemeColor("white");

  useEffect(() => {
    if (value) {
      const item = items.find((item) => item.value === value);
      if (item) {
        setSelected(item);
      }
    } else {
      setSelected({ label: "", value: "" });
    }
  }, [value]);

  const handleSelect = (item: DropdownItem) => {
    setSelected(item);
    setVisible(false);
    onSelect && onSelect(item.value);
  };

  return (
    <View>
      {/* Dropdown Button */}
      <Pressable
        disabled={disabled}
        style={[styles.dropdownButton, { borderColor }]}
        onPress={() => setVisible(true)}
      >
        <ThemedText
          color={error ? "error" : !selected.label ? "placeholder" : undefined}
        >
          {selected.label ? selected.label : placeholder}
        </ThemedText>
        <Ionicons
          name={visible ? "chevron-up" : "chevron-down"}
          size={18}
          color={iconColor}
        />
      </Pressable>

      {/* Error message */}
      {error && (
        <ThemedText color="error" variant="small">
          {error}
        </ThemedText>
      )}

      {/* Modal for dropdown list */}
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
          activeOpacity={1}
        >
          <View
            style={[styles.dropdownList, { backgroundColor: dropdownBgColor }]}
          >
            <FlatList
              data={items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleSelect(item)}
                >
                  <ThemedText>{item.label}</ThemedText>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 20,
  },
  dropdownList: {
    borderRadius: 8,
    paddingVertical: 5,
    maxHeight: 250,
    elevation: 5, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
});
