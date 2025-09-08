import { useGetProfileQuery } from "@/store/features/auth";
import {
  useGetAllCostQuery,
  useGetGeneralDataQuery,
} from "@/store/features/generalData";
import { useSelector } from "react-redux";

function AuthGuard({ children }) {
  const { user } = useSelector((state) => state.user);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (session) {
  //     dispatch(setToken(session?.accessToken));
  //   }
  // }, [session]);

  useGetProfileQuery("", {
    skip: !user,
  });
  useGetGeneralDataQuery();
  useGetAllCostQuery();

  return children;
}

export default AuthGuard;
