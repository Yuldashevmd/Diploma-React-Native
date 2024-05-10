import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASIC_URL } from "../../../apps/Helper/api";

// GET
export const getData = async (id, setPending, setData) => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    setPending(true);
    let response;
    if (!token) {
      response = await fetch(`${BASIC_URL}/job/one/${id}`);
    } else {
      response = await fetch(`${BASIC_URL}/job/one/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
    const data = await response.json();
    data && setData(data);
    return data;
  } catch (error) {
    console.error(error);
    return;
  } finally {
    setPending(false);
  }
};

// RESPONSE
export const postResponse = async (jobId) => {
  try {
    const response = await fetch(`${BASIC_URL}/Response/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        job_id: jobId,
      }),
    });
    return response;
  } catch (error) {
    throw Error(error);
  }
};

// LIKE
export const handleLike = async (body) => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    const res = await fetch(`${BASIC_URL}/like/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    return res;
  } catch (error) {
    throw Error(error);
  }
};
