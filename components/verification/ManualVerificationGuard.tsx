import { useAppSelector } from "@/hooks/redux";
import React from "react";
import ManualVerification from "./ManualVerification";
import VerificationApproved from "./VerificationApproved";
import VerificationPending from "./VerificationPending";
import VerificationRejected from "./VerificationRejected";

const ManualVerificationGuard = () => {
  const { user } = useAppSelector((state) => state.user);

  //   const verification_status = user?.verificationStatus;
  const verification_status = "PENDING";
  return (
    <>
      {verification_status === "PENDING" ? (
        <VerificationPending />
      ) : verification_status === "VERIFIED" ? (
        <VerificationApproved />
      ) : verification_status === "REJECTED" ? (
        <VerificationRejected />
      ) : (
        <ManualVerification />
      )}
    </>
  );
};

export default ManualVerificationGuard;
