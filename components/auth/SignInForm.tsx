import { useThemeColor } from "@/hooks/useThemeColor";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import Input from "../Input";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

const SignInForm = () => {
  const [showPasswoard, setShowPassword] = React.useState(false);
  const error = false;
  const iconColor = useThemeColor(error ? "error" : "placeHolder");

  return (
    <ThemedView
      color="lightGray"
      style={{
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 20,
      }}
    >
      <View style={{ gap: 7 }}>
        <View>
          <ThemedText>Email</ThemedText>
          <Input
            placeholder="Enter your email"
            startIcon={<Fontisto name="email" size={20} color={iconColor} />}
          />
        </View>
        <View>
          <ThemedText>Password</ThemedText>
          <Input
            placeholder="Enter the password"
            secureTextEntry={!showPasswoard}
            startIcon={<Feather name="lock" size={20} color={iconColor} />}
            endIcon={
              <Feather
                onPress={() => setShowPassword(!showPasswoard)}
                name={showPasswoard ? "eye-off" : "eye"}
                size={20}
                color={iconColor}
              />
            }
          />
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          gap: 4,
          justifyContent: "center",
        }}
      >
        <ThemedText>Don’t have an account?</ThemedText>
        <Link href="/signup">
          <ThemedText type="link">Sign up</ThemedText>
        </Link>
      </View>
    </ThemedView>
  );
};

export default SignInForm;
