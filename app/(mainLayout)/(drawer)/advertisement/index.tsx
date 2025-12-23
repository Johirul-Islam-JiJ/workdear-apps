import AdvertisementFilter from "@/components/advertisement/AdvertisementFilter";
import AdvertisementSummary from "@/components/advertisement/AdvertisementSummary";
import Navigation from "@/components/advertisement/Navigation";
import Container from "@/components/common/Container";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
import Pagination from "@/components/libs/Pagination";
import { useGetAdsQuery } from "@/store/features/advertisement";
import React, { useState } from "react";

const Advertisement = () => {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAdsQuery({ status, page });
  const [showUpdatModal, setShowUpdateModal] = useState(false);
  const [updateModalData, setUpdateModalData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(0);

  const ads = data?.data?.ads || [];
  const totalPages = data?.meta?.last_page || 1;
  const report = data?.data?.statistics || {};

  if (isLoading) return <LoadingIndicator fullScreen />;

  return (
    <Container>
      <Navigation />
      <AdvertisementSummary data={report} />
      <AdvertisementFilter onStatusChange={setStatus} />

      <Pagination
        currentPage={page}
        onChange={setPage}
        totalPages={totalPages}
      />
    </Container>
  );
};

export default Advertisement;
