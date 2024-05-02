import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASIC_URL } from "../../../apps/Helper/api";

export const postResponse = async (jobId) => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    const response = await fetch(`${BASIC_URL}/Response/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

// handleLike
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
