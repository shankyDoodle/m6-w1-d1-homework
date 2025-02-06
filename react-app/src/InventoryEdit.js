import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "./Navbar";

const emptyInventory = {
  prodname: "",
  qty: "",
  price: "",
  status: "",
};

const InventoryEdit = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(emptyInventory);

  useEffect(() => {
    const fetchData = async () => {
      if (params.id !== "new") {
        const inventory = await (
          await fetch(`/api/inventory/${params.id}`)
        ).json();
        setItem(inventory);
      }
    };
    if (!item.prodname) {
      fetchData();
    }
  });

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let itemCloned = { ...item };
    itemCloned[name] = value;
    setItem(itemCloned);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch("/api/inventory", {
      method: item._id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    navigate("/inventories");
  };

  const title = (
    <h2 className="mt-3">{item._id ? "Edit Inventory" : "Add Inventory"}</h2>
  );

  return (
    <div>
      <AppNavbar />
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="prodname">Product Name</Label>
            <Input
              type="text"
              name="prodname"
              id="prodname"
              value={item.prodname || ""}
              onChange={handleChange}
              autoComplete="prodname"
            />
          </FormGroup>
          <FormGroup>
            <Label for="qty">Quantity</Label>
            <Input
              type="text"
              name="qty"
              id="qty"
              value={item.qty || ""}
              onChange={handleChange}
              autoComplete="qty"
            />
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type="text"
              name="price"
              id="price"
              value={item.price || ""}
              onChange={handleChange}
              autoComplete="price"
            />
          </FormGroup>
          <FormGroup>
            <Label for="status">Status</Label>
            <Input
              type="text"
              name="status"
              id="status"
              value={item.status || ""}
              onChange={handleChange}
              autoComplete="status"
            />
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">
              Save
            </Button>{" "}
            <Button color="secondary" tag={Link} to="/inventories">
              Cancel
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
};

export default InventoryEdit;
