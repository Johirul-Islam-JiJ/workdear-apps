import { useGetPremiumPackagesQuery } from "@/store/features/premium";
import { View } from "react-native";
import { ThemedText } from "../libs/ThemedText";
import PackageCard from "./PackageCard";
import PackageLoadingCard from "./PackingLoadingCard";

const Packages = () => {
  const { data: packageData, isLoading } = useGetPremiumPackagesQuery();

  return (
    <View style={{ rowGap: 10 }}>
      <ThemedText type="subtitle" color="primaryDarker">
        Unlock more with premium plans
      </ThemedText>
      {isLoading ? (
        <View style={{ rowGap: 10 }}>
          <PackageLoadingCard />
          <PackageLoadingCard />
          <PackageLoadingCard />
        </View>
      ) : packageData?.subscription_package_list?.length > 0 ? (
        packageData?.subscription_package_list?.map((pack, index) => (
          <PackageCard key={index} data={pack} />
        ))
      ) : (
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <ThemedText color="placeHolder">No package found</ThemedText>
        </View>
      )}
    </View>
  );
};

export default Packages;
