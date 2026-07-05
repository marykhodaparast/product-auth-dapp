async function main() {
  const ProductRegistry = await ethers.getContractFactory("ProductRegistry");

  console.log("Deploying contract...");

  const productRegistry = await ProductRegistry.deploy();

  await productRegistry.waitForDeployment();

  console.log("Contract deployed to:", await productRegistry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
