import React, { useEffect, useState } from "react";

//it will be not be updated
const tokenDuration = 3600000;

const Context = React.createContext({
  isLoggedIn: false,
  token: "",
  login: (token) => {},
  logout: () => {},
  interns: [],
  projects: [],
  supervisors: [],
  loadingInterns: false,
  errorInterns: false,
  loadingProjects: false,
  errorProjects: false,
  loadingSupervisors: false,
  errorSupervisors: false,
  removeIntern: (id) => {},
  removeProject: (id) => {},
  removeSupervisor: (id) => {},
  internModal: false,
  projectModal: false,
  supervisorModal: false,
  closeInternModal: () => {},
  closeSupervisorModal: () => {},
  closeProjectModal: () => {},
  openInternModal: () => {},
  openSupervisorModal: () => {},
  openProjectModal: () => {},
  update :()=>{}
});

export const ContextProvider = function (props) {
  const initialToken = localStorage.getItem("token");
  const refreshDate = new Date().getTime();
  localStorage.setItem("refreshDate", refreshDate.toString());
  const [token, setToken] = useState(initialToken);
  const [interns, setInterns] = useState([]);
  const [projects, setProjects] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [updateArrays, setUpdateArrays] = useState(0);
  const userIsloginIn = !!token;

  const [loadingInterns, setLoadingInterns] = useState(false);
  const [errorInterns, setErrorInterns] = useState(false);
  const [loadingSupervisors, setLoadingSupervisors] = useState(false);
  const [errorSupervisors, setErrorSupervisors] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [errorProjects, setErrorProjects] = useState(false);
  const [internModal, setInternModal] = useState(false);
  const [supervisorModal, setSupervisorModal] = useState(false);
  const [projectModal, setProjectModal] = useState(false);
  console.log("upadated");

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("tokenDate", new Date().getTime().toString());
    setTimeout(() => {
      logoutHandler();
    }, tokenDuration);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenDate");
  };

  if (localStorage.getItem("tokenDate")) {
    setTimeout(
      logoutHandler,
      3600000 - (refreshDate - localStorage.getItem("tokenDate"))
    );
  }
  //modals functions
  const closeInternModal = function () {
    setInternModal(false);
  };
  const closeSupervisorModal = function () {
    setSupervisorModal(false);
  };
  const closeProjectModal = function () {
    setProjectModal(false);
  };
  const openInternModal = function () {
    setInternModal(true);
  };
  const openSupervisorModal = function () {
    setSupervisorModal(true);
  };
  const openProjectModal = function () {
    setProjectModal(true);
  };

  //fetch part
  async function getInterns() {
    setLoadingInterns(true);
    setErrorInterns(false);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/interns", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setInterns(data);
        console.log(data);
      } else {
        setErrorInterns(true);
        throw new Error("something wrong");
      }
      setLoadingInterns(false);
    } catch (error) {
      setLoadingInterns(false);
      setErrorInterns(true);
      return;
    }
  }
  async function getProjects() {
    setLoadingProjects(true);
    setErrorProjects(false);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/projects", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
        console.log(data);
      } else {
        setErrorProjects(true);
        throw new Error("something wrong");
      }
      setLoadingProjects(false);
    } catch (error) {
      setLoadingProjects(false);
      setErrorProjects(true);
      return;
    }
  }
  async function getSupervisors() {
    setLoadingSupervisors(true);
    setErrorSupervisors(false);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/supervisors", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSupervisors(data);
        console.log(data);
      } else {
        setErrorSupervisors(true);
        throw new Error("something wrong");
      }
      setLoadingSupervisors(false);
    } catch (error) {
      setLoadingSupervisors(false);
      setErrorSupervisors(true);
      return;
    }
  }
  //////remove functions
  async function removeIntern(id) {
    console.log("begin removeeeeee");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/interns", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: id }),
      });

      console.log(response.ok);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUpdateArrays((prev) => prev + 1);
      } else {
        throw new Error("something wrong");
      }
    } catch (error) {
      console.log("errrrrrorr delete ");
      setErrorInterns(true);
      return;
    }
  }
  ////
  async function removeSupervisor(id) {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/supervisors", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUpdateArrays((prev) => prev + 1);
      } else {
        throw new Error("something wrong");
      }
    } catch (error) {
      console.log("errrrrrorr delete ");
      setErrorSupervisors(true);
      return;
    }
  }
  async function removeProject(id) {
    console.log("begin removeeeeee");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/projects", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUpdateArrays((prev) => prev + 1);
      } else {
        throw new Error("something wrong");
      }
    } catch (error) {
      console.log("errrrrrorr delete ");
      setErrorProjects(true);
      return;
    }
  }

  const update=function(){
    setUpdateArrays((prev) => prev + 1);
  }
  //////Effect

  useEffect(() => {
    if (userIsloginIn) {
      getInterns();
      getProjects();
      getSupervisors();
    }
  }, [userIsloginIn, updateArrays]);

  //object to export in value
  const contextValue = {
    isLoggedIn: userIsloginIn,
    token: token,
    login: loginHandler,
    logout: logoutHandler,
    interns: interns,
    projects: projects,
    supervisors: supervisors,
    loadingInterns: loadingInterns,
    errorInterns: errorInterns,
    loadingProjects: loadingProjects,
    errorProjects: errorProjects,
    loadingSupervisors: loadingSupervisors,
    errorSupervisors: errorSupervisors,
    removeIntern: removeIntern,
    removeProject: removeProject,
    removeSupervisor: removeSupervisor,
    internModal: internModal,
    supervisorModal: supervisorModal,
    projectModal: projectModal,
    closeInternModal: closeInternModal,
    closeSupervisorModal: closeSupervisorModal,
    closeProjectModal: closeProjectModal,
    openInternModal: openInternModal,
    openSupervisorModal: openSupervisorModal,
    openProjectModal: openProjectModal,
    update : update
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default Context;
