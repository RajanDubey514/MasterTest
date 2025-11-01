import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Paper } from "@mui/material";
import Swal from "sweetalert2";
import ModalCom from "../../../../component/modalComp/ModalCom";
import AddBranchsDetail from "../../add-Customer/addBranchsDetail/AddBranchsDetail";
import { FakeCustomerData } from "../../../../component/FakeData";
import EditableTable from "../../../../component/tablecomp/EditableTable";
import Pagination from "../../../../component/pagination/Pagination";
import EditCustomerBasic from "../../edit-Customer/editCustomerBasic/EditCustomerBasic";
import SearchBar from "../../../../component/searchComp/SearchBar"; // ✅ new import

const CustomerBasic = () => {
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // ✅ for search
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedData, setSelectedData] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const editableFields = [];

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    setDataList(FakeCustomerData);
    setFilteredData(FakeCustomerData);
  }, []);

  // ✅ Filter logic (search)
  useEffect(() => {
    if (!searchQuery) {
      setFilteredData(dataList);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = dataList.filter((item) =>
        Object.values(item).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(lowerQuery)
        )
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, dataList]);

  const onSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedData);
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const openEditModal = (id) => {
    const row = dataList.find((item) => item.id === id);
    setSelectedData(row);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedData(null);
    setIsEditModalOpen(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDataList((prev) => prev.filter((item) => item.id !== id));
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    });
  };

  const headers = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  return (
    <Box p={2}>
      {/* ✅ SearchBar Centered */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search customer by name, city, or email..."
      />

      {/* Header */}
      <Grid container justifyContent="end" alignItems="center" mb={2}>
        <Button
          variant="contained"
          size="small"
          sx={{
    textTransform: "capitalize",
    fontWeight: 600,
    fontSize: {
      xs: "0.6rem",  // Mobile
      sm: "0.7rem",  // Tablet
      md: "0.85rem", // Desktop
    },
    borderRadius: "8px",
    backgroundColor: "#1976d2",
    "&:hover": {
      backgroundColor: "#125ea2",
    },
    transition: "all 0.2s ease-in-out",
  }}
          onClick={openAddModal}
        >
          Add Customer
        </Button>
      </Grid>

      {/* Table */}
      <Grid style={{ width: "100%", overflowX: "auto" }}>
        <Paper
          sx={{
            mb: 2,
            borderRadius: 2,
            boxShadow: 2,
            width: "100%",
            overflow: "hidden",
          }}
        >
          <EditableTable
            headers={headers}
            rows={paginatedData}
            editRowId={editRowId}
            editedData={editedData}
            handleEdit={openEditModal}
            handleDelete={handleDelete}
            editableFields={editableFields}
            sortConfig={sortConfig}
            onSort={onSort}
          />
        </Paper>
      </Grid>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {/* Add Modal */}
      <ModalCom
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add Customer"
        content={<AddBranchsDetail dataList={dataList} setDataList={setDataList} />}
      />

      {/* Edit Modal */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Update Customer"
        content={
          <EditCustomerBasic
            selectedData={selectedData}
            dataList={dataList}
            setDataList={setDataList}
            closeEditModal={closeEditModal}
          />
        }
      />
    </Box>
  );
};

export default CustomerBasic;
