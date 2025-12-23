import Container from "@/components/common/Container";
import ContentRenderer from "@/components/libs/ContentRenderer";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
import { useGetRefundPolicyQuery } from "@/store/features/content";
import React from "react";

const RefundPolicy = () => {
  const { data, isLoading } = useGetRefundPolicyQuery();

  if (isLoading) return <LoadingIndicator fullScreen />;

  const content: string = data?.content_data?.content;
  return (
    <Container>
      <ContentRenderer html={content} />
    </Container>
  );
};

export default RefundPolicy;
