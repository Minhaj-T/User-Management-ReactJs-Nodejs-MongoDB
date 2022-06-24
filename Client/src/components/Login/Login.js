import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import classname from 'classnames';

function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState({});

  let handleLogin = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      let logDetails = {
        email,
        password,
      };

      const { data } = await axios.post('/api/users/login', logDetails, config);
      console.log('this is out loged in data', data);
      localStorage.setItem('userinfo', JSON.stringify(data));
      if (localStorage.userinfo) {
        navigate('/user');
      }
    } catch (error) {
      seterror(error.response.data);
      console.log('thissisisi', error.response.data);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div
          style={{ paddingTop: '7em' }}
          className="col-lg-10 col-xl-9 mx-auto "
        >
          <div className="card flex-row  border-0 shadow rounded-3 overflow-hidden">
            <div className="card-img-left d-none d-md-flex"></div>
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-3">
                Sign in
              </h5>
              <form onSubmit={handleLogin} method="post">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    className={classname('form-control', {
                      'is-invalid': error.email,
                    })}
                    id="floatingInputEmail"
                    placeholder="name@example.com"
                    name="email"
                    autoFocus
                  />
                  {error.email && (
                    <div className="invalid-feedback">{error.email}</div>
                  )}
                  <label htmlFor="floatingInputEmail">Email address</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    className={classname('form-control', {
                      'is-invalid': error.password,
                    })}
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                  />
                  {error.password && (
                    <div className="invalid-feedback">{error.password}</div>
                  )}
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="d-grid mb-2">
                  <button
                    className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                    type="submit"
                  >
                    Login
                  </button>
                  <Link
                    className="d-block text-center mt-2 small"
                    to="/register"
                  >
                    Don't have an account yet? Register
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
