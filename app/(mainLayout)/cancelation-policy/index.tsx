import Container from "@/components/common/Container";
import ContentRenderer from "@/components/libs/ContentRenderer";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
import { useGetCancelationPolicyQuery } from "@/store/features/content";
import React from "react";

const CancelationPolicy = () => {
  const { data, isLoading } = useGetCancelationPolicyQuery();

  if (isLoading) return <LoadingIndicator fullScreen />;

  const content: string = data?.content_data?.content;
  return (
    <Container>
      <ContentRenderer html={content} />
    </Container>
  );
};

export default CancelationPolicy;
