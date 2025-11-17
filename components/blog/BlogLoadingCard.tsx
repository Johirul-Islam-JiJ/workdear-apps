import React from "react";
import Card from "../libs/Card";
import Skeleton from "../libs/Skeleton";

const BlogLoadingCard = () => {
  return (
    <Card>
      <Skeleton width="80%" />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton width="70%" />
      <Skeleton height={32} />
    </Card>
  );
};

export default BlogLoadingCard;
