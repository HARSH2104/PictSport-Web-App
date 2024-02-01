import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { Link } from "react-router-dom";
// import { Json } from "sequelize/types/utils";
export default function ItemInfo(props) {
  const a = useContext(noteContext);
  const [userFavProduct, setUserFavProduct] = useState([]);
  const [isFav, setIsFav] = useState(0);
  const [ProductDescription, setProductDescription] = useState("");

  const checkForID = () => {
    a.setId(props.id);
    a.setproductImgUrl(props.Imageurl);
  };
  const LimitProductDescription = () => {
    let des = props.description;
    let ans = "";
    for (let i = 0; i < 100; i++) {
      if (i < des.length) {
        ans += des[i];
      } else {
        ans += ". ";
      }
    }
    setProductDescription(ans);
  };

  const addToFav = async () => {
    const uid = localStorage.getItem("uid");
    // localhost:3000/api/fav/addFav
    let bd = {
      user_id: uid,
      prod_id: props.id,
    };
    let option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(bd),
    };
    const res = await fetch("http://127.0.0.1:3000/api/fav/addFav", option);
    setIsFav(1);
  };
  const removeFromfav = async () => {
    const uid = localStorage.getItem("uid");
    let obj = {
      user_id: uid,
      prod_id: props.id,
    };

    let option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(obj),
    };

    const res = await fetch(
      "http://127.0.0.1:3000/api/fav/removeFromFav",
      option
    );
    setIsFav(0);
  };

  useEffect(() => {
    const findAllfav = async () => {
      const uid = localStorage.getItem("uid");
      let res = await fetch("http://127.0.0.1:3000/api/fav/findAllFav/" + uid);
      res = await res.json();
      // console.log("fav array is ", res);
      setUserFavProduct(res);
      // console.log("fav list ", res);
    };
    findAllfav();
    LimitProductDescription();
  }, []);

  useEffect(() => {
    setIsFav(0);
    for (let product = 0; product < userFavProduct.length; product++) {
      if (props.id == userFavProduct[product].id) {
        setIsFav(1);
        break;
      }
    }
  }, [userFavProduct]);

  return (
    <>
      <div className="my-3">
        <div className="card border border-5 border-white ">
          <img
            src={`/Images/${props.Imageurl}`}
            height={"200px"}
            // width={"100px"}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{ProductDescription}...</p>
          </div>
          <div className="d-flex justify-content-between my-2">
            <Link
              className="btn btn-info mx-3"
              to="/infoofitem"
              onClick={checkForID}
            >
              read more
            </Link>
            <button
              className="btn btn-info mx-3 "
              onClick={isFav ? removeFromfav : addToFav}
            >
              {isFav ? "unfavourite" : "favourite"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
