// INFO: for now, this is useless, unless we implement logic using asyncStorage or something to be used on front-end
// since we are using cookies, we cannot access the jwt on the front-end, so the only way would be to redirect user on 401 error
// otherwise need to somehow persist the token
import { Outlet, Navigate, useNavigate, redirect } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import Header from 'src/components/Header/Header'
import { LOCAL_STORAGE_TOKEN_KEY } from '../fixtures/localStorageKeys'

const PrivateRoutes = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
  axios.defaults.headers.common.token = token

  const navigate = useNavigate()

  // INFO: this part is if we start using cookies again
  // axios.interceptors.request.use(
  //   (config) => {
  //     config.withCredentials = true;

  //     return config;
  //   },
  //   (err) => {
  //     Promise.reject(err);
  //   }
  // );

  axios.interceptors.response.use(
    (res) => {
      return res
    },
    (err) => {
      if (err.response.status === 401) {
        toast.error('Session expired, please auth again')
        navigate('/login')
      }
      return Promise.reject(err)
    }
  )

  if (!token) redirect('/login')

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default PrivateRoutes
