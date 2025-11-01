import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Paper } from "@mui/material";
import Swal from "sweetalert2";
import ModalCom from "../../../../component/modalComp/ModalCom";
import AddBranchsDetail from "../../add-Customer/addBranchsDetail/AddBranchsDetail";
import { FakeBranchData } from "../../../../component/FakeData";
import EditableTable from "../../../../component/tablecomp/EditableTable";
import Pagination from "../../../../component/pagination/Pagination";
import EdiitBranchsDetail from "../../edit-Customer/editBranchsDetail/EdiitBranchsDetail";
import SearchBar from "../../../../component/searchComp/SearchBar"; // ✅ Import search component

const BranchsDetail = () => {
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedData, setSelectedData] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Sorting
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const onSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedData);
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    setDataList(FakeBranchData);
    setFilteredData(FakeBranchData);
  }, []);

  // 🔍 Filter logic
  useEffect(() => {
    const lowerSearch = searchQuery.toLowerCase();
    const filtered = dataList.filter((item) =>
      Object.values(item).some(
        (val) => val && val.toString().toLowerCase().includes(lowerSearch)
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchQuery, dataList]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Modal handlers
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

  // Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedList = dataList.filter((item) => item.id !== id);
        setDataList(updatedList);
        setFilteredData(updatedList);
        Swal.fire("Deleted!", "Branch record deleted successfully.", "success");
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
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#125ea2" },
          }}
          onClick={openAddModal}
        >
          Add Customer
        </Button>
      </Grid>

      {/* 📋 Table */}
      <Grid sx={{ width: "100%", overflowX: "auto" }}>
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
            handleEdit={openEditModal}
            handleDelete={handleDelete}
            sortConfig={sortConfig}
            onSort={onSort}
          />
        </Paper>
      </Grid>

      {/* 📄 Pagination */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {/* ➕ Add Modal */}
      <ModalCom
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add Branch"
        content={<AddBranchsDetail dataList={dataList} setDataList={setDataList} />}
      />

      {/* ✏️ Edit Modal */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Branch"
        content={
          <EdiitBranchsDetail
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

export default BranchsDetail;
