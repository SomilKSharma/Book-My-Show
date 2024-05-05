import { axiosInstance } from ".";

// register a user
export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/register", payload);
    return response;
  } catch (error) {
    return error;
  }
};

// login a user
export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/login", payload);
    return response;
  } catch (error) {
    return error;
  }
};

// get user data
export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/get-current-user");
    return response.data;
  } catch (error) {
    return error;
  }
};
