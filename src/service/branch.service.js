import { getApI } from "../utils/axios";

// to get all availabel branches
export const getAllBranches = async () => {
  const response = await getApI()
    .get("api/branches/get_branches/")
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
