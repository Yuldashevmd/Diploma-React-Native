import { api } from "../../../apps/Helper/api";

export const getResponse = async (sort, pagination) => {
  try {
    const response = await api.get(`Response/all`, {
      params: {
        type: sort,
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response.status === 401) return { status: 401 };
  }
};
