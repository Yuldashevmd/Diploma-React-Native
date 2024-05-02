import { api } from "../../../apps/Helper/api";
// DELETE
export const deleteJob = async (id) => {
  const response = await api.delete(`job/delete/${id}`);
  return response.data;
};

// GET
export const getData = async (pagination) => {
  try {
    const response = await api.get(`job/all/myjobs`, {
      params: {
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
        title: null,
        salary: null,
        orgname: null,
        salary_type: null,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response.status === 401) return { status: 401 };
  }
};
