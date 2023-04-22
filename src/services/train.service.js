import {axiosService} from "./axios.service";
import {urls} from "../configs";


const trainService = {
    getAll: (from_city, to_city, date) => axiosService.get(urls.train, {params: {from_city, to_city, date}}),
    create: (train) => axiosService.post(urls.train, train),
    update: (trainId, train) => axiosService.put(`${urls.train}/${trainId}`, train),
    delete: (trainId) => axiosService.delete(`${urls.train}/${trainId}`)
};

export {trainService};
