import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import AppIcon from "./AppIcon";
import Button from "./Button";
import Modal from "./Modal";
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
  const borderColor = useThemeColor(error ? "error" : "border");
  const [visible, setVisible] = useState(0);

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
    setVisible(0);
    onSelect && onSelect(item.value);
  };

  return (
    <View>
      {/* Dropdown Button */}
      <Button
        title={selected.label ? selected.label : placeholder}
        endIcon={
          <AppIcon color="placeholder" size={18}>
            <Ionicons name="chevron-down" />
          </AppIcon>
        }
        variant="outlined"
        color={error ? "error" : "text"}
        onPress={() => setVisible(1)}
        textStyle="body"
        disabled={disabled}
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          borderColor: borderColor,
          paddingHorizontal: 10,
        }}
      />

      {/* Error message */}
      {error && (
        <ThemedText color="error" variant="small">
          {error}
        </ThemedText>
      )}

      {/* Modal for dropdown list */}
      <Modal
        visible={visible}
        setVisible={setVisible}
        style={{ width: "auto", maxHeight: 500, marginHorizontal: 10 }}
      >
        <ScrollView>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{ paddingVertical: 5, paddingHorizontal: 10 }}
              onPress={() => handleSelect(item)}
            >
              <ThemedText style={{ textAlign: "center" }}>
                {item.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Modal>
    </View>
  );
};
