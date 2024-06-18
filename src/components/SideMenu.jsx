import { useNavigate } from "react-router-dom";

function SideMenu({ setsideMenu, sideMenu }) {
  const navigate = useNavigate();

  const handleHome = () => {
    setsideMenu(!sideMenu);
    navigate("/adminmodels");
  };

  const handleTable = () => {
    setsideMenu(!sideMenu);
    navigate("/customertable");
  };

  const handleGrade = () => {
    setsideMenu(!sideMenu);
    navigate("/gradepricingsheet");
  };
  const handleProfile = () => {
    setsideMenu(!sideMenu);
    navigate("/profile");
  };

  const handleRegister = () => {
    setsideMenu(!sideMenu);
    navigate("/registeruser");
  };
  const handleStoreListing = () => {
    setsideMenu(!sideMenu);
    navigate("/storelisting");
  };
  const handleCompanyListing = () => {
    setsideMenu(!sideMenu);
    navigate("/companylisting");
  };
  const handleOffer = () => {
    setsideMenu(!sideMenu);
    navigate("/viewofferdetail");
  };
  const handleTechnician = () => {
    setsideMenu(!sideMenu);
    navigate("/technicianwisereport");
  };
  const handleStoreReport = () => {
    setsideMenu(!sideMenu);
    navigate("/storewisereport");
  };
  const adminDashboard = () => {
    setsideMenu(!sideMenu);
    navigate("/admindashboard");
  };

  const handlpickup = () => {
    setsideMenu(!sideMenu);
    navigate("/devicepickupdashboard");
  };

  const handleLogout=()=>{
   
    localStorage.clear();
    sessionStorage.clear();
   
    navigate("/");
  }
  return (
    <>
     
{/* //new for change  */}
      {(true)?   <div
        className={
          "menu fixed left-[-200px] top-0 w-[200px] h-full bg-slate-300 z-50 flex items-center justify-center transition-all duration-950 ease-in " +
          (sideMenu && "left-[0]")
        }
      >
        <ul className="list-none pl-[6%] pt-[6%]">
          <li
            className="text-[22px] font-[300] cursor-pointer mb-[2vh] "
            onClick={handleHome}
          >
            Home
          </li>
          <li
            className="text-[22px] font-[300] cursor-pointer mb-[2vh] "
            onClick={handleProfile}
          >
            Profile
          </li>
          <li
            className="text-[22px] font-[300] cursor-pointer mb-[2vh] "
            onClick={handleOffer}
          >
            Offers
          </li>

          <li
            className="text-[22px] font-[300] cursor-pointer mb-[2vh]"
            onClick={handleGrade}
          >
            Grade Pricing
          </li>
          <li
            className="text-[22px] font-[300] cursor-pointer mb-[2vh]"
            onClick={handleRegister}
          >
            Register User
          </li>

          <li
            className="text-[22px] font-[300] cursor-pointer mb-[2vh]"
            onClick={handleStoreListing}
          >
            Store Listing
          </li>
          <li
            className="text-[22px] font-[300] cursor-pointer mb-[2vh]"
            onClick={handleStoreReport}
          >
            Store Report
          </li>
          <li
            className="text-[22px] font-[300] cursor-pointer mb-[2vh]"
            onClick={handleTable}
          >
            Customer Table
          </li>
          <li
            className="text-[22px] font-[300] cursor-pointer mb-[2vh]"
            onClick={handleCompanyListing}
          >
            Company Listing
          </li>
          <li
            className="text-[22px] font-[300] cursor-pointer mb-[2vh]"
            onClick={handlpickup}
          >
           Pickup & Cancel Device
          </li>
          <li
            className="text-[22px] font-[300] cursor-pointer mb-[2vh]"
            onClick={handleTechnician}
          >
            Technician Report
          </li>
          <li
            className="text-[22px] font-[300] cursor-pointer mb-[2vh]"
            onClick={adminDashboard}
          >
            Admin Dashboard
          </li>
          <li
            className="text-[22px] font-[300] cursor-pointer mb-[2vh]"
            onClick={handleLogout}
          >
           Logout
          </li>
        </ul>
      </div>: <div
        className={
          "menu fixed left-[-200px] top-0 w-[200px] h-full bg-slate-300 z-50 flex items-center justify-center transition-all duration-950 ease-in " +
          (sideMenu && "left-[0]")
        }
      >
        <ul className="list-none">
          <li
            className="text-[22px] font-[300] cursor-pointer mb-[2vh]"
            onClick={handleHome}
          >
            Home
          </li>
          <li
            className="text-[22px] font-[300] cursor-pointer mb-[2vh]"
            onClick={handleProfile}
          >
            Profile
          </li>
          <li
            className="text-[22px] font-[300] cursor-pointer mb-[2vh]"
            onClick={handleTable}
          >
            Customer Table
          </li>
          <li
            className="text-[22px] font-[300] cursor-pointer mb-[2vh]"
            onClick={handlpickup}
          >
           Pickup & Cancel Device
          </li>
          <li
            className="text-[22px] font-[300] cursor-pointer mb-[2vh]"
            onClick={handleLogout}
          >
           Logout
          </li>
         
         
         
         
          
          
        </ul>
      </div>}
      
    </>
  );
}

export default SideMenu;
