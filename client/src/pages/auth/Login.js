import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import {
  MailOutlined,
  GoogleOutlined,
  RightCircleFilled,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
//import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import {createOrUpdateUser} from "../../functions/auth";


// const roleBasedRedirect = (res) => {
//   if (res.data.role === "admin") {
//     navigate("/admin/dashboard");
//   } else {
//     navigate("/user/dashboard")
//   }
// }

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();

  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    let intended = location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) navigate("/");
    }

    
  }, [user, navigate]);

  const roleBasedRedirect = (res) => {
//check if intended
    let intended = location.state;
    
    if(intended) {
      
      navigate(intended.from);
    } else{
      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/history");
      }
    }    
  }

 

  let dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      //console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
      .then(res => {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            name:res.data.name,
            email: res.data.email,
            token: idTokenResult.token,
            role:res.data.role,
            _id: res.data._id
          },
        });
        roleBasedRedirect(res);
        setLoading(false);
      })
      .catch(err => console.log(err));
      //navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.message);
      
    }
  };
  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
        .then(res => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name:res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role:res.data.role,
              _id: res.data._id
            },
          });
          roleBasedRedirect(res);
        })
        .catch(err => console.log(err));
        //navigate("/");
    
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          placeholder="Your email"
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}

          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>
          <Link to="/forgot/password" className="text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
