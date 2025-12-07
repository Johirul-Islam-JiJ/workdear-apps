import {
  useBoostJobMutation,
  useDeleteJobMutation,
  useGetMyJobsQuery,
  usePinJobMutation,
  usePlayAndPauseJobMutation,
  useUpdateDaysAndWorkerMutation,
} from "@/store/features/jobs";
import { useState } from "react";
import { useToast } from "./useToast";

export const useMyJobsData = () => {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const toast = useToast();

  const { data, isLoading } = useGetMyJobsQuery({ page, status });
  const [deleteJob, { isLoading: isDeleteLoading }] = useDeleteJobMutation();
  const [playAndPause, { isLoading: isPlayAndPauseLoading }] =
    usePlayAndPauseJobMutation();
  const [pinJob, { isLoading: isPinningJob }] = usePinJobMutation();
  const [boostJob, { isLoading: isBoostingJob }] = useBoostJobMutation();
  const [updateJobs, { isLoading: isUpdatingJob }] =
    useUpdateDaysAndWorkerMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteJob({ id, force: false }).unwrap();
      toast.success("Job deleted successfully");
      return true; // Indicate success
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Internal Server Error"
      );
      return false; // Indicate failure
    }
  };

  const handlePlayAndPause = async (id: number) => {
    try {
      const res = await playAndPause(id);
      toast.success(res.data.message);
      return true; // Indicate success
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Internal Server Error"
      );
      return false; // Indicate failure
    }
  };

  const handlePin = async ({
    minutes,
    id,
    cb,
  }: {
    minutes: number;
    id: number;
    cb: () => void;
  }) => {
    try {
      const payload = {
        minutes,
        job_id: id,
      };
      await pinJob(payload).unwrap();
      toast.success("Job Pined successfully");
      cb();
    } catch (err: any) {
      toast.error(err.data?.message || "Internal server error");
    }
  };

  const handleBoost = async ({
    minutes,
    jobId,
    cb,
  }: {
    minutes: number;
    jobId: number;
    cb: () => void;
  }) => {
    try {
      const payload = {
        minutes,
        job_id: jobId,
      };
      await boostJob(payload).unwrap();
      toast.success("Job Boosted successfully");
      cb();
    } catch (err: any) {
      toast.error(err.data?.message || "Internal server error");
    }
  };

  const handleUpdateJob = async ({
    payload,
    cb,
  }: {
    payload: any;
    cb: () => void;
  }) => {
    try {
      await updateJobs(payload).unwrap();
      toast.success("Job updated successfully");
      cb();
    } catch (error: any) {
      toast.error(error?.data?.message || "Internal Server Error");
    }
  };

  return {
    data,
    isLoading,
    isDeleteLoading,
    isPlayAndPauseLoading,
    status,
    page,
    setStatus,
    setPage,
    handleDelete,
    handlePlayAndPause,
    handlePin,
    isPinningJob,
    handleBoost,
    isBoostingJob,
    handleUpdateJob,
    isUpdatingJob,
  };
};
