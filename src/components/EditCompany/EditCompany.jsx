import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { IoClose } from "react-icons/io5";

const EditCompany = ({ companyData, setEditBoxOpen, setEditSuccess }) => {
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [formValues, setFormValues] = useState(companyData);
  const [response, setResponse] = useState("");

  const closeHandler = () => {
    setEditBoxOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    console.log("name", e.target.name);
    if (type === "file") {
      setFormValues({
        ...formValues,
        [name]: files,
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: newValue,
      });
    }
    console.log("new", formValues);
  };
  console.log("data is", companyData);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsTableLoading(true);
    const token = sessionStorage.getItem("authToken");

    const formData = new FormData();

    formData.append("companyName", formValues.companyName);
    formData.append("uniqueId", formValues.uniqueId);
    formData.append("companyCode", formValues.companyCode);
    formData.append("contactNumber", formValues.contactNumber);
    formData.append("address", formValues.address);
    formData.append("gstNumber", formValues.gstNumber);
    formData.append("panNumber", formValues.panNumber);
    formData.append("remarks", formValues.remarks);
    formData.append("id", formValues._id);

    if (formValues.documents && formValues.documents.length > 0) {
      for (let i = 0; i < formValues.documents.length; i++) {
        formData.append("documents", formValues.documents[i]);
      }
    }

    axios
      .put(
        `${import.meta.env.VITE_REACT_APP_ENDPOINT}/api/company/edit`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        console.log("res is ", res);

        setIsTableLoading(false);
        setResponse(res.data.msg);
        setEditSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setIsTableLoading(false);
        setResponse("Failed to update data");
      });
  };

  const handleRemoveDocument = (index) => {
    const updatedDocuments = [...formValues.documents];
    updatedDocuments.splice(index, 1);
    setFormValues({
      ...formValues,
      documents: updatedDocuments,
    });
  };
  return (
    <div>
      {isTableLoading && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <BeatLoader color={"#EC2752"} loading={isTableLoading} size={15} />
        </div>
      )}
      <div
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.3) 0px 0px 10px, rgba(0, 0, 0, 0.1) 0px 5px 12px",
        }}
        className="items-center bg-white max-w-[900px] flex py-8 mx-auto mt-4 justify-center flex-col"
      >
        <div className="flex flex-col  w-[900px]">
          <div className="relative mb-6 flex flex-col gap-2 border-b-2 mr-10 pb-2 ml-10">
            <IoClose
              size={35}
              className="absolute right-0 text-[#EC2752] transition ease hover:rotate-[360deg] duration-500"
              onClick={closeHandler}
            />
            <p className="text-4xl font-bold">Update Company Listing</p>
            <p className="text-lg">All fields marked with * are required</p>
          </div>

          <form onSubmit={handleSubmit} className="ml-10 flex flex-col gap-4">
            <div className="flex flex-col w-[70%] gap-2">
              <span className="font-medium text-xl">Name*</span>
              <input
                className="border-2 px-2 py-2 rounded-lg outline-none"
                type="text"
                name="companyName"
                value={formValues.companyName}
                required={true}
                onChange={handleChange}
                // onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-[70%] gap-2">
              <span className="font-medium text-xl">Unique Id*</span>
              <input
                className="border-2 px-2 py-2 rounded-lg  outline-none "
                type="text"
                name="uniqueId"
                value={formValues.uniqueId}
                required={true}
                onChange={handleChange}
                // onChange={(e) => setUniqueId(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-[70%] gap-2">
              <span className="font-medium text-xl">Company Code*</span>
              <input
                className="border-2 px-2 py-2 rounded-lg  outline-none "
                type="text"
                name="companyCode"
                value={formValues.companyCode}
                required={true}
                onChange={handleChange}
                // onChange={(e) => setCompnayCode(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-[70%] gap-2">
              <span className="font-medium text-xl">Adddress</span>
              <input
                className="border-2 px-2 py-2 rounded-lg  outline-none"
                type="text"
                name="address"
                value={formValues.address}
                onChange={handleChange}
                // onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-[70%] gap-2">
              <span className="font-medium text-xl">Contact Number</span>
              <input
                className="border-2 px-2 py-2 rounded-lg  outline-none"
                type="text"
                name="contactNumber"
                value={formValues.contactNumber}
                onChange={handleChange}
                // onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-[70%] gap-2">
              <span className="font-medium text-xl">GST Number</span>
              <input
                className="border-2 px-2 py-2 rounded-lg  outline-none"
                type="text"
                name="gstNumber"
                value={formValues.gstNumber}
                onChange={handleChange}
                // onChange={(e) => setGstNumber(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-[70%] gap-2">
              <span className="font-medium text-xl">PAN Number</span>
              <input
                className="border-2 px-2 py-2 rounded-lg  outline-none"
                type="text"
                name="panNumber"
                value={formValues.panNumber}
                onChange={handleChange}
                // onChange={(e) => setPanNumber(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-[70%] gap-2">
              <span className="font-medium text-xl">Remarks</span>
              <input
                className="border-2 px-2 py-2 rounded-lg  outline-none"
                type="text"
                name="remarks"
                value={formValues.remarks}
                onChange={handleChange}
                // onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-[70%] gap-2">
              <span className="font-medium text-xl">Attach New Documents</span>
              <input
                className=" py-2 rounded-lg w-[250px] outline-none"
                // onChange={handleFileUpload}
                type="file"
                multiple
              />
            </div>
            {/* <div className="">
              <span className="font-medium text-xl">Attached Documents</span>
              <div className="grid grid-cols-2 gap-4 documentList">
                {formValues.documents.map((document, index) => (
                  <div key={index}>
                    <a
                      href={document}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mb-2 text-blue-500 underline hover:underline"
                    >
                      Document {index + 1}
                    </a>
                  </div>
                ))}
              </div>
            </div> */}

            {/* <div className="flex flex-wrap w-[90%] gap-2">
            {attachedFiles.length > 0 &&
              attachedFiles.map((file, index) => (
                <div className="flex flex-col items-center">
                  <AiOutlineFile size={80} />
                  <p key={index}>{file.name}</p>
                </div>
              ))}
          </div> */}

            <div className="mt-8">
              <button
                type="submit"
                className="font-medium text-sm text-white p-3 rounded bg-[#EC2752]"
              >
                Update Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCompany;
