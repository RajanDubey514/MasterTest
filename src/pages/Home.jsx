import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Grid,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModalCom from "../component/ModalCom";
import AddDataForm from "./addData/AddDataForm";
import SingleData from "./singleData/SingleData";
import "./Home.css"; // ✅ Import external CSS
import { Delete } from "@mui/icons-material";
import FakeData from "../component/FakeData";
import Swal from "sweetalert2";
import EditFormData from "./Edit/EditFormData";


const Home = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
  setDataList(FakeData);
}, []);



  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

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
  const closeViewModal = () => {
    setSelectedData(null);
    setIsViewModalOpen(false);
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
      // 🔹 Perform your delete logic here
      setDataList((prev) => prev.filter((item) => item.id !== id));

      Swal.fire("Deleted!", "Your data has been deleted.", "success");
    }
  });
};


  return (
    <Box p={2}>
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Account Master</Typography>
        <Button variant="contained" size="small" sx={{textTransform : "capitalize"}} onClick={openAddModal}>
          Add Data
        </Button>
      </Grid>

      <TableContainer component={Paper} className="tableContainer"
          sx={{
    maxHeight: 300, // set desired height
    overflow: "auto",
    "&::-webkit-scrollbar": { width: 2, height: 1 },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#b0b0b0",
      borderRadius: 4,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#665f5fff",
    },
  }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Account Name</TableCell>
              <TableCell>Account Code</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dataList.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.accountName}</TableCell>
                <TableCell>{row.accountCode}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.companyName}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.mobile}</TableCell>
                <TableCell align="center">
                  <button
                    className="tablebutton1"
                    onClick={() => openViewModal(row.id)}
                  >
                    <VisibilityIcon fontSize="12px" size="small" />
                  </button>
                  <button
                    className="tablebutton2"
                    onClick={() => openEditModal(row.id)}
                  >
                    <EditIcon fontSize="12px" size="small" />
                  </button>
                   <button
                    className="tablebutton2"
                      onClick={() => handleDelete(row.id)}
                  >
                    <Delete fontSize="12px" size="small" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Data Modal */}
      <ModalCom
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add Data"
        content={<AddDataForm dataList={dataList} setDataList={setDataList}/>}
      />

      {/* Edit Data Modal */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Data"
        content = {<EditFormData 
        selectedData={selectedData}  
        dataList={dataList}  
        setDataList={setDataList}  
        closeEditModal={closeEditModal} 
         />}
      />

      {/* View Single Data Modal */}
      <ModalCom
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        title="Account Details"
        content={<SingleData data={selectedData} />}
      />
    </Box>
  );
};

export default Home;
