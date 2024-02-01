import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useHistory, Navigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

export default function Navbar() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [UserName, setUserName] = useState("");
  const [UserContact, setUserContact] = useState("");
  const [ConfirmPassword, setConfirm] = useState(0);
  const [newEmail, setNewEmail] = useState("");
  const [passwordDifficulty, setPasswordDifficulty] = useState(0);
  const [passwordDifficultyForLogin, setPasswordDifficultyForLogin] =
    useState(0);

  const [infoInSearch, setinfoInSearch] = useState("");
  const [newPassword1, setNewPassword] = useState("");
  const [newCPassword, setNewCPassword] = useState("");
  const [validedContact, setValidContact] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isLogIn, setIsLogIn] = useState(0);
  const [searchedArr, setsearchedArr] = useState([]);

  const a = useContext(noteContext);

  const emailInput = () => {
    let Email = document.getElementById("exampleInputEmail1").value;
    setEmail(Email);
  };
  const emailInput2 = () => {
    let Email = document.getElementById("exampleInputEmail2").value;
    setNewEmail(Email);
  };
  const firstName = () => {
    let FirstName = document.getElementById("FirstName").value;
    setFirstName(FirstName);
  };
  const lastName = () => {
    let LastName = document.getElementById("LastName").value;
    setLastName(LastName);
  };
  const userName = () => {
    let UserName = document.getElementById("userName").value;
    setUserName(UserName);
  };
  const Search = () => {
    let Information_search = document.getElementById("searchinfoinurl").value;
    setinfoInSearch(Information_search);
  };
  const userContact = () => {
    let UserContact = document.getElementById("userContact").value;
    setUserContact(UserContact);
    ValidedContactNumber();
  };

  const confirmPassword = () => {
    let firstPassword = document.getElementById("exampleInputPassword2").value;
    let secondPassword = document.getElementById(
      "cexampleInputPassword2"
    ).value;
    setNewCPassword(secondPassword);

    if (firstPassword.length !== 0 && firstPassword === secondPassword) {
      document.getElementById("collapseOne").innerHTML = "";
      setConfirm(1);
    } else if (secondPassword.length === 0) {
      document.getElementById("collapseOne").innerHTML = "";
      setConfirm(0);
    } else {
      document.getElementById("collapseOne").innerHTML =
        "The password does not match";
      setConfirm(0);
    }
  };

  const ValidedContactNumber = () => {
    let contact_number = document.getElementById("userContact").value;

    if (contact_number.length !== 10 || contact_number[0] - "0" === 0) {
      setValidContact(0);
      return;
    }

    for (let i = 0; i < contact_number.length; i++) {
      if (contact_number[i] - "0" < 0 || contact_number[i] - "0" > 9) {
        setValidContact(0);
        return;
      }
    }

    setValidContact(1);
  };

  const passwordInput2 = () => {
    let newPassword = document.getElementById("exampleInputPassword2").value;
    setNewPassword(newPassword);
    let secondPassword = document.getElementById(
      "cexampleInputPassword2"
    ).value;
    let capitalLetter = 0;
    let smallLetter = 0;
    let digit = 0;
    let specialCharacter = 0;
    let length = newPassword.length;

    for (let i = 0; i < length; i++) {
      if (newPassword[i] >= "A" && newPassword[i] <= "Z") {
        capitalLetter++;
      } else if (newPassword[i] >= "0" && newPassword[i] <= "9") {
        digit++;
      } else if (newPassword[i] >= "a" && newPassword[i] <= "z") {
        smallLetter++;
      } else {
        specialCharacter++;
      }
    }
    if (
      length < 8 ||
      capitalLetter == 0 ||
      smallLetter == 0 ||
      digit == 0 ||
      specialCharacter == 0
    ) {
      // document.getElementById("collapseTwo").innerHTML="Password should contain minimum of 8 characters with atleast 1 capital letter,1 small character,1 digit and 1 special characters";
      setPasswordDifficulty(0);
    } else {
      // document.getElementById("collapseTwo").innerHTML="";
      setPasswordDifficulty(1);
    }

    if (secondPassword.length != 0 && secondPassword == newPassword) {
      // document.getElementById("collapseOne").innerHTML="";
      setConfirm(1);
    } else if (secondPassword.length != 0) {
      // document.getElementById("collapseOne").innerHTML="The password does not match";
      setConfirm(0);
    }
  };

  const passwordInputforlogin = () => {
    let newPassword = document.getElementById("exampleInputPassword1").value;
    setPassword(newPassword);
    let capitalLetter = 0;
    let smallLetter = 0;
    let digit = 0;
    let specialCharacter = 0;
    let length = newPassword.length;

    for (let i = 0; i < length; i++) {
      if (newPassword[i] >= "A" && newPassword[i] <= "Z") {
        capitalLetter++;
      } else if (newPassword[i] >= "0" && newPassword[i] <= "9") {
        digit++;
      } else if (newPassword[i] >= "a" && newPassword[i] <= "z") {
        smallLetter++;
      } else {
        specialCharacter++;
      }
    }
    if (
      length < 8 ||
      capitalLetter == 0 ||
      smallLetter == 0 ||
      digit == 0 ||
      specialCharacter == 0
    ) {
      // document.getElementById("collapseTwo").innerHTML="Password should contain minimum of 8 characters with atleast 1 capital letter,1 small character,1 digit and 1 special characters";
      setPasswordDifficultyForLogin(0);
    } else {
      // document.getElementById("collapseTwo").innerHTML="";
      setPasswordDifficultyForLogin(1);
    }

    // if (secondPassword.length != 0 && secondPassword == newPassword) {
    //     // document.getElementById("collapseOne").innerHTML="";
    //     setConfirm(1);
    // }
    // else if (secondPassword.length != 0) {
    //     // document.getElementById("collapseOne").innerHTML="The password does not match";
    //     setConfirm(0);
    // }
  };

  const clearData = () => {
    if (password != "") {
      setPassword("");
    }
    if (email != "") {
      setEmail("");
    }
  };

  const clearData2 = () => {
    if (FirstName != "") {
      setFirstName("");
    }
    if (LastName != "") {
      setLastName("");
    }
    if (UserName != "") {
      setUserName("");
    }
    if (UserContact != "") {
      setUserContact("");
    }
    if (newEmail != "") {
      setNewEmail("");
    }
    if (newPassword1 != "") {
      setNewPassword("");
    }
    if (newCPassword != "") {
      setNewCPassword("");
    }
    setPasswordDifficulty(0);
    // document.getElementById("collapseOne").innerHTML = "";
    // document.getElementById("collapseTwo").innerHTML = "";
  };

  // const loginref = useRef(null);

  // useEffect(() => {
  //     const handleClickOutside = (event) => {
  //         if (loginref.current && !loginref.current.contains(event.target)) {
  //             setOutsideClick(1);
  //         }
  //         else{
  //             setOutsideClick(0);
  //         }
  //     };
  //     document.addEventListener('click', handleClickOutside, true);
  //     return () => {
  //         document.removeEventListener('click', handleClickOutside, true);
  //     };
  // });

  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/cat/getAllCateg")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));

    if (
      localStorage.getItem("uid") === "-1" ||
      localStorage.getItem("uid") == null
    ) {
      setIsLogIn(0);
    } else {
      setIsLogIn(1);
    }
  }, []);

  const loginfunc = async () => {
    let user = {
      email: email,
      password: password,
    };
    // Options to be given as parameter
    // in fetch for making requests
    // other then GET
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    };
    // Fake api for making post requests

    let fetchRes = await fetch("http://127.0.0.1:3000/api/user/login", options);
    let res = await fetchRes.json();

    // let uid = res.id;
    // a.setUserId(uid);
    // assuming your JWT token is stored in a variable named `token`

    setIsLogIn(1);
    localStorage.setItem("token", res.accessToken);
    localStorage.setItem("uid", res.uid);
  };

  const profilefunc = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: ` Bearer ${token} `,
    };
    let fetchres = await fetch("http://127.0.0.1:3000/api/user/curuser", {
      headers,
    });
    let res = await fetchres.json();
    let uid = res.id;
    a.setUserId(uid);
  };

  const logoutfunc = () => {
    localStorage.clear();
    setIsLogIn(0);
    a.setUserId(-1);
    // Navigate("/");
  };

  const createAcc = async () => {
    let s = FirstName + " " + LastName;
    let obj = {
      name: s,
      email: newEmail,
      phone: UserContact,
      address: UserName,
      password: newPassword1,
    };

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(obj),
    };

    let fetchRes = await fetch(
      "http://127.0.0.1:3000/api/user/saveUser",
      options
    );
    let res = await fetchRes.json();
  };

  const seachFun = async () => {};

  return (
    <>
      <div className="container my-3">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <div className="navbar-brand">PICT KA OLX</div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/aboutUs">
                    About Us
                  </Link>
                </li>
                <li className="nav-item dropdown ">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    
                    {categories.length == 0 || a.selectedCategoryId == "null"
                      ? "All"
                      : categories[a.selectedCategoryId - 1].name}
                  </a>
                  <ul
                    className="dropdown-menu custom-dropdown"
                    id="myDropDownValues"
                  >
                    <li
                      className="dropdown-item"
                      onClick={() => a.setSelectedCategoryId("null")}
                    >
                      ALL
                    </li>

                    {categories.map((element) => {
                      return (
                        <li
                          className="dropdown-item"
                          key={element.id}
                          onClick={() =>
                            a.setSelectedCategoryId(`${element.id}`)
                          }
                        >
                          {element.name}
                        </li>
                      );
                    })}
                  </ul>
                  {/* {console.log(
                    "THe select id is #######",
                    a.selectedCategoryId
                  )} */}
                </li>
                {isLogIn ? (
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      aria-current="page"
                      to="/profile"
                      onClick={profilefunc}
                    >
                      Profile
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      className="nav-link disabled"
                      aria-current="page"
                      to="/profile"
                      onClick={profilefunc}
                    >
                      Profile
                    </Link>
                  </li>
                )}
                {/* <li className="nav-item">
                  <Link
                    className="nav-link disabled"
                    aria-current="page"
                    to="/profile"
                    onClick={profilefunc}
                  >
                    Profile
                  </Link>
                </li> */}
              </ul>

              <ul className="navbar-nav  mb-2 mb-lg-0">
                <li className="nav-item my-2">
                  <form className="d-flex" role="search">
                    <input
                      className="form-control me-2"
                      id="searchinfoinurl"
                      type="search"
                      value={infoInSearch}
                      placeholder="Search"
                      aria-label="Search"
                      onChange={Search}
                    />
                    <button className="btn btn-outline-success" type="submit">
                      Search
                    </button>
                  </form>
                </li>
                <li className="nav-item my-2 mx-3">
                  {localStorage.getItem("token") ? (
                    <Link to="/">
                      <button
                        type="button"
                        className="btn btn-outline-danger login "
                        onClick={logoutfunc}
                      >
                        {isLogIn ? "Logout" : "Login"}
                      </button>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline-danger login "
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                      onClick={clearData}
                    >
                      {isLogIn ? "Logout" : "Login"}
                    </button>
                  )}
                </li>
                <li className="nav-item my-2">
                  <Link className="btn btn-outline-danger" to="/SellItem">
                    Sell the item
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* login modal */}
        <div
          className="modal fade"
          id="loginModal"
          tabIndex="-1"
          aria-labelledby="loginModalLabel"
          aria-hidden="true"
        >
          {" "}
          {/* ref={loginref} */}
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label"
                      id="username"
                    >
                      Email address <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={emailInput}
                    />
                    <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Password <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="password"
                      value={password}
                      className="form-control"
                      id="exampleInputPassword1"
                      onChange={passwordInputforlogin}
                    />
                    {passwordDifficultyForLogin === 0 && password != "" && (
                      <p style={{ color: "red" }}>
                        Password should contain minimum of 8 characters with
                        atleast 1 capital letter,1 small character,1 digit and 1
                        special characters
                      </p>
                    )}
                  </div>
                </form>

                <p>
                  <span style={{ color: "red" }}>*</span> are required fields
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#createAccModal"
                  onClick={clearData2}
                >
                  Create new Account
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  disabled={
                    passwordDifficultyForLogin === 0 ||
                    email.length === 0 ||
                    password.length === 0
                  }
                  onClick={loginfunc}
                >
                  Login
                </button>
                {/*link has been deleted*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>

                {/* <!-- <button type="button" className="btn btn-primary">Save changes</button> --> */}
              </div>
            </div>
          </div>
        </div>

        {/* create account modal */}

        <div
          className="modal fade"
          id="createAccModal"
          tabIndex="-1"
          aria-labelledby="createAccModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content ">
              <div className="modal-header">
                <h5 className="modal-title" id="createAccModalLabel">
                  Create New Account
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="input-group my-3">
                    <span className="input-group-text">
                      First and last name{" "}
                      <span style={{ color: "red" }}>*</span>{" "}
                    </span>
                    <input
                      type="text"
                      value={FirstName}
                      aria-label="First name"
                      className="form-control"
                      id="FirstName"
                      onChange={firstName}
                    />
                    {/* <!-- <input type="text" aria-label="middle name" className="form-control"> --> */}
                    <input
                      type="text"
                      value={LastName}
                      aria-label="Last name"
                      className="form-control"
                      id="LastName"
                      onChange={lastName}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="userName" className="form-label">
                      address <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={UserName}
                      className="form-control"
                      id="userName"
                      onChange={userName}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="userContact" className="form-label">
                      Contact <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={UserContact}
                      className="form-control"
                      id="userContact"
                      onChange={userContact}
                    />
                    {validedContact === 0 && UserContact !== "" && (
                      <p style={{ color: "red" }}>Enter Valid contact number</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail2" className="form-label">
                      Email address <span style={{ color: "red" }}>*</span>
                    </label>
                    {/* { id is changed */}{" "}
                    <input
                      type="email"
                      value={newEmail}
                      className="form-control"
                      id="exampleInputEmail2"
                      aria-describedby="emailHelp"
                      onChange={emailInput2}
                    />
                    <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword2"
                      className="form-label"
                    >
                      Password <span style={{ color: "red" }}>*</span>
                    </label>
                    {/* { id is changed */}{" "}
                    <input
                      type="password"
                      value={newPassword1}
                      className="form-control"
                      id="exampleInputPassword2"
                      onChange={passwordInput2}
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="#collapseTwo"
                    />
                    {passwordDifficulty === 0 && newPassword1 !== "" && (
                      <p style={{ color: "red" }}>
                        Password should contain minimum of 8 characters with
                        atleast 1 capital letter,1 small character,1 digit and 1
                        special characters
                      </p>
                    )}
                    {/* <span id='collapseTwo' className='accordion-collapse collapse' style={{color: 'red'}}></span> */}
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="cexampleInputPassword2"
                      className="form-label"
                    >
                      Confirm Password <span style={{ color: "red" }}>*</span>
                    </label>
                    {/* { id is changed */}{" "}
                    <input
                      type="password"
                      value={newCPassword}
                      className="form-control"
                      id="cexampleInputPassword2"
                      onChange={confirmPassword}
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="#collapseOne"
                    />
                    <span
                      id="collapseOne"
                      className="accordion-collapse collapse"
                      style={{ color: "red" }}
                    ></span>
                  </div>
                </form>

                <p>
                  <span style={{ color: "red" }}>*</span> are required fields
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  disabled={
                    FirstName.length === 0 ||
                    LastName.length === 0 ||
                    UserName.length === 0 ||
                    ConfirmPassword === 0 ||
                    newEmail.length === 0 ||
                    passwordDifficulty === 0 ||
                    validedContact === 0
                  }
                  onClick={createAcc}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
