import { responseSlicer } from "../Slicer";

export const useResponse = () => {
  const data = responseSlicer((state) => state.data);
  const pending = responseSlicer((state) => state.pending);
  const type = responseSlicer((state) => state.type);
  const setType = responseSlicer((state) => state.setType);
  const setData = responseSlicer((state) => state.setData);
  const setPending = responseSlicer((state) => state.setPending);
  const pagination = responseSlicer((state) => state.pagination);
  const setPagination = responseSlicer((state) => state.setPagination);
  return {
    data,
    pending,
    setData,
    setPending,
    type,
    setType,
    pagination,
    setPagination,
  };
};
