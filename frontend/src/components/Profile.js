import React, { useContext, useState, useEffect } from "react";
import ItemInfo from "./ItemInfo";
import noteContext from "../context/notes/noteContext";

export default function Profile() {
  const a = useContext(noteContext);

  console.log("User id", a.userId);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userContact, setUserContact] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userMyProduct, setUserMyProduct] = useState([]);
  const [userFavProduct, setUserFavProduct] = useState([]);

  useEffect(() => {
    async function fetchCurUser() {
      let fetchres = await fetch(
        `http://127.0.0.1:3000/api/user/finduserbyid/${a.userId}`
      );

      let res = await fetchres.json();
      console.log(res);
      setUserName(res.name);
      setUserContact(res.phone);
      setUserEmail(res.email);
      setUserAddress(res.address);
    }

    async function fetchMyproduct() {
      let fetchres = await fetch(
        `http://127.0.0.1:3000/api/prod/findmyprod/${a.userId}`
      );
      let res = await fetchres.json();
      setUserMyProduct(res);
    }
    a.userId && fetchCurUser();
    fetchMyproduct();

    async function fetchFav() {
      let fetchres = await fetch(
        `http://127.0.0.1:3000/api/fav/findAllFav/${a.userId}`
      );
      let res = await fetchres.json();
      // console.log(res);
      setUserFavProduct(res);
    }

    fetchFav();
  }, [a]);

  const InformationOfCard = [
    {
      id: 1,
      name: "jiophone",
      description: "India ka smartphone",
      price: 1500,
      image_url: null,
      location: "nagar",
      isavailable: true,
      categId: 1,
      userId: 2,
    },
    {
      id: 2,
      name: "cosmos",
      description: "by carl sagan",
      price: 500,
      image_url: null,
      location: "nagar",
      isavailable: true,
      categId: 2,
      userId: 2,
    },
    {
      id: 3,
      name: "cosmos",
      description: "by carl sagan",
      price: 500,
      image_url: null,
      location: "nagar",
      isavailable: true,
      categId: 2,
      userId: 1,
    },
  ];

  return (
    <>
      <div className="container rounded bg-light mt-1 mb-3">
        <div className="row">
          <div className="col-md-6  ">
            <div className="p-3 py-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2 ">
                <div className="col-sm-8">
                  <h6 className="mb-0">Full Name : {userName}</h6>
                </div>
              </div>
              <hr />
              <div className="row mt-2">
                <div className="col-sm-8">
                  <h6 className="mb-0">Contact Number : {userContact}</h6>
                </div>
              </div>
              <hr />
              <div className="row mt-2">
                <div className="col-sm-8">
                  <h6 className="mb-0">Address : {userAddress}</h6>
                </div>
              </div>
              <hr />
              <div className="row mt-2">
                <div className="col-sm-8">
                  <h6 className="mb-0">Email ID : {userEmail}</h6>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
        <hr />

        {/* Favourite product list */}
        <div className="container my-3">
          <h2 className="text-right">Favourite Products</h2>
          <div className="row my-3">
            {console.log("The size is ", userFavProduct.length)}
            {userFavProduct.map((element) => {
              return (
                <div className="col-md-3" key={element.id}>
                  <ItemInfo
                    title={element.name}
                    description={element.description}
                    Imageurl={element.image_url}
                    price={element.price}
                    id={element.id}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <hr />
        <div className="container my-3">
          <h2 className="text-right">My Products</h2>
          <div className="row my-3">
            {console.log("The size is ", userMyProduct.length)}
            {userMyProduct.map((element) => {
              return (
                <div className="col-md-3" key={element.id}>
                  <ItemInfo
                    title={element.name}
                    description={element.description}
                    Imageurl={element.image_url}
                    price={element.price}
                    id={element.id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
