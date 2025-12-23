import AdvertisementFilter from "@/components/advertisement/AdvertisementFilter";
import AdvertisementList from "@/components/advertisement/AdvertisementList";
import AdvertisementSummary from "@/components/advertisement/AdvertisementSummary";
import Navigation from "@/components/advertisement/Navigation";
import Container from "@/components/common/Container";
import Button from "@/components/libs/Button";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
import Pagination from "@/components/libs/Pagination";
import { ThemedText } from "@/components/libs/ThemedText";
import { useGetAdsQuery } from "@/store/features/advertisement";
import {
  AdvertisementSummary as AdvertisementSummaryType,
  Advertisement as AdvertisementType,
} from "@/types/Advertisement";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Dimensions, View } from "react-native";

const Advertisement = () => {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAdsQuery({ status, page });

  const ads: AdvertisementType[] = data?.data?.ads || [];
  const totalPages: number = data?.meta?.last_page || 1;
  const report: AdvertisementSummaryType = data?.data?.statistics || {};

  if (isLoading) return <LoadingIndicator fullScreen />;

  if (ads.length === 0 && status === "") {
    return (
      <View
        style={{
          height: Dimensions.get("screen").height - 140,
          justifyContent: "center",
          alignItems: "center",
          rowGap: 5,
        }}
      >
        <ThemedText>No advertisement found</ThemedText>
        <Link href="/(mainLayout)/add-advertisement" asChild>
          <Button
            title="Add your first ads"
            size="small"
            endIcon="arrow-up-right-box-outline"
          />
        </Link>
      </View>
    );
  }

  return (
    <Container>
      <Navigation />
      <AdvertisementSummary data={report} />
      <AdvertisementFilter onStatusChange={setStatus} />
      <AdvertisementList data={ads} />

      <Pagination
        currentPage={page}
        onChange={setPage}
        totalPages={totalPages}
      />
    </Container>
  );
};

export default Advertisement;
