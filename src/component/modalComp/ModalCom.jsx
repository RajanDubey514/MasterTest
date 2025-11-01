import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 800 },
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 2,
  maxHeight: "90vh", // ensures modal fits in viewport
  width : "75%",
  overflow: "hidden", // hides scrollbars completely
};

const ModalCom = ({ isOpen, onClose, title, content }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
      closeAfterTransition
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
        },
      }}
    >
      <Box sx={style}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 0,
          }}
        >
          <Typography
            id="modal-title"
            sx={{ fontSize: "17px", fontWeight: 600 }}
          >
            {title || ""}
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: "red" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Body */}
        <Box id="modal-content" sx={{ overflow: "hidden" }}>
          {content || <Typography>No content available</Typography>}
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalCom;
