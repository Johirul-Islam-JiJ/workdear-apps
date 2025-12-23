import Container from "@/components/common/Container";
import ContentRenderer from "@/components/libs/ContentRenderer";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
import { useGetTermsAndConditionsQuery } from "@/store/features/content";
import React from "react";

const TermsAndCondition = () => {
  const { data, isLoading } = useGetTermsAndConditionsQuery();

  if (isLoading) return <LoadingIndicator fullScreen />;

  const content: string = data?.content_data?.content;
  return (
    <Container>
      <ContentRenderer html={content} />
    </Container>
  );
};

export default TermsAndCondition;
