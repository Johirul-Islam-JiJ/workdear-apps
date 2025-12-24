import * as Clipboard from "expo-clipboard";
import { Link } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import React, { useState } from "react";
import { View } from "react-native";
import Button from "../libs/Button";
import IconButton from "../libs/IconButton";
import Input from "../libs/Input";
import { ThemedText } from "../libs/ThemedText";
import { BinanceData } from "./PaymentContent";

const BinanceInfo = ({ data }: { data: BinanceData }) => {
  const [copy, setCopy] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(data?.walletAddress ?? "");
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  const handleOpen = async () => {
    await openBrowserAsync(data?.invoiceUrl ?? "");
  };

  const list = [
    "1. Copy the wallet address",
    `2. Open your ${data?.appName} app`,
    "3. Paste the wallet address",
    `4. Enter the payment amount $${data?.amount}`,
    "5. Confirm and complete the payment",
    "6. Once payment is successful, return to this page and click “I've Paid”.",
  ];

  return (
    <View>
      <ThemedText>Wallet Address</ThemedText>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
        <View style={{ width: "87%" }}>
          <Input value={data?.walletAddress} editable={false} />
        </View>
        <IconButton
          onPress={handleCopy}
          icon={copy ? "checkmark" : "copy"}
          color="primarydark"
          darkColor="white"
        />
      </View>

      <Button
        onPress={handleOpen}
        title="Open invoice link"
        size="small"
        style={{ marginTop: 10, alignSelf: "flex-end" }}
        endIcon="arrow-up-right-box-outline"
      />

      <View>
        <ThemedText variant="body2">Follow the instructions:</ThemedText>
        {list.map((item, index) => (
          <ThemedText key={index}>{item}</ThemedText>
        ))}
        <Link
          href={{
            pathname: "/(mainLayout)/paymentDetails",
            params: { orderId: data?.orderId, type: "passimpay" },
          }}
          asChild
        >
          <Button title="I've paid" style={{ marginTop: 10 }} />
        </Link>
      </View>
    </View>
  );
};

export default BinanceInfo;
