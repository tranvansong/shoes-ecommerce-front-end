import React, { useState, useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { getAdmins } from "../../../api/user/user";

const Admin = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listAdmin = await getAdmins();
        setAdmins(listAdmin);
      } catch (error) {
        alert(error.toString());
      }
    };

    fetchData();
  }, []);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const slicedUsers = admins
    .slice(startIndex, endIndex)
    .filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div>
        <div className="font-bold text-3xl mb-8">List Admin</div>
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
              value={searchTerm}
              onChange={handleSearchChange}
              className="block p-3 ps-10 text-base text-gray-900 border border-gray-300 rounded-lg w-1/3 focus:ring-blue-500 focus:border-blue-500 outline-bluelight"
              placeholder="Search for admin"
            />
          </div>
        </div>
        <table className="w-full text-base text-left">
          <thead className="text-sm uppercase bg-gray-50">
            <tr>
              <th scope="col" className="p-4">
                ID
              </th>
              <th scope="col" className="p-4">
                Avatar
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Roles
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
                  className="flex items-center w-24 h-24 m-2 whitespace-nowrap"
                >
                  <img
                    className="w-full object-cover rounded"
                    src={user.avatar}
                    alt={`avatar`}
                  />
                </th>
                <td className="px-6 py-4">{user.fullName}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">
                  {user.roles.map((role, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 text-xs font-medium bg-gray-200 rounded me-1"
                    >
                      {role}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        user.status === "ONLINE" ? "bg-green" : "bg-red-500"
                      } me-2`}
                    ></div>{" "}
                    {user.status}
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
          count={Math.ceil(admins.length / rowsPerPage)}
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
};

export default Admin;
