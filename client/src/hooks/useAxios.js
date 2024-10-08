import axios from 'axios';
import { useSelector } from 'react-redux';

const useAxios = () => {

    const { token } = useSelector((state) => state.auth);

    const axiosWithToken = axios.create({
        baseURL: '/api/v1/',
        headers: { Authorization: `Token ${token}` },
      });

      const axiosPublic = axios.create({
        baseURL: '/api/v1/',
      });


  return {axiosWithToken, axiosPublic}
}

export default useAxios