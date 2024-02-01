import React, { useEffect, useState, useContext } from "react";
import ItemInfo from "./ItemInfo";
import noteContext from "../context/notes/noteContext";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const a = useContext(noteContext);
  let [pageNumber, setPageNumber] = useState(1);
  let [totalProduct, settotalProd] = useState(0);
  let [InformationOfCard, setData] = useState([]);

  useEffect(() => {
    if (a.selectedCategoryId == "null") {
      fetch("http://127.0.0.1:3000/api/prod/getAllprod?page=1&limit=2")
        .then((response) => response.json())
        .then((data) => {
          setData(data.resuser);
          settotalProd(data.totalProd);
        });
    } else {
      fetch(
        `http://127.0.0.1:3000/api/prod/findprodbycatid/${a.selectedCategoryId}?page=1&limit=2`
      )
        .then((response) => response.json())
        .then((data) => {
          setData(data.resuser);
          settotalProd(data.totalProd);
          console.log(data);
        });
    }
  }, [a]);

  // console.log(InformationOfCard);
  // const InformationOfCard = [
  // {
  //     "id": 1,
  //     "name": "jiophone",
  //     "description": "India ka smartphone",
  //     "price": 1500,
  //     "image_url": null,
  //     "location": "nagar",
  //     "isavailable": true,
  //     "categId": 1,
  //     "userId": 2
  // },
  //     {
  //         "id": 2,
  //         "name": "cosmos",
  //         "description": "by carl sagan",
  //         "price": 500,
  //         "image_url": null,
  //         "location": "nagar",
  //         "isavailable": true,
  //         "categId": 2,
  //         "userId": 2
  //     },
  // {
  //     "id": 3,
  //     "name": "cosmos",
  //     "description": "by carl sagan",
  //     "price": 500,
  //     "image_url": null,
  //     "location": "nagar",
  //     "isavailable": true,
  //     "categId": 2,
  //     "userId": 1
  // },

  // ]
  // const fetchMoreData = async () => {
  //   try {
  //     setPageNumber((prevPageNumber) => prevPageNumber + 1);
  // let res = await fetch(
  //   `http://127.0.0.1:3000/api/prod/getAllprod?page=${pageNumber}&limit=1`
  // );
  // res = await res.json();
  //     console.log("res =>", res.resuser);
  //     console.log("Inf =>", InformationOfCard);
  //     setData([...InformationOfCard, ...res.resuser]);
  // if (InformationOfCard.length >= res.totalProd) {
  //   setIsMoreProduct(false);
  // }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const HandleNextClick = async () => {
    console.log("next");
    let res;
    if (a.selectedCategoryId == "null") {
      res = await fetch(
        `http://127.0.0.1:3000/api/prod/getAllprod?page=${
          pageNumber + 1
        }&limit=2`
      );
    } else {
      res = await fetch(
        `http://127.0.0.1:3000/api/prod/findprodbycatid/${
          a.selectedCategoryId
        }?page=${pageNumber + 1}&limit=2`
      );
    }

    res = await res.json();
    pageNumber += 1;
    setPageNumber(pageNumber);
    setData([...InformationOfCard, ...res.resuser]);
    settotalProd(res.totalProd);
    console.log(res);

    console.log("info len=>", InformationOfCard);
    console.log("total =>", res.totalProd);
  };

  return (
    <>
      <div className="container">
        {console.log("info =>", InformationOfCard)}
        {/* <InfiniteScroll
          dataLength={InformationOfCard.length}
          next={fetchMoreData}
          hasMore={isMoreProduct}
          loader={<h4>Loading...</h4>}
        > */}
        <div className="row my-5">
          {InformationOfCard.map((element) => {
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
        <div className="container d-flex justify-content-center ">
          <button
            disabled={InformationOfCard.length >= totalProduct}
            type="button"
            className="btn btn-dark"
            onClick={HandleNextClick}
          >
            Next
          </button>
        </div>
        {/* </InfiniteScroll> */}
      </div>
    </>
  );
}

// name
// image url
// price
// description
