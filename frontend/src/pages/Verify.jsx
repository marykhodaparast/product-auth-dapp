import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContract } from "../hooks/useContract";

export default function Verify() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadProduct();
  }, []);

  async function loadProduct() {
    try {
      const contract = await getContract();

      const data = await contract.getProduct(id);

      setProduct(data);
    } catch (err) {
      console.log(err);
      setNotFound(true);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 80 }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (notFound) {
    return (
      <div style={{ textAlign: "center", marginTop: 80 }}>
        <h1>❌ Product Not Found</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "50px auto",
        padding: 30,
        borderRadius: 12,
        boxShadow: "0 0 20px rgba(0,0,0,.1)",
      }}
    >
      <h1>Blockchain Product Verification</h1>

      <hr />

      <p>
        <b>Product ID:</b> {product.productId}
      </p>

      <p>
        <b>Name:</b> {product.name}
      </p>

      <p>
        <b>Price:</b> ${product.price.toString()}
      </p>

      <p>
        <b>Manufacturer:</b>
        <br />
        {product.manufacturer}
      </p>

      <p>
        <b>Status:</b>{" "}
        {product.isFake ? (
          <span style={{ color: "red", fontWeight: "bold" }}>
            ❌ Fake Product
          </span>
        ) : (
          <span style={{ color: "green", fontWeight: "bold" }}>
            ✅ Authentic Product
          </span>
        )}
      </p>
    </div>
  );
}
