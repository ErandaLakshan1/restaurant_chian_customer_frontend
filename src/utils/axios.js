import axios from "axios"
import constants from "../constants"

export const getApI = () => {
    const token = null

    return axios.create({
        baseURL: constants.API_BASE_URL,
        headers: {
            Authorization: token ? "Bearer " + token : null,
            "Content-type": "application/json",
        }
    })
}


export const getApiForFormData = () => {
    const token = null

    return axios.create({
        baseURL: constants.API_BASE_URL,
        headers: {
          Authorization: token ? "Bearer " + token : null,
          "Content-type": "multipart/form-data",
        },
      });
}