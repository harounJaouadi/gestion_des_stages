
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../context/Context";
import modules from "./AuthForm.module.css";

const AuthForm = function () {
  const ctx=useContext(Context) ; 
  const navigate=useNavigate() ; 
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(false);
  const [isLoding, setIsLoading] = useState(false);
  const [passwordDisplay, setPasswordDisplay] = useState("password");
  // const switchAuthModeHandler = function () {
  //   setIsLogin((prev) => !prev);
  // };

  const login=(token)=>{
    ctx.login(token) ;
    navigate("/home" ) ;
    localStorage.setItem("tokenDate",(new Date().getTime()).toString()) ; 
    
  }
  const logout=()=>{
    ctx.logout() ; 
    localStorage.removeItem("tokenDate") ; 
  }

  const displayPassword = function () {
    if (passwordDisplay == "password") {
      setPasswordDisplay("text");
    } else {
      setPasswordDisplay("password");
    }
  };
  const submitHandler = (event) => {
    setIsLoading((prev) => !prev);
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    
    //validation
    if (isLogin) {
    } else {
      fetch("http://localhost:8000/api/login_check", {
        method: "POST",
        body: JSON.stringify({
          username: enteredEmail,
          password: enteredPassword,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }).then((res) => {
        setIsLoading(false);
        if (res.ok) {
          //...
           
          return res.json().then((data) => {
            //success
            console.log(data.token) ; 
            login(data.token) ;
            
            
            
          });
        } else {
          alert("authentification failed");
        }
      });
    }
  };

  return (
    <div className={modules["div-form"]}>
      <form className={modules.form} onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            ref={emailInputRef} 
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            password
          </label>
          <input
            type={passwordDisplay}
            className="form-control"
            id="exampleInputPassword1"
            ref={passwordInputRef}
          />
        </div>

        <div className="mb-3 form-check">
          {!isLoding &&
            <>
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                onClick={displayPassword}
              />
              <label className="form-check-label" htmlFor="exampleCheck1" >
                display password
              </label>
            </>
          }
          {isLoding && <p>sending request ...</p>}
        </div>
        {!isLoding && (
          <button type="submit" className="btn btn-primary" >
            Submit
          </button>
        )}

        {isLoding && (
          <button type="submit" className="btn btn-primary" disabled>
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
