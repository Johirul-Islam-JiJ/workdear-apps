import { stackScreens } from "@/_mock/screens";
import ScreenHeader from "@/components/common/ScreenHeader";
import { Stack } from "expo-router";
import React from "react";

const MainLayout = () => {
  return (
    <Stack
      screenOptions={{
        header: (props) => {
          if (props.route.name === "(drawer)") return null;
          return <ScreenHeader route={props.options.title as string} />;
        },
      }}
    >
      {Object.entries(stackScreens).map(([id, { name, title }]) => (
        <Stack.Screen key={id} name={name} options={{ title: title }} />
      ))}
    </Stack>
  );
};

export default MainLayout;
