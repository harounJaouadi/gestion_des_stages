import { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../context/Context";
import modules from "./NavBar.module.css";

const NavBar = function () {
  const ctx=useContext(Context) ;
  const logout=function(){
    ctx.logout() ;
  } ; 

   

  return (
    <nav className={"navbar bg-primary "+modules.all}>
      <div className="container-fluid" >
        <div  className={"navbar-brand d-inline"+" "+modules["text-color"]}  >
          <img
            src="images/pngwing.com.png"
            alt=""
            width="30"
            height="30"
            className="d-inline-block align-text-top"
          />
          &emsp; Name of the company 
        </div>
        {ctx.isLoggedIn && <div className={"d-inline "+modules.admin+" "+modules["text-color"]}>
          <div className={"d-inline "+modules.tag}><Link  to="/home" className="btn btn-dark">Home</Link></div>  
          <button type="button" className="btn btn-secondary" onClick={logout}>logout</button>
         
          
        </div>}
        
        
      </div>
      
    </nav>
  );
};

export default NavBar;
