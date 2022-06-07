import {React,useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import "./Register.css";
import axios from 'axios';
import classname from 'classnames';

function Register() {
  const navigate = useNavigate();
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [error, seterror] = useState({})
  console.log("this is the",error);
  
  let handleLogin=async(e)=>{
    e.preventDefault()
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post("/api/users", {
        name,
        email,
        password,
      }, config)
      console.log(data);
      // localStorage.setItem("userinfo", JSON.stringify(data))
      navigate('/')

      
    } catch (error) {
      seterror(error.response.data)
    }

    
    // axios.post('/api/user/register',subDetails).then((res)=>{
    //   console.log("thissss",res.data);
    //   navigate("/")

    // }).catch((err)=>{seterror(err.response.data)})
  }
  return (
    <div className="container">
      <div className="row">
        <div style={{paddingTop:"7em"}} className="col-lg-10 col-xl-9 mx-auto ">
          <div  className="card flex-row  border-0 shadow rounded-3 overflow-hidden">
            <div className="card-img-leftt1 d-none d-md-flex"></div>
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-3">
                Register
              </h5>
              <form onSubmit={handleLogin} method="post">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e)=>{setname(e.target.value)}}
                    className={classname('form-control',{
                    'is-invalid': error.name
                    })}
                    id="floatingInputUsername"
                    placeholder="myusername"
                    name="name"
                    autoFocus
                  />
                  {error.name && (<div className="invalid-feedback">{error.name}</div>)}
                  <label htmlFor="floatingInputUsername">Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    value={email}
                    onChange={(e)=>{setemail(e.target.value)}}
                    className={classname('form-control',{
                      'is-invalid':error.email
                    })}
                    id="floatingInputEmail"
                    placeholder="name@example.com"
                    name="email"
                  />
                  {error.email && (<div className="invalid-feedback">{error.email} </div>)}
                  <label htmlFor="floatingInputEmail">Email address</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e)=>{setpassword(e.target.value)}}
                    className={classname('form-control',{
                      'is-invalid':error.password  
                    })}
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                  />
                  {error.password && (<div className="invalid-feedback">{error.password} </div>)}
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="d-grid mb-2">
                  <button
                    className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                    type="submit"
                  >
                    Register
                  </button>
                  <Link className="d-block text-center mt-2 small" to="/">Have an account? Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
