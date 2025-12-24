import { PaymentInfo } from "@/types/payment";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import Button from "../libs/Button";
import Card from "../libs/Card";
import IconButton from "../libs/IconButton";
import { ThemedText } from "../libs/ThemedText";
import { ThemedView } from "../libs/ThemedView";

const PaymentStatus = ({ data }: { data: PaymentInfo }) => {
  const paymentStatus = data.transaction_report.status;

  switch (paymentStatus) {
    case "pending":
      return (
        <Card style={{ rowGap: 0 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <IconButton icon="lock-closed" color="warning" />
            <View>
              <ThemedText variant="body2" color="warning">
                Payment pending
              </ThemedText>
              <ThemedText color="warning">
                Your payment is being processed
              </ThemedText>
            </View>
          </View>

          <ThemedView
            color="warning"
            opacity={{ dark: 40, light: 40 }}
            style={{
              padding: 10,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <ThemedText color="warning">
              Your payment is currently being processed but couldn't complete
            </ThemedText>
            <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
              <Link href="/(mainLayout)/paymentDetails" asChild>
                <Button title="Retry payment" color="warning" />
              </Link>
              <Link href="/(mainLayout)/(drawer)/user-profile" asChild>
                <Button title="Go profile" variant="outlined" color="warning" />
              </Link>
            </View>
          </ThemedView>
        </Card>
      );
    case "success":
      return (
        <Card style={{ rowGap: 0 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <IconButton icon="checkmark-circle" color="success" />
            <View>
              <ThemedText variant="body2" color="success">
                Payment successful!
              </ThemedText>
              <ThemedText color="success" variant="small">
                Your payment was processed successfully
              </ThemedText>
            </View>
          </View>

          <ThemedView
            color="success"
            opacity={{ dark: 40, light: 40 }}
            style={{
              padding: 10,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <ThemedText color="success">
              Congratulations! Your payment of {data.transaction_report.amount}{" "}
              {data.transaction_report.currency} has been successfully
              processed.
            </ThemedText>
            <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
              <Button title="Go profile" variant="outlined" color="success" />
            </View>
          </ThemedView>
        </Card>
      );
    case "failed":
      return (
        <Card style={{ rowGap: 0 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <IconButton icon="checkmark-circle" color="error" />
            <View>
              <ThemedText variant="body2" color="error">
                Payment failed
              </ThemedText>
            </View>
          </View>
          <ThemedText color="error" variant="small">
            Unfortunately, your payment could not be processed
          </ThemedText>

          <ThemedView
            color="error"
            opacity={{ dark: 40, light: 40 }}
            style={{
              padding: 10,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <ThemedText color="error">
              Your payment is failed due to some reason. Please try again or
              contact our support team
            </ThemedText>
            <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
              <Link href="/(mainLayout)/paymentDetails" asChild>
                <Button title="Retry payment" color="warning" />
              </Link>
              <Link href="/(mainLayout)/contact-us" asChild>
                <Button title="Contact support" />
              </Link>
            </View>
          </ThemedView>
        </Card>
      );
    default:
      return null;
  }
};

export default PaymentStatus;
