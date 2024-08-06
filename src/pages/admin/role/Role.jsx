import React, { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { getRoles, deleteRole } from "../../../api/role/role";
import { Link } from "react-router-dom";
import DeleteConfirmation from "../../../components/DeleteConfirmation";

function Role() {
  const [roles, setRoles] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles();
        setRoles(rolesData);
      } catch (error) {
        alert(error.toString());
      }
    };

    fetchRoles();
  }, []);

  const handleDeleteClick = (role) => {
    setRoleToDelete(role);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteRole(roleToDelete.id);
      setRoles(roles.filter((role) => role.id !== roleToDelete.id));
      setShowDeleteConfirmation(false);
      setRoleToDelete(null);
    } catch (error) {
      alert(error.toString());
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setRoleToDelete(null);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const slicedRoles = roles.slice(startIndex, endIndex);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <div>
        <div className="font-bold text-3xl mb-8">List Roles</div>
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
              id="table-search-roles"
              className="block p-3 ps-10 text-base text-gray-900 border border-gray-300 rounded-lg w-1/3 focus:ring-blue-500 focus:border-blue-500 outline-bluelight"
              placeholder="Search for roles"
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
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {slicedRoles.map((role) => (
              <tr key={role.id} className="bg-white border-b hover:bg-gray-50">
                <td className="p-4">{role.id}</td>
                <td className="px-6 py-4">{role.name}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/admin/roles/update/${role.id}`}
                    className="font-medium text-blue-600 mr-4 hover:text-blue-700"
                  >
                    <EditOutlinedIcon />
                  </Link>
                  <span
                    className="font-medium text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteClick(role)}
                  >
                    <DeleteOutlinedIcon />
                  </span>
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
          count={Math.ceil(roles.length / rowsPerPage)}
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
      {showDeleteConfirmation && (
        <DeleteConfirmation
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default Role;
