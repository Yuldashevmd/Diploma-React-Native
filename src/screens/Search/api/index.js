import { BASIC_URL } from "../../../apps/Helper/api";

export const getData = async (pagination, sort, setData, setPending) => {
  try {
    setPending(true);
    const response = await fetch(
      `${BASIC_URL}/job/all?type=${sort.type}&title=${sort.title}&orgname=${sort.orgname}&salary=${sort.salary}&salary_type=${sort.salary_type}&pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`
    );
    const data = await response.json();
    data?.results && setData(data.results);
    return data;
  } catch (error) {
    console.error(error);
    if (error.response.status === 401) return { status: 401 };
  } finally {
    setPending(false);
  }
};
