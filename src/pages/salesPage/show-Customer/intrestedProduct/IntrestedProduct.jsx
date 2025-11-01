import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, Paper } from "@mui/material";
import Swal from "sweetalert2";
import ModalCom from "../../../../component/modalComp/ModalCom";
import EditFormData from "../../../salesPage/edit-Customer/EditFormData";
import AddIntrestedProduct from "../../add-Customer/AddIntrestedProduct/AddIntrestedProduct";
import {FakeInterestedProductData} from "../../../../component/FakeData";
import EditableTable from "../../../../component/tablecomp/EditableTable";
import Pagination from "../../../../component/pagination/Pagination";
import EditIntrestedProduct from "../../edit-Customer/editIntrestedProduct/EditIntrestedProduct";

const IntrestedProduct = () => {
  const [dataList, setDataList] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Edit tracking (for inline editing — optional)
  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const editableFields = []; // Not using inline edit now, handled via modal

  // Sorting
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const onSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...dataList].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setDataList(sortedData);
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    setDataList(FakeInterestedProductData);
  }, []);

  const totalPages = Math.ceil(dataList.length / rowsPerPage);
  const paginatedData = dataList.slice(
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

  const openViewModal = (id) => {
    const row = dataList.find((item) => item.id === id);
    setSelectedData(row);
    setIsViewModalOpen(true);
  };
  // const closeViewModal = () => {
  //   setSelectedData(null);
  //   setIsViewModalOpen(false);
  // };

  // Delete
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

  // Table header keys
  const headers = dataList.length > 0 ? Object.keys(dataList[0]) : [];

  // Table handlers
  const handleEdit = (id) => openEditModal(id);
  const handleSave = () => {};
  const handleCancel = () => {};
  const handleChange = () => {};
  // const handleLog = (id) => openViewModal(id);

  return (
    <Box p={2}>
      {/* Header */}
      <Grid container justifyContent="end" alignItems="center" mb={2}>
        <Button
          variant="contained"
          size="small"
          sx={{
            textTransform: "capitalize",
            backgroundColor: "#primary.main",
            "&:hover": { backgroundColor: "primary.main" },
          }}
          onClick={openAddModal}
        >
          Add Interested Product
        </Button>
      </Grid>

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

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {/* Add Modal */}
      <ModalCom
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add Interested Product"
        content={< AddIntrestedProduct dataList={dataList} setDataList={setDataList} />}
      />

      {/* Edit Modal */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Data"
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
