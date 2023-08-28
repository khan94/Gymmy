// INFO: for now, this is useless, unless we implement logic using asyncStorage or something to be used on front-end
// since we are using cookies, we cannot access the jwt on the front-end, so the only way would be to redirect user on 401 error
// otherwise need to somehow persist the token
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import axios from "redaxios";
import { toast } from "react-toastify";
import Header from "src/components/Header/Header";

const PrivateRoutes = () => {
  const navigate = useNavigate();

  axios.interceptors.request.use(
    (config) => {
      config.withCredentials = true;

      return config;
    },
    (err) => {
      Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response.status === 401) {
        toast.error("Session expired, please auth again");
        navigate("/login");
      }
      return Promise.reject(err);
    }
  );

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default PrivateRoutes;
