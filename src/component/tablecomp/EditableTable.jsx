import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import {
  Edit,
  Save,
  X,
  Check,
  FileText,
  Trash2, 
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const EditableTable = ({
  headers,
  rows,
  editRowId,
  editedData,
  handleEdit,
  handleSave,
  handleCancel,
  handleChange,
  editableFields,
   handleDelete,
  handleLog,
  hideChangeLog,
  hideEdit,
  hideAction = false,
  sortConfig,
  onSort,
}) => {
  // Helper for sorting icon (only one icon)
  const getSortIcon = (header) => {
    if (!sortConfig || sortConfig.key !== header)
      return <ChevronDown size={14} className="ml-1 text-gray-300" />; // default state

    return sortConfig.direction === "asc" ? (
      <ChevronUp size={14} className="ml-1 text-white" />
    ) : (
      <ChevronDown size={14} className="ml-1 text-white" />
    );
  };

  return (
    <Paper
      sx={{
        width: "100%",
        borderRadius: 2,
        boxShadow: 2,
        overflow: "hidden",
      }}
    >
      <TableContainer
        sx={{
          width: "100%",
          maxHeight: 500,
          maxWidth : 1050,
          overflowX: "auto",
          overflowY: "auto",
          "&::-webkit-scrollbar": { height: 6, width: 6 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: 3,
          },
        }}
      >
        <Table stickyHeader size="small" sx={{  }}>
          {/* ===== TABLE HEADER ===== */}
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell
                  key={index}
                  onClick={() => onSort(header)}
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    position:
                      header.toLowerCase() === "id" ? "sticky" : "static",
                    left: header.toLowerCase() === "id" ? 0 : "auto",
                    zIndex: header.toLowerCase() === "id" ? 10 : 1,
                    cursor: "pointer",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                    minWidth: 150,
                  }}
                >
                  <div className="flex items-center justify-between">
                    {header}
                    {getSortIcon(header)}
                  </div>
                </TableCell>
              ))}

              {!hideAction && (
                <TableCell
                  align="center"
                  sx={{
                    // backgroundColor: "#2e7d32",
                    color: "black",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    padding: "8px 10px",
                    position: "sticky",
                    right: 0,
                    zIndex: 10,
                    whiteSpace: "nowrap",
                    minWidth: 130,
                  }}
                >
                  Action
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          {/* ===== TABLE BODY ===== */}
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} hover>
                {headers.map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      position:
                        header.toLowerCase() === "id" ? "sticky" : "static",
                      left: header.toLowerCase() === "id" ? 0 : "auto",
                      backgroundColor:
                        header.toLowerCase() === "id"
                          ? "#f9fafb"
                          : "background.paper",
                      zIndex: header.toLowerCase() === "id" ? 5 : "auto",
                      minWidth: 150,
                      padding: "6px 8px",
                      fontSize: "0.70rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {editRowId === row.id && editableFields.includes(header) ? (
                      <input
                        type="text"
                        value={editedData[header] || ""}
                        onChange={(e) => handleChange(e, header)}
                        onKeyUp={(e) => e.key === "Enter" && handleSave()}
                        style={{
                          width: "100%",
                          padding: "4px",
                          border: "1px solid #ccc",
                          borderRadius: 3,
                          fontSize: "0.75rem",
                        }}
                      />
                    ) : row[header] === true ? (
                      <Check size={16} color="green" />
                    ) : row[header] === false ? (
                      <X size={16} color="red" />
                    ) : (
                      String(row[header])
                    )}
                  </TableCell>
                ))}

                {!hideAction && (
                  <TableCell
                    align="center"
                    sx={{
                      position: "sticky",
                      right: 0,
                      backgroundColor: "#fff",
                      zIndex: 5,
                      padding: "6px",
                      whiteSpace: "nowrap",
                      minWidth: 130,
                    }}
                  >
                    {editRowId === row.id ? (
                      <>
                        <IconButton
                          color="success"
                          onClick={handleSave}
                          size="small"
                        >
                          <Save size={16} />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={handleCancel}
                          size="small"
                        >
                          <X size={16} />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        {!hideEdit && (
                          <IconButton
                            color="primary"
                            onClick={() => handleEdit(row.id)}
                            size="small"
                          >
                            <Edit size={16} />
                          </IconButton>
                        )}
                           <IconButton
                          color="error"
                          onClick={() => handleDelete(row.id)}
                          size="small"
                        >
                          <Trash2 size={16} />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default EditableTable;
