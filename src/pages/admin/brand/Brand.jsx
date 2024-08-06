import React, { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Link } from "react-router-dom";
import DeleteConfirmation from "../../../components/DeleteConfirmation";
import { deleteBrand, getBrands } from "../../../api/brand/brand";


function Brand() {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [brands, setBrands] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const slicedBrands = brands.slice(startIndex, endIndex);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await getBrands();
        setBrands(brandsData);
      } catch (error) {
        alert(error.toString());
      }
    };

    fetchBrands();
  }, []);

  const handleDeleteClick = (brand) => {
    setBrandToDelete(brand);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteBrand(brandToDelete.id);
      setBrands(brands.filter((brand) => brand.id !== brandToDelete.id));
      setShowDeleteConfirmation(false);
      setBrandToDelete(null);
    } catch (error) {
      alert(error.toString());
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setBrandToDelete(null);
  };

  return (
    <div>
      <div>
        <div className="font-bold text-3xl mb-8">List Brand</div>
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
              id="table-search-brands"
              className="block p-3 ps-10 text-base text-gray-900 border border-gray-300 rounded-lg w-1/3 focus:ring-blue-500 focus:border-blue-500 outline-bluelight"
              placeholder="Search for brands"
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
            {slicedBrands.map((brand) => (
              <tr key={brand.id} className="bg-white border-b hover:bg-gray-50">
                <td className="p-4">{brand.id}</td>
                <td className="px-6 py-4">{brand.name}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/admin/brands/update/${brand.id}`}
                    className="font-medium text-blue-600 mr-4 hover:text-blue-700"
                  >
                    <EditOutlinedIcon />
                  </Link>
                  <span  
                    className="font-medium text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteClick(brand)}
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
          count={Math.ceil(brands.length / rowsPerPage)}
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

export default Brand;
