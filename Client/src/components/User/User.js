import React, { useEffect, useState } from "react";
import "./User.css";
import { useNavigate} from "react-router-dom";

function User() {
  const [Userdetails, setUserdetails] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const userinfo = localStorage.getItem("userinfo");
    if (userinfo) {
      navigate("/user");
      setUserdetails(JSON.parse(userinfo));
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <section className="sec vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div className="crd card mb-3">
              <div className="row g-0">
                <div className="imgsec col-md-4 gradient-custom text-center text-white">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    className="img-fluid my-5"
                    style={{ width: "80px" }}
                  />
                  <h5>{Userdetails.name}</h5>
                  <p>Web Designer</p>
                  <i className="far fa-edit mb-5"></i>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">{Userdetails.email}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Phone</h6>
                        <p className="text-muted">123 456 789</p>
                      </div>
                    </div>
                    <h6>Projects</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Recent</h6>
                        <p className="text-muted">Lorem ipsum</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Log out</h6>
                        <a
                          onClick={() => {
                            localStorage.clear();
                            navigate("/");
                          }}
                          className="text-muted"
                        >
                          Click here
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default User;
