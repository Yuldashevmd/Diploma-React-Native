import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, BASIC_URL } from "../../../apps/Helper/api";
// DELETE
export const deleteJob = async (id) => {
  const response = await api.delete(`job/delete/${id}`);
  return response;
};

// GET
export const getData = async (pagination, setPending, setData) => {
  try {
    setPending(true);
    const response = await fetch(
      `${BASIC_URL}/job/all/myjobs?${new URLSearchParams({
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
        title: null,
        salary: null,
        orgname: null,
        salary_type: null,
      })}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await AsyncStorage.getItem("access_token")}`,
        },
      }
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

// CREATE
export const createJob = async (setPending, body) => {
  try {
    setPending(true);
    const response = await api.post(`job/create`, body);
    return response;
  } catch (err) {
    console.error(err);
  } finally {
    setPending(false);
  }
};

// UPDATE
export const updateJob = async (setPending, id, body) => {
  try {
    setPending(true);
    const response = await api.patch(`job/update/${id}`, body);
    return response;
  } catch (err) {
    console.error(err);
  } finally {
    setPending(false);
  }
};

// GET-ONE
export const getOneJob = async (id) => {
  try {
    const response = await api.get(`job/one/${id}`);
    return response;
  } catch (err) {
    console.error(err);
  }
};
