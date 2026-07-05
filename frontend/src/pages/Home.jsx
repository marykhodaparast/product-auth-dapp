import "../App.css";
import { useState } from "react";
import useWallet from "../hooks/useWallet";
import { getContract } from "../hooks/useContract";
import QRCode from "react-qr-code";

function App() {
  const { account, connectWallet } = useWallet();

  // Add Product
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Verify Product
  const [searchId, setSearchId] = useState("");
  const [product, setProduct] = useState(null);

  const [fakeId, setFakeId] = useState("");

  const [txHash, setTxHash] = useState("");
  const [blockNumber, setBlockNumber] = useState("");
  const [network, setNetwork] = useState("");

  const shortHash = txHash.slice(0, 10) + "..." + txHash.slice(-8);

  async function addProduct() {
    try {
      const contract = await getContract();

      const tx = await contract.addProduct(productId, name, Number(price));

      const receipt = await tx.wait();

      const provider = contract.runner.provider;
      const net = await provider.getNetwork();

      setTxHash(receipt.hash);
      setBlockNumber(receipt.blockNumber.toString());
      const chainId = net.chainId;

      let networkName = "Unknown";

      if (chainId === 31337n) {
        networkName = "Hardhat Local";
      } else if (chainId === 11155111n) {
        networkName = "Sepolia";
      } else if (chainId === 1n) {
        networkName = "Ethereum Mainnet";
      }

      setNetwork(networkName);

      alert("✅ Product Added Successfully");

      setProductId("");
      setName("");
      setPrice("");
    } catch (err) {
      console.error(err);
      alert(err.shortMessage || err.message);
    }
  }

  async function reportFake() {
    try {
      const contract = await getContract();

      const tx = await contract.reportFake(fakeId);

      await tx.wait();

      alert("🚨 Product marked as Fake");

      setFakeId("");
    } catch (err) {
      console.error(err);
      alert(err.shortMessage || err.message);
    }
  }

  async function verifyProduct() {
    try {
      const contract = await getContract();

      const data = await contract.getProduct(searchId);

      setProduct(data);
    } catch (err) {
      console.error(err);
      alert("❌ Product not found");
      setProduct(null);
    }
  }

  async function copyHash() {
    try {
      await navigator.clipboard.writeText(txHash);
      alert("✅ Transaction Hash Copied");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container">
      <h1 className="title">📦 Product Authentication DApp</h1>

      <button onClick={connectWallet}>Connect Wallet</button>

      {account && (
        <div className="wallet">
          <b>Wallet</b>
          <br />
          {account}
        </div>
      )}

      <div className="card">
        <h2>➕ Register Product</h2>

        <input
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />

        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button onClick={addProduct}>Add Product</button>
      </div>

      <div className="card">
        <h2>🔍 Verify Product</h2>

        <input
          placeholder="Enter Product ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />

        <button onClick={verifyProduct}>Verify Product</button>

        {product && (
          <div className="product">
            <p>
              <b>ID:</b> {product.productId}
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

            <p className="status">
              {product.isFake ? "❌ Fake Product" : "✅ Authentic Product"}
            </p>

            <div className="qr">
              <QRCode
                value={`http://localhost:5173/verify/${product.productId}`}
                size={150}
              />
            </div>
            {txHash && (
              <div
                style={{
                  marginTop: 20,
                  padding: 15,
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  background: "#f8fafc",
                }}
              >
                <h3>✅ Registered on Blockchain</h3>

                <div style={{ marginBottom: 15 }}>
                  <b>Transaction Hash</b>

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      marginTop: 8,
                    }}
                  >
                    <small
                      style={{
                        wordBreak: "break-all",
                        flex: 1,
                        background: "#eef2ff",
                        padding: 10,
                        borderRadius: 6,
                      }}
                    >
                      {shortHash}
                    </small>

                    <button
                      onClick={copyHash}
                      style={{
                        width: 45,
                        height: 45,
                        fontSize: 20,
                        cursor: "pointer",
                      }}
                    >
                      📋
                    </button>
                  </div>
                </div>

                <p>
                  <b>Block Number</b>
                  <br />
                  {blockNumber}
                </p>

                <p>
                  <b>Network</b>
                  <br />
                  {network}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="card">
        <h2>🚨 Report Fake Product</h2>

        <input
          placeholder="Product ID"
          value={fakeId}
          onChange={(e) => setFakeId(e.target.value)}
        />

        <button onClick={reportFake}>Report Fake</button>
      </div>
    </div>
  );
}

export default App;
