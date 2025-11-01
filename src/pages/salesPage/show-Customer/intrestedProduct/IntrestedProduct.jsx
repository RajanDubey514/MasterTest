import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Paper } from "@mui/material";
import Swal from "sweetalert2";

// ✅ Custom Components
import ModalCom from "../../../../component/modalComp/ModalCom";
import AddIntrestedProduct from "../../add-Customer/AddIntrestedProduct/AddIntrestedProduct";
import EditIntrestedProduct from "../../edit-Customer/editIntrestedProduct/EditIntrestedProduct";
import EditableTable from "../../../../component/tablecomp/EditableTable";
import Pagination from "../../../../component/pagination/Pagination";
import SearchBar from "../../../../component/searchComp/SearchBar";
import { FakeInterestedProductData } from "../../../../component/FakeData";


// ============================================================================
// 🧾 IntrestedProduct Component — Manages CRUD, Search, Sort, Pagination
// ============================================================================
const IntrestedProduct = () => {

  // --------------------------------------------------------------------------
  // 🔹 State Management
  // --------------------------------------------------------------------------
  const [dataList, setDataList] = useState([]);             // Full product data
  const [filteredData, setFilteredData] = useState([]);     // Filtered data after search
  const [searchQuery, setSearchQuery] = useState("");       // Search input state
  const [selectedData, setSelectedData] = useState(null);   // Data selected for editing

  // 🔸 Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 🔸 Inline Edit (not used here, handled via modal)
  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const editableFields = [];

  // 🔸 Sorting Config
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // 🔸 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;


  // --------------------------------------------------------------------------
  // 📦 Load Initial Fake Data (simulate API)
  // --------------------------------------------------------------------------
  useEffect(() => {
    setDataList(FakeInterestedProductData);
    setFilteredData(FakeInterestedProductData);
  }, []);


  // --------------------------------------------------------------------------
  // 🔍 Search Filter Logic
  // --------------------------------------------------------------------------
  useEffect(() => {
    const lowerSearch = searchQuery.toLowerCase();
    const filtered = dataList.filter((item) =>
      Object.values(item).some(
        (val) => val && val.toString().toLowerCase().includes(lowerSearch)
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1); // reset to first page on search
  }, [searchQuery, dataList]);


  // --------------------------------------------------------------------------
  // ↕️ Sorting Logic (ascending / descending)
  // --------------------------------------------------------------------------
  const onSort = (key) => {
    let direction = "asc";

    // Toggle direction if same key is sorted again
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    // Sort the filtered data
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredData(sortedData);
  };


  // --------------------------------------------------------------------------
  // 📄 Pagination Logic
  // --------------------------------------------------------------------------
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );


  // --------------------------------------------------------------------------
  // 🧩 Modal Handlers
  // --------------------------------------------------------------------------
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


  // --------------------------------------------------------------------------
  // 🗑️ Delete Record Handler
  // --------------------------------------------------------------------------
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
        const updatedList = dataList.filter((item) => item.id !== id);
        setDataList(updatedList);
        setFilteredData(updatedList);
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      }
    });
  };


  // --------------------------------------------------------------------------
  // 🧾 Table Headers
  // --------------------------------------------------------------------------
  const headers = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];


  // ==========================================================================
  // 🖼️ JSX Rendering
  // ==========================================================================
  return (
    <Box p={2}>

      {/* ==============================================================
          🔍 Search Bar Section
      ============================================================== */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search product by name, type, or category..."
      />


      {/* ==============================================================
          🧭 Header Section (Add Button)
      ============================================================== */}
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
          Add Interested Product
        </Button>
      </Grid>


      {/* ==============================================================
          📋 Table Section
      ============================================================== */}
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
            editRowId={editRowId}
            editedData={editedData}
            editableFields={editableFields}
          />
        </Paper>
      </Grid>


      {/* ==============================================================
          📄 Pagination Section
      ============================================================== */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />


      {/* ==============================================================
          ➕ Add Modal Section
      ============================================================== */}
      <ModalCom
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add Interested Product"
        content={
          <AddIntrestedProduct
            dataList={dataList}
            setDataList={setDataList}
          />
        }
      />


      {/* ==============================================================
          ✏️ Edit Modal Section
      ============================================================== */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Interested Product"
        content={
          <EditIntrestedProduct
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

export default IntrestedProduct;
