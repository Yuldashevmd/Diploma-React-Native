import { api } from "../../../apps/Helper/api";

export const getData = async (pagination, sort) => {
  try {
    const response = await api.get(`job/all`, {
      params: {
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
        type: sort.type,
        title: sort.title,
        orgname: sort.orgname,
        salary: sort.salary,
        salary_type: sort.salary_type,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response.status === 401) return { status: 401 };
  }
};
