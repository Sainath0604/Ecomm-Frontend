import { useState } from "react";
import AdminNav from "./AdminNav";
import { getServerUrl } from "../utility/getServerUrl";
import { UploadCloudIcon } from "../components/Icons";

function UploadProduct() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const serverUrl = getServerUrl();
  const uploadProductUrl = new URL("/uploadProduct", serverUrl);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleName = (event) => {
    setProductName(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handlePrice = (event) => {
    setProductPrice(event.target.value);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("product", selectedFile);
      formData.append("pName", productName);
      formData.append("pDescription", description);
      formData.append("Price", productPrice);

      const response = await fetch(uploadProductUrl, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Product uploaded successfully.");
        setSelectedFile(null);
        setDescription("");
        setProductName("");
        setProductPrice("");
      } else {
        alert("Failed to upload product.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to upload product.");
    }
  };

  return (
    <div className="md:flex bg-[#dcc9ff]">
      <AdminNav />
      <div className="flex sm:w-full md:w-4/5 justify-center">
        <div className="flex flex-col items-center m-5 lg:m-10 w-4/5">
          <h1 className="flex items-center justify-center bg-[#241B35] rounded-xl font-bold text-gray-100 text-base lg:text-xl lg:w-96 h-10 lg:h-12 p-2 lg:p-5 my-10 shadow-lg hover:shadow-2xl">
            <span>Upload Product Information</span>
            <span className="text-2xl font-bold ml-2 lg:ml-5">
              <UploadCloudIcon />
            </span>
          </h1>
          <div className="m-2 lg:m-5 w-11/12 p-2 lg:p-5 flex flex-col lg:flex-row justify-center lg:gap-x-20">
            <div className=" lg:p-5">
              <div className="mb-2">
                <label className="font-bold text-[#241B35]">
                  Product Name:
                </label>
              </div>
              <div className="mb-5">
                <input
                  className="border border-[#241B35] rounded-lg p-2 w-80 "
                  type="text"
                  placeholder="Product Name"
                  value={productName}
                  onChange={handleName}
                />
              </div>
              <div className="mb-2">
                <label className="font-bold text-[#241B35]">
                  Product description:
                </label>
              </div>
              <div className="mb-2 lg:mb-5">
                <textarea
                  rows={4}
                  cols={40}
                  name="postContent"
                  className="  border border-[#241B35] rounded-lg p-2 "
                  type="text"
                  placeholder="Product Description"
                  value={description}
                  onChange={handleDescription}
                />
              </div>
            </div>
            <div className=" lg:p-5">
              <div className="mb-2">
                <label className="font-bold text-[#241B35]">
                  Upload product image:
                </label>
              </div>
              <div className="mb-5">
                <input
                  className="border border-[#241B35] bg-[#fff] rounded-lg p-2 w-80 "
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              <div className="mb-2">
                <label className="font-bold text-[#241B35]">
                  Product Price <span className="text-sm">(in rupees)</span>:
                </label>
              </div>
              <div className="mb-5">
                <input
                  className="border border-[#241B35] rounded-lg p-2 w-80 "
                  type="text"
                  placeholder="Price"
                  value={productPrice}
                  onChange={handlePrice}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button
              className="border bg-[#241B35] rounded-xl font-bold text-gray-100 p-2  text-md lg:text-md  "
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadProduct;
