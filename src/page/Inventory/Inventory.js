import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./Inventory.css";

const Inventory = () => {
  const { id } = useParams();
  const [inventory, setInventory] = useState(id);
  const { img, name, price, description, quantity, supplier } = inventory;
  useEffect(() => {
    const url = `https://thawing-falls-00975.herokuapp.com/items/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setInventory(data));
  }, [id]);

  const delivered = () => {
    let remaining = parseInt(+inventory.quantity) - 1;
    console.log(remaining);
    let newInventory = {
      img,
      name,
      price,
      description,
      quantity: remaining,
      supplier,
    };
    setInventory(newInventory);

    fetch(`https://thawing-falls-00975.herokuapp.com/items/${id}`, {
      method: "PUT",
      body: JSON.stringify(newInventory),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const reStock = (event) => {
    event.preventDefault();

    let inputFiled = event.target.number.value;
    let remaining = parseFloat(+inventory.quantity) + parseFloat(inputFiled);
    let newInventory = {
      img,
      name,
      price,
      description,
      quantity: remaining,
      supplier,
    };
    setInventory(newInventory);

    fetch(`https://thawing-falls-00975.herokuapp.com/items/${id}`, {
      method: "PUT",
      body: JSON.stringify(newInventory),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        event.target.reset();
        console.log(data);
      });
  };

  return (
    <Fragment>
      <section className="container-style justify-content-center bg-color  align-items-center d-flex">
        <Card className="pb-5 single-card-style mx-0 bg-color  pt-5 ">
          <div className="row container details-style ">
            <div className="col-md-6">
              <Card.Img variant="top" src={img} />
            </div>
            <div className="col-md-6 ">
              <Card.Body>
                <Card.Title>
                  <h5>{name}</h5>
                </Card.Title>
                <p>{description?.slice(0, 120)}[...]</p>
                <h6>
                  <strong>Price:</strong> ${price}
                </h6>
                <h6 className="mt-2 mb-2">
                  <span className="quantity-style">Quantity: {quantity}</span>
                </h6>
                <h6>
                  <strong>Supplier:</strong> {supplier}
                </h6>
                <button className="btn_style mt-2" onClick={delivered}>
                  Delivered
                </button>{" "}
                <br />
                <form onSubmit={reStock}>
                  <input
                    className="mt-3"
                    type="number"
                    placeholder="Re Stock"
                    name="number"
                    required
                  />{" "}
                  <br />
                  <button type="submit" className="btn_style mt-3">
                    Re Stock
                  </button>
                </form>
              </Card.Body>
            </div>
          </div>
        </Card>
      </section>
    </Fragment>
  );
};

export default Inventory;
