import React, { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { getUsers } from "../../../api/user/user";

function User() {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const slicedUsers = userData.slice(startIndex, endIndex);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUserData(data);
      } catch (error) {
        alert(error.toString());
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <div className="font-bold text-3xl mb-8">List User</div>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 bg-white p-5">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <SearchOutlinedIcon />
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-3 ps-10 text-base text-gray-900 border border-gray-300 rounded-lg w-1/3 focus:ring-blue-500 focus:border-blue-500 outline-bluelight"
              placeholder="Search for users"
            />
          </div>
        </div>
        <table className="w-full text-base text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="p-4">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {slicedUsers.map((user) => (
              <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                <td className="p-4">{user.id}</td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={
                      user.avatar ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt={`Avatar of ${user.fullName}`}
                  />
                  <div className="ps-3">
                    <div className="text-base font-semibold">
                      {user.fullName}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        user.status === "ONLINE" ? "bg-green-500" : "bg-red-500"
                      } me-2`}
                    ></div>{" "}
                    <span className="lowercase">{user.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-greenlight mr-4 hover:text-green"
                  >
                    <VisibilityOutlinedIcon />
                  </a>
                  <a
                    href="#"
                    className="font-medium text-blue-600 mr-4 hover:text-blue-700"
                  >
                    <EditOutlinedIcon />
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 hover:text-red-700"
                  >
                    <DeleteOutlinedIcon />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex items-center justify-center p-5">
        <Pagination
          color="primary"
          variant="outlined"
          count={Math.ceil(userData.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
              sx={{
                fontSize: "1rem",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                margin: "0.5rem",
              }}
            />
          )}
        />
      </div>
    </div>
  );
}

export default User;
