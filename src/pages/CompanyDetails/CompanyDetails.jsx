import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/Admin_Navbar";
import SideMenu from "../../components/SideMenu";
import { BeatLoader } from "react-spinners";
import { FaDownload } from "react-icons/fa6";
import { IoRefresh } from "react-icons/io5";
import {
  IoIosCheckmarkCircle,
  IoIosCloseCircle,
  IoMdAdd,
  IoMdSearch,
} from "react-icons/io";
import styles from "./CompanyListingDetails.module.css";
import { useNavigate } from "react-router-dom";
import EditCompany from "../../components/EditCompany/EditCompany";
import { AiOutlineFile } from "react-icons/ai";

const CompanyDetails = () => {
  const [sideMenu, setsideMenu] = useState(false);
  const [maxPages, setMaxPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(10);
  const [tableData, setTableData] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [downloadData, setDownloadData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState();
  const [confBox, setConfBox] = useState(false);
  const [sucBox, setSucBox] = useState(false);
  const [failBox, setFailBox] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [companyEditData, setCompanyEditData] = useState();
  const [companyDocsData, setCompanyDocsData] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [editBoxOpen, setEditBoxOpen] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [viewDocsModalOpen, setViewDocsModalOpen] = useState(false);

  const navigate = useNavigate();

  const fetchTableData = () => {
    setIsTableLoading(true);
    const userToken = sessionStorage.getItem("authToken");
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_ENDPOINT
        }/api/company/findAll?page=${currentPage}&limit=${pageLimit}`,
        {
          headers: {
            authorization: `${userToken}`,
          },
        }
      )
      .then((res) => {
        setMaxPages(Math.ceil(res.data.totalCounts / 10));
        setTableData(res.data.result);
        setTotalCount(res.data.totalRecords);
        console.log("res is", res.data);
        setIsTableLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsTableLoading(false);
      });
  };

  useEffect(() => {
    fetchTableData();
  }, [currentPage, pageLimit]);

  const downloadExcel = (apiData) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const formattedData = apiData.map((item) => {
      return {
        "Company Name": item.companyName,
        "Unique Id": item.uniqueId,
        "Company Code": item.companyCode,
        Address: item.address,
        "Contact Number": item.contactNumber,
        "GST Number": item.gstNumber,
        "PAN Number": item.panNumber,
        Remarks: item.remarks,
      };
    });

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const dataFile = new Blob([excelBuffer], { type: fileType });
    saveAs(dataFile, "Company_Listing" + fileExtension);
  };

  const handleDownload = () => {
    const userToken = sessionStorage.getItem("authToken");
    axios
      .get(
        `${
          import.meta.env.VITE_REACT_APP_ENDPOINT
        }/api/company/findAll?page=${0}&limit=${totalCount}`,
        {
          headers: {
            authorization: `${userToken}`,
          },
        }
      )
      .then((res) => {
        setDownloadData(res.data.result);
        downloadExcel(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteConfHandler = (conpanyId) => {
    setSelectedCompany(conpanyId);
    setConfBox(true);
  };

  const getDataBySearch = () => {
    setIsTableLoading(true);
    // if (searchValue === "") {
    //   setIsTableLoading(false);
    // setErrMsg("Search Box is empty");
    // setFailBox(true);
    // return;
    // }
    // const LoggedInUser = JSON.parse(sessionStorage.getItem("profile"));
    const token = sessionStorage.getItem("authToken");

    let config = {
      method: "get",
      url: `${
        import.meta.env.VITE_REACT_APP_ENDPOINT
      }/api/company/findAll?page=${0}&limit=${totalCount}&search=${searchValue}`,
      headers: { Authorization: token },
    };

    console.log(config);
    axios
      .request(config)
      .then((response) => {
        console.log(response.data.result);
        setTableData(response.data.result);
        setIsTableLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setErrMsg("Failed to load data");
        setFailBox(true);
        setIsTableLoading(false);
      });
  };

  const deleteHandler = (companyId) => {
    setIsTableLoading(true);
    setConfBox(false);
    const token = sessionStorage.getItem("authToken");

    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${
        import.meta.env.VITE_REACT_APP_ENDPOINT
      }/api/company/deleteById?id=${companyId}`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        if (searchValue === "") {
          fetchTableData();
        } else {
          getDataBySearch();
        }
        setErrMsg(
          "Succesfully deleted company - " + response.data.result.companyName
        );
        setSucBox(true);
        setIsTableLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setErrMsg("Failed to deleted company");
        setFailBox(true);
        setIsTableLoading(false);
      });
  };

  const handleSearchClear = () => {
    setSearchValue("");
    fetchTableData();
  };

  const handleSearchClick = () => {
    getDataBySearch();
  };

  useEffect(() => {
    if (editSuccess) {
      if (searchValue === "") {
        fetchTableData();
      } else {
        getDataBySearch();
      }
      setErrMsg("Succesfully updated store details");
      setSucBox(true);
      setEditSuccess(false);
      setEditBoxOpen(false);
    }
  }, [editSuccess]);

  const editHandler = (companyData) => {
    console.log(companyData);
    setCompanyEditData(companyData);
    setEditBoxOpen(true);
  };

  const openViewDocsModal = (data) => {
    setCompanyDocsData(data);
    setViewDocsModalOpen(true);
  };
  return (
    <div>
      {editBoxOpen && (
        <div className={`${styles.edit_page}`}>
          <EditCompany
            companyData={companyEditData}
            setEditBoxOpen={setEditBoxOpen}
            setEditSuccess={setEditSuccess}
          />
        </div>
      )}
      {isTableLoading && (
        <div className="fixed top-0 left-0 z-49 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <BeatLoader color={"#EC2752"} loading={isTableLoading} size={15} />
        </div>
      )}
      <div className="navbar">
        <AdminNavbar setsideMenu={setsideMenu} sideMenu={sideMenu} />
        <SideMenu setsideMenu={setsideMenu} sideMenu={sideMenu} />
      </div>
      {(sucBox || failBox) && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div
            className={`${styles.err_mod_box} ${
              sucBox ? "text-green-500" : "text-[#EC2752]"
            }`}
          >
            {sucBox ? (
              <IoIosCheckmarkCircle
                className={sucBox ? "text-green-500" : "text-[#EC2752]"}
                size={90}
              />
            ) : (
              <IoIosCloseCircle
                className={sucBox ? "text-green-500" : "text-[#EC2752]"}
                size={90}
              />
            )}
            <h6 className={sucBox ? "text-green-500" : "text-[#EC2752]"}>
              {sucBox ? "Success!" : "Error!"}
            </h6>
            <p className="text-slate-500">{errMsg}</p>
            <button
              onClick={() => {
                setSucBox(false);
                setFailBox(false);
              }}
              className={
                sucBox ? "bg-green-500 text-white" : "bg-[#EC2752] text-white"
              }
            >
              Okay
            </button>
          </div>
        </div>
      )}
      {confBox && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div
            className={`${styles.err_mod_box} ${
              sucBox ? "text-green-500" : "text-[#EC2752]"
            }`}
          >
            {/* <IoIosCheckmarkCircle
              className={successMod ? "text-green-500" : "text-[#EC2752]"}
              size={90}
            /> */}
            <h6 className={sucBox ? "text-green-500" : "text-[#EC2752]"}>
              Confirmation!
            </h6>
            <p className="text-slate-500">
              Do you want to delete store {" " + selectedCompany + " "} ?
            </p>
            <div className="flex flex-row gap-2">
              <button
                onClick={() => deleteHandler(selectedCompany)}
                className={"bg-[#EC2752] text-white"}
              >
                Okay
              </button>
              <button
                onClick={() => {
                  setConfBox(false), setIsTableLoading(false);
                }}
                className="bg-white text-[#EC2752]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="m-2 flex flex-col gap-2 items-center w-[100%]">
        <div className="flex gap-2 items-center justify-center outline-none mt-5 w-[100%]">
          <button
            className={`${styles.bulkdown_button}`}
            onClick={() => {
              navigate("/companylisting");
            }}
          >
            <IoMdAdd size={24} /> Add Company
          </button>

          <div className={`${styles.search_bar_wrap}`}>
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              className="text-sm"
              type="text"
              placeholder="Search..."
              value={searchValue}
            />
            <IoMdSearch onClick={handleSearchClick} size={25} />
          </div>
          <div className={styles.icons_box}>
            <IoRefresh onClick={handleSearchClear} className="" size={25} />
          </div>
          <button
            className={`${styles.bulkdown_button}`}
            onClick={handleDownload}
          >
            <FaDownload /> Bulk Download
          </button>
        </div>
      </div>
      <div className="m-2 overflow-x-auto md:m-5">
        <table className="w-full border border-[#EC2752]">
          <thead className="bg-[#EC2752] text-white">
            <tr>
              <th className="p-2 text-sm md:p-3 md:text-base">Action</th>
              <th className="p-2 text-sm md:p-3 md:text-base">Company Name</th>
              <th className="p-2 text-sm md:p-3 md:text-base">Unique Id</th>
              <th className="p-2 text-sm md:p-3 md:text-base">Company Code</th>
              <th className="p-2 text-sm md:p-3 md:text-base">Address</th>
              <th className="p-2 text-sm md:p-3 md:text-base">
                Contact Number
              </th>
              <th className="p-2 text-sm md:p-3 md:text-base">GST Number</th>
              <th className="p-2 text-sm md:p-3 md:text-base">PAN Number</th>
              <th className="p-2 text-sm md:p-3 md:text-base">Remarks</th>
              <th className="p-2 text-sm md:p-3 md:text-base">Documents</th>
            </tr>
          </thead>
          <tbody>
            {tableData !== undefined &&
              tableData.map((data, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-200" : ""}
                >
                  <td className="p-2 text-sm text-center md:p-3 md:text-base">
                    <div className="flex flex-col gap-1">
                      <button
                        className={`${styles.view_btn}`}
                        onClick={() => {
                          editHandler(data);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className={`${styles.acpt_btn}`}
                        onClick={() => {
                          deleteConfHandler(data?._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                  <td className="p-2 text-sm text-center md:p-3 md:text-base">
                    {data.companyName}
                  </td>
                  <td className="p-2 text-sm text-center md:p-3 md:text-base">
                    {data.uniqueId}
                  </td>
                  <td className="p-2 text-sm text-center md:p-3 md:text-base">
                    {data.companyCode}
                  </td>
                  <td className="p-2 text-sm text-center md:p-3 md:text-base">
                    {data.address}
                  </td>
                  <td className="p-2 text-sm text-center md:p-3 md:text-base">
                    {data.contactNumber}
                  </td>
                  <td className="p-2 text-sm text-center md:p-3 md:text-base">
                    {data.gstNumber}
                  </td>
                  <td className="p-2 text-sm text-center md:p-3 md:text-base">
                    {data.panNumber}
                  </td>
                  <td className="p-2 text-sm text-center md:p-3 md:text-base">
                    {data.remarks}
                  </td>
                  <td
                    className="p-2 text-sm text-center md:p-3 md:text-base"
                    onClick={() => openViewDocsModal(data)}
                    style={{ cursor: "pointer" }}
                  >
                    View Docs
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {viewDocsModalOpen && (
        <div className="fixed mx-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center z-50">
          <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-50"></div>
          <div className="bg-white border border-gray-300 p-6 w-96 max-w-[90%] mx-auto rounded-md z-10">
            <p className="mb-4 text-lg font-semibold">Documents</p>
            <div className=" flex gap-4 m-2">
              {companyDocsData.documents.map((document, index) => (
                <div key={index} className="">
                  {/* <img
                    className="max-w-[100px] max-h-[100px]"
                    src={document}
                    alt=""
                  /> */}
                  <a href={document} target="_blank" rel="noopener noreferrer">
                    <p className="text-xs font-medium"> Document {index + 1}</p>
                    <div className="flex flex-col items-center">
                      <AiOutlineFile size={60} />
                      {/* <p key={index}>{file.name}</p> */}
                    </div>
                  </a>
                </div>
              ))}
            </div>
            <button
              onClick={() => setViewDocsModalOpen(false)}
              className="border border-[#EC2752] text-[#EC2752] px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-0 mb-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
          className={`mx-2 px-4 py-2 rounded-lg ${
            currentPage === 0
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-[#EC2752] text-white cursor-pointer"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === maxPages - 1}
          className={`mx-2 px-4 py-2 rounded-lg ${
            currentPage === maxPages - 1
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-[#EC2752] text-white cursor-pointer"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CompanyDetails;
