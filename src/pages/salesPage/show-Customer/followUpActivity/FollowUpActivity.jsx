import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Paper } from "@mui/material";
import Swal from "sweetalert2";

import ModalCom from "../../../../component/modalComp/ModalCom";
import AddFollowUpActivity from "../../add-Customer/AddFollowUpActivity/AddFollowUpActivity";
import EditFollowUpActivity from "../../edit-Customer/editFollowUpActivity/EditFollowUpActivity";
import EditableTable from "../../../../component/tablecomp/EditableTable";
import Pagination from "../../../../component/pagination/Pagination";
import SearchBar from "../../../../component/searchComp/SearchBar";
import { FakeFollowUpActivityData } from "../../../../component/FakeData";

const FollowUpActivity = () => {
  // --------------------------------------------------------------------------
  // 🔹 States
  // --------------------------------------------------------------------------
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedData, setSelectedData] = useState(null);

  // 🔸 Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 🔸 Edit tracking (for inline edit, optional)
  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const editableFields = [];

  // 🔸 Sorting
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // 🔸 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // --------------------------------------------------------------------------
  // 📦 Load Fake Data
  // --------------------------------------------------------------------------
  useEffect(() => {
    setDataList(FakeFollowUpActivityData);
    setFilteredData(FakeFollowUpActivityData);
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
    setCurrentPage(1); // reset to first page on new search
  }, [searchQuery, dataList]);

  // --------------------------------------------------------------------------
  // ↕️ Sorting Logic
  // --------------------------------------------------------------------------
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
  // 🗑️ Delete Handler
  // --------------------------------------------------------------------------
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1976d2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDataList((prev) => prev.filter((item) => item.id !== id));
        Swal.fire("Deleted!", "Follow-up activity deleted.", "success");
      }
    });
  };

  // --------------------------------------------------------------------------
  // 🧾 Table Header Keys
  // --------------------------------------------------------------------------
  const headers = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  // --------------------------------------------------------------------------
  // 🧭 Table Handlers
  // --------------------------------------------------------------------------
  const handleEdit = (id) => openEditModal(id);
  const handleSave = () => {};
  const handleCancel = () => {};
  const handleChange = () => {};

  // --------------------------------------------------------------------------
  // 🖼️ JSX
  // --------------------------------------------------------------------------
  return (
    <Box p={2}>
      {/* 🔍 Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search follow-up by activity, date, or person..."
      />

      {/* 🧭 Add Button */}
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
          Add Follow-Up Activity
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
            editRowId={editRowId}
            editedData={editedData}
            handleEdit={handleEdit}
            handleSave={handleSave}
            handleCancel={handleCancel}
            handleChange={handleChange}
            editableFields={editableFields}
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
        title="Add Follow-Up Activity"
        content={<AddFollowUpActivity dataList={dataList} setDataList={setDataList} />}
      />

      {/* ✏️ Edit Modal */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Follow-Up Activity"
        content={
          <EditFollowUpActivity
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

export default FollowUpActivity;
