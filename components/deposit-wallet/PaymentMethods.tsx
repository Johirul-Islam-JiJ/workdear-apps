import { countryCurrency } from "@/_mock/payment";
import { config } from "@/config/config";
import { useAppSelector } from "@/hooks/redux";
import { filterByCountry } from "@/services/filterByCountry";
import { useGetPaymentSystemsQuery } from "@/store/features/payment";
import { PaymentMethodsType, PaymentSystemsType } from "@/types/payment";
import { Image } from "expo-image";
import React from "react";
import { Pressable, View, ViewStyle } from "react-native";
import LoadingIndicator from "../libs/LoadingIndicator";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

type Props = {
  setPaymentMethod: React.Dispatch<React.SetStateAction<number | null>>;
  title: string;
  type: PaymentSystemsType;
  setGatewayType: React.Dispatch<
    React.SetStateAction<PaymentMethodsType | null>
  >;
  crypto: boolean;
};

const PaymentMethods = ({
  setPaymentMethod,
  title,
  type,
  setGatewayType,
  crypto,
}: Props) => {
  const { user } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetPaymentSystemsQuery(undefined);

  if (isLoading) return <LoadingIndicator />;

  if (!data) return null;

  const filteredData = filterByCountry(
    data,
    user?.country as keyof typeof countryCurrency,
    type,
    crypto
  );

  function handlePaymentMethod(id: number, type: PaymentMethodsType) {
    setPaymentMethod(id);
    setGatewayType(type);
  }

  const itemWrapperStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 10,
  };

  return (
    <View style={{ rowGap: 10 }}>
      <ThemedText variant="body2">Choose payment method {title}</ThemedText>

      <View style={{ rowGap: 5 }}>
        {filteredData.length ? (
          filteredData.map((method) => (
            <Pressable
              key={method.id}
              onPress={() => handlePaymentMethod(method.id, method.type)}
            >
              <ThemedView color="gray.200" style={itemWrapperStyle}>
                <Image
                  source={{ uri: config.fileBaseUrl + method.image_url }}
                  style={{ height: 60, width: 60 }}
                  contentFit="contain"
                />
                <View>
                  <ThemedText style={{ textTransform: "capitalize" }}>
                    {method.name.split("_")[0]} ({method.currency})
                  </ThemedText>
                  {method.network && <ThemedText>{method.network}</ThemedText>}
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    {type === "deposit" ? (
                      <>
                        <ThemedText variant="small">
                          Min: {method.min_deposit}
                        </ThemedText>
                        <ThemedText variant="small">
                          Max: {method.max_deposit}
                        </ThemedText>
                      </>
                    ) : (
                      <>
                        <ThemedText variant="small">
                          Min: {method.min_withdrawals}
                        </ThemedText>
                        <ThemedText variant="small">
                          Max: {method.max_withdrawals}
                        </ThemedText>
                      </>
                    )}
                  </View>
                </View>
              </ThemedView>
            </Pressable>
          ))
        ) : (
          <ThemedText variant="body">No payment method found</ThemedText>
        )}
      </View>
    </View>
  );
};

export default PaymentMethods;
