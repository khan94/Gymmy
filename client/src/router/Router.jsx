import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AVAILABLE_ROUTES } from "../fixtures/routerConfig";
import Dashboard from "src/components/Dashboard/Dashboard";
import WorkoutList from "src/components/WorkoutList/WorkoutList";
import Workout from "src/components/Workout/Workout";
import Modal from "react-modal";
import Login from "src/components/Auth/Login";
import Register from "src/components/Auth/Register";
import PrivateRoutes from "src/utils/PrivateRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Router = () => {
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            {/* <Route path={AVAILABLE_ROUTES.DASHBOARD} element={<Dashboard />} /> */}
            <Route
              path={AVAILABLE_ROUTES.DASHBOARD}
              element={<WorkoutList />}
            />
            <Route
              path={`${AVAILABLE_ROUTES.WORKOUT}/:id`}
              element={<Workout />}
            />
          </Route>
          <Route path={AVAILABLE_ROUTES.LOGIN} element={<Login />} />
          <Route path={AVAILABLE_ROUTES.REGISTER} element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
