import { Fragment, useContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import AuthForm from "./components/AuthForm/AuthForm";
import Interns from "./components/AdminPage/Interns/Interns";
import NavBar from "./components/NavBar/NavBar";
import Welcome from "./components/Welcome/Welcome";
import Context from "./context/Context";
import Container from "./components/Container/Container";
import Projects from "./components/AdminPage/Projects/Projects";
import Supervisors from "./components/AdminPage/Supervisors/Supervisors";
import AddInternModal from "./components/AdminPage/AddModals/AddInternModal";
import AddSupervisorModal from "./components/AdminPage/AddModals/AddSupervisorModal";
import AddProjectModal from "./components/AdminPage/AddModals/AddProjectModal";
import ModifyInternModal from "./components/AdminPage/ModifyModals/ModifyInternModal";

function App() {
  const ctx = useContext(Context);

  return (
    <Fragment>
      
      <div id="modifyInternModal"></div>
      <div id="modifyProjectModal"></div>
      <div id="modifySupervisorModal"></div>
      <div id="setSupervisorModal"></div>
      <div id="showProjectsModal"></div>
      <div id="showMoreModal"></div>
      {ctx.isLoggedIn && ctx.projectModal && (
        <AddProjectModal></AddProjectModal>
      )}
      {ctx.isLoggedIn && ctx.internModal && <AddInternModal></AddInternModal>}
      {ctx.isLoggedIn && ctx.supervisorModal && (
        <AddSupervisorModal></AddSupervisorModal>
      )}

      <NavBar></NavBar>
      {/* <Welcome></Welcome> */}
      <main>
        <Container>
          <Routes>
            {!ctx.isLoggedIn && (
              <Route path="/login" element={<AuthForm></AuthForm>}></Route>
            )}
            {!ctx.isLoggedIn && (
              <Route
                path="/*"
                element={<Navigate replace to="/login"></Navigate>}
              ></Route>
            )}

            {ctx.isLoggedIn && (
              <Route path="/home" element={<Welcome></Welcome>}></Route>
            )}
            {ctx.isLoggedIn && (
              <Route
                path="/"
                element={<Navigate replace to="/home"></Navigate>}
              ></Route>
            )}
            {ctx.isLoggedIn && (
              <Route path="/interns" element={<Interns></Interns>}></Route>
            )}
            {ctx.isLoggedIn && (
              <Route path="/projects" element={<Projects></Projects>}></Route>
            )}
            {ctx.isLoggedIn && (
              <Route
                path="/supervisors"
                element={<Supervisors></Supervisors>}
              ></Route>
            )}
            {ctx.isLoggedIn && (
              <Route
                path="/*"
                element={<Navigate to="/home"></Navigate>}
              ></Route>
            )}
          </Routes>
        </Container>
      </main>
    </Fragment>
  );
}

export default App;
