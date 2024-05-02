import { api } from "../../../apps/Helper/api";

export const getSaved = async (pagination) => {
  try {
    const response = await api.get(`like/all`, {
      params: {
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
