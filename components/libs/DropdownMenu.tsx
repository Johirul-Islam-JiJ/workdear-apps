import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import AppIcon from "./AppIcon";
import Button from "./Button";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

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
  border?: boolean;
  title?: string;
};

export const DropdownMenu: React.FC<DropdownProps> = ({
  items,
  placeholder,
  onSelect,
  error,
  value,
  disabled,
  border = false,
  title,
}) => {
  const [selected, setSelected] = useState({ label: "", value: "" });
  const borderColor = useThemeColor(error ? "error" : "border");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (value) {
      const item = items.find((item) => item.value === value);
      if (item) setSelected(item);
    } else {
      setSelected({ label: "", value: "" });
    }
  }, [value]);

  const handleSelect = (item: DropdownItem) => {
    setSelected(item);
    setVisible(false);
    onSelect(item.value);
  };

  return (
    <View>
      {/* Trigger Button */}
      <Button
        title={selected.label ? selected.label : placeholder}
        endIcon={
          <AppIcon color="placeholder" size={18}>
            <Ionicons name="chevron-down" />
          </AppIcon>
        }
        variant="outlined"
        color={error ? "error" : "text"}
        onPress={() => setVisible(true)}
        textStyle="body"
        disabled={disabled}
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: border ? 1 : 0,
          borderColor,
          paddingHorizontal: 10,
        }}
      />

      {error && (
        <ThemedText color="error" variant="small">
          {error}
        </ThemedText>
      )}

      {/* Bottom Sheet Modal */}
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={() => setVisible(false)}
      >
        {/* Dark overlay */}
        <Pressable onPress={() => setVisible(false)} style={{ flex: 1 }} />

        {/* Bottom sheet container */}
        <ThemedView
          color="card"
          style={{
            paddingVertical: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: "60%",
          }}
        >
          {/* Drag handle */}
          <Pressable
            onPress={() => setVisible(false)}
            style={{ width: 40, alignSelf: "center" }}
          >
            <ThemedView
              color="gray.600"
              style={{
                width: "100%",
                height: 5,
                borderRadius: 3,
                marginBottom: 15,
              }}
            />
          </Pressable>

          {/* Title */}
          <ThemedText
            variant="bodySemiBold"
            style={{
              paddingHorizontal: 20,
              marginBottom: 10,
            }}
          >
            {title || placeholder}
          </ThemedText>

          <ScrollView>
            {items.map((item, index) => {
              const active = item.value === selected.value;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelect(item)}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    backgroundColor: active
                      ? "rgba(0, 150, 136, 0.2)"
                      : "transparent",
                    borderRadius: 8,
                    marginHorizontal: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <ThemedText>{item.label}</ThemedText>

                  {active && (
                    <AppIcon color="primarymain" size={20}>
                      <Ionicons name="checkmark" />
                    </AppIcon>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </ThemedView>
      </Modal>
    </View>
  );
};
