import { useAppDispatch } from "@/hooks/redux";
import { api, tagsType } from "@/store/features/baseQuery";
import { useCallback } from "react";

export default function useGlobalRefresh() {
  const dispatch = useAppDispatch();

  const refresh = useCallback(() => {
    dispatch(api.util.invalidateTags(tagsType));
  }, [dispatch]);

  return refresh;
}
