import { jobsSlicer } from "../Slicer";

export const useJobs = () => {
  const data = jobsSlicer((state) => state.data);
  const pending = jobsSlicer((state) => state.pending);
  const setPagination = jobsSlicer((state) => state.setPagination);
  const pagination = jobsSlicer((state) => state.pagination);
  const setData = jobsSlicer((state) => state.setData);
  const setPending = jobsSlicer((state) => state.setPending);
  return {
    data,
    pending,
    setPagination,
    pagination,
    setData,
    setPending,
  };
};
