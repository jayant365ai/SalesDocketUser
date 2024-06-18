import { IoMdPerson } from "react-icons/io";

function AdminNavbar({setsideMenu,sideMenu}){




    return(<>
      <div className="flex items-center justify-between w-screen h-20 p-4 bg-white">
          <div
            className={"flex justify-between hamburger flex-col w-[32px] h-[25px] cursor-pointer z-[100] ease-in-out duration-300 " + (sideMenu && "translate-x-[149px]") }
            onClick={() => setsideMenu(!sideMenu)}
          >
            <span
              className={
                "w-full line1 h-[3px] bg-black origin-left transition-all duration-950 ease-in " +
                (sideMenu && " rotate-45")
              }
            ></span>
            <span
              className={
                "line2 w-full  h-[3px] bg-black origin-left transition-all duration-950 ease-in " +
                (sideMenu && " opacity-0")
              }
            ></span>
            <span
              className={
                "line3 w-full  h-[3px] bg-black origin-left transition-all duration-950 ease-in " +
                (sideMenu && "-rotate-45")
              }
            ></span>
          </div>

          {/* <p className="mr-4 text-xl md:text-3xl">{profile?.name}</p> */}
          <div className="flex right">
            <div className="flex items-center admin w-[113px]">
              <IoMdPerson size={30} />
              <span>admin</span>
            </div>

            <div>SalesDocket</div>
          </div>
        </div></>)
}


export default AdminNavbar;