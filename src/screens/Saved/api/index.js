import { api } from "../../../apps/Helper/api";

export const getData = async (pagination, setData, setPending) => {
  try {
    setPending(true);
    const response = await api.get(`like/all`, {
      params: {
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
      },
    });

    response.data.results && setData(response.data.results);
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response.status === 401) return { status: 401 };
  } finally {
    setPending(false);
  }
};
