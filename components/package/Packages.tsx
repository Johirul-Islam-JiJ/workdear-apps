import { useGetPremiumPackagesQuery } from "@/store/features/premium";
import { View } from "react-native";
import { ThemedText } from "../libs/ThemedText";
import PackageCard from "./PackageCard";
import PackageLoadingCard from "./PackingLoadingCard";

const Packages = () => {
  const { data: packageData, isLoading } = useGetPremiumPackagesQuery();
  const packages = packageData?.subscription_package_list ?? [];

  return (
    <View style={{ rowGap: 10 }}>
      <ThemedText variant="subtitle" color="primarydark" darkColor="white">
        Unlock Premium Features
      </ThemedText>
      {isLoading ? (
        <View style={{ rowGap: 10 }}>
          <PackageLoadingCard />
          <PackageLoadingCard />
          <PackageLoadingCard />
        </View>
      ) : packages.length ? (
        packages?.map((pack, index) => <PackageCard key={index} data={pack} />)
      ) : (
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <ThemedText color="gray.800" darkColor="gray.300" variant="body">
            No package found
          </ThemedText>
        </View>
      )}
    </View>
  );
};

export default Packages;
