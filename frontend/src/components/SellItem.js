import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function SellItem() {
  const [ProName, setProName] = useState("");
  const [LocationAddress, setLocationAddress] = useState("");
  const [CostofItem, setCostofItem] = useState("");
  const [QuantityofItem, setQuantityofItem] = useState("");
  const [DescriptionofItem, setDescriptionofItem] = useState("");
  const [numberOfImage, setnumberOfImage] = useState(0);
  const [validCostofItem, setValidCostofItem] = useState(0);
  const [validQuantityofItem, setValidQuantityofItem] = useState(0);
  const [checkCategory, setcheckCategory] = useState(0);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const initialingProductName = () => {
    let newProductName = document.getElementById("ProductNameID").value;
    setProName(newProductName);
  };
  const initialLocationAddress = () => {
    let newLocationAddress = document.getElementById("ProductLocation").value;
    setLocationAddress(newLocationAddress);
  };
  const initialCostofItem = () => {
    let newCostofItem = document.getElementById("ProductCost").value;
    setCostofItem(newCostofItem);
    checkValidCostOfItem();
  };

  const initialQuantityofItem = () => {
    let newQuantityofItem = document.getElementById("ProductQuantity").value;
    setQuantityofItem(newQuantityofItem);
    checkValidQuantityOfItem();
  };
  const initialDescriptionofItem = () => {
    let newDescriptionofItem =
      document.getElementById("ProductDescription").value;
    setDescriptionofItem(newDescriptionofItem);
  };

  const checkValidCostOfItem = () => {
    let curCost = document.getElementById("ProductCost").value;

    if (curCost.length === 0) {
      setValidCostofItem(0);
      return;
    }
    for (let i = 0; i < curCost.length; i++) {
      if (curCost[i] < "0" || curCost[i] > "9") {
        setValidCostofItem(0);
        return;
      }
    }
    setValidCostofItem(1);
  };

  const checkValidQuantityOfItem = () => {
    let curQuantity = document.getElementById("ProductQuantity").value;

    if (curQuantity.length === 0) {
      setValidQuantityofItem(0);
      return;
    }
    for (let i = 0; i < curQuantity.length; i++) {
      if (curQuantity[i] < "0" || curQuantity[i] > "9") {
        setValidQuantityofItem(0);
        return;
      }
    }
    setValidQuantityofItem(1);
  };

  const checkNumberOfImage = () => {
    let val = document.getElementById("formFileMultiple").value;
    // console.log("The size is " + val.length);
    // console.log(val);
    if (val.length === 0) {
      setnumberOfImage(0);
    } else {
      setnumberOfImage(1);
    }
  };

  const checkForCategory = () => {
    let val = document.getElementById("ProductCategory").value;
    // console.log(val);
    if (val === "0") {
      setcheckCategory(0);
    } else {
      setcheckCategory(val);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the form data to the server...
    navigate("/");
  };

  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/cat/getAllCateg")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  }, []);

  console.log(categories);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      addProduct(file);
    }
  };

  const addProduct = async (file) => {
    let uid = localStorage.getItem("uid");

    const formData = new FormData();
    formData.append("image_url", file);
    formData.append("name", ProName);
    formData.append("desc", DescriptionofItem);
    formData.append("price", CostofItem);
    formData.append("loc", LocationAddress);
    formData.append("catid", checkCategory);
    formData.append("seller_id", uid);
    formData.append("quantity", QuantityofItem);

    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:3000/api/prod/addProduct", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
        method="POST"
        action=""
      >
        <div className="container-xxl " style={{}}>
          <h1 className="my-3">Item Information</h1>

          <div className="input-group mb-3 ">
            <span className="input-group-text mx-3 col-md-3">
              {" "}
              Product Name <span style={{ color: "red" }}>*</span>
            </span>
            <input
              type="text"
              value={ProName}
              id="ProductNameID"
              className="form-control "
              placeholder="Product Name"
              aria-label="ProductName"
              aria-describedby="ProductName"
              onChange={initialingProductName}
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text mx-3 col-md-3">
              {" "}
              Location<span style={{ color: "red" }}>*</span>
            </span>
            <input
              type="text"
              value={LocationAddress}
              className="form-control"
              placeholder="Location of item"
              id="ProductLocation"
              aria-label="ProductLocation"
              aria-describedby="ProductLocation"
              onChange={initialLocationAddress}
            />
          </div>

          <div className="input-group mb-3">
            <label
              htmlFor="ProductCost"
              className="form-label input-group-text mx-3 col-md-3"
            >
              {" "}
              Cost of the Product in Rs<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              value={CostofItem}
              className="form-control"
              placeholder="Cost of the Product in Rs"
              id="ProductCost"
              aria-label="ProductCost"
              aria-describedby="ProductCost"
              onChange={initialCostofItem}
            />
          </div>
          {validCostofItem === 0 && CostofItem !== "" && (
            <p style={{ color: "red", textAlign: "center" }}>
              Cost of the Item should contains only integer value
            </p>
          )}

          <div className="input-group mb-3">
            <label
              htmlFor="ProductQuantity"
              className="form-label input-group-text mx-3 col-md-3"
            >
              {" "}
              Quantity of the Product
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              value={QuantityofItem}
              className="form-control"
              placeholder="Quantity of the Product"
              id="ProductQuantity"
              aria-label="ProductQuantity"
              aria-describedby="ProductQuantity"
              onChange={initialQuantityofItem}
            />
          </div>
          {validQuantityofItem === 0 && QuantityofItem !== "" && (
            <p style={{ color: "red", textAlign: "center" }}>
              Quantity of the Item should contains only integer value
            </p>
          )}

          <div className="input-group mb-3">
            <label
              htmlFor="ProductCategory"
              className="form-label input-group-text mx-3 col-md-3 "
            >
              Select Categaroy of the Item
              <span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="form-select my-3"
              id="ProductCategory"
              aria-label="Default select example"
              onChange={checkForCategory}
            >
              {console.log("category", checkCategory)}

              <option value="0">Select the Product Catagery </option>
              {categories.map((element) => {
                return (
                  <option value={element.id} key={element.id}>
                    {element.name}
                  </option>
                );
              })}
            </select>
          </div>
          {checkCategory === 0 && (
            <p style={{ color: "red", textAlign: "center" }}>
              Select one of the given Categaroy
            </p>
          )}

          <div className="input-group mb-3 ">
            <label
              htmlFor="ProductDescription"
              className="form-label input-group-text mx-3 "
            >
              Description of the Item<span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              value={DescriptionofItem}
              className="form-control"
              id="ProductDescription"
              rows="3"
              onChange={initialDescriptionofItem}
            ></textarea>
          </div>

          <div className="input-group mb-3">
            <label
              htmlFor="formFileMultiple"
              className="form-label input-group-text mx-3 col-md-3 "
            >
              Select Images <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="form-control "
              type="file"
              name="image_url"
              accept="image/*"
              id="formFileMultiple"
              encType="multipart/form-data"
              onChange={handleFileChange}
            />
          </div>
          {numberOfImage === 0 && (
            <p style={{ color: "red", textAlign: "center" }}>
              Upload atleast one image
            </p>
          )}

          <button
            // type="submit"
            className="btn btn-secondary my-3"
            // disabled={
            //   ProName.length === 0 ||
            //   CostofItem.length === 0 ||
            //   checkCategory === 0 ||
            //   DescriptionofItem.length === 0 ||
            //   LocationAddress === 0 ||
            //   validCostofItem === 0
            // }
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
