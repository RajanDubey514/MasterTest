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
  useMediaQuery,
} from "@mui/material";
import {
  Edit,
  Save,
  X,
  Check,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "@mui/material/styles";

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
  hideAction = false,
  sortConfig,
  onSort,
  hideEdit,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Sort icon helper
  const getSortIcon = (header) => {
    if (!sortConfig || sortConfig.key !== header)
      return <ChevronDown size={14} className="ml-1 text-gray-300" />;
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
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: "0px 4px 15px rgba(0,0,0,0.12)",
        p: 1,
      }}
    >
      <TableContainer
        sx={{
          maxHeight: 500,
          overflowX: "auto",
          overflowY: "auto",
          "&::-webkit-scrollbar": { height: 6, width: 6 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#b0b0b0",
            borderRadius: 3,
          },
        }}
      >
        <Table
          stickyHeader
          size="small"
          sx={{
            "& .MuiTableCell-root": {
              padding: "4px 6px",
              fontSize: "0.75rem",
              lineHeight: 1.2,
            },
            "& .MuiTableCell-head": {
              padding: "6px 8px",
              fontWeight: 600,
              fontSize: "0.75rem",
              textTransform: "uppercase",
            },
          }}
        >
          {/* ===== HEADER ===== */}
          <TableHead>
            <TableRow>
              {headers.map((header, index) => {
                const lowerHeader = header.toLowerCase();
                const isId = lowerHeader === "id";
                const isAction = lowerHeader === "action";

                return (
                  <TableCell
                    key={index}
                    onClick={() => onSort(header)}
                    sx={{
                      position: isId ? "sticky" : "static",
                      left: isId ? 0 : "auto",
                      right: isAction ? 0 : "auto",
                      zIndex: isId || isAction ? 20 : 10,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      minWidth: isId || isAction ? 80 : 150,
                      borderRight: "1px solid rgba(224,224,224,0.6)",
                      backgroundColor:
                        isId || isAction ? "#1b7bdbff" : "#7aadf4ff",
                      color: "white",
                      fontWeight: 600,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {header.toUpperCase()}
                      {getSortIcon(header)}
                    </div>
                  </TableCell>
                );
              })}

              {!hideAction && !headers.some((h) => h.toLowerCase() === "action") && (
                <TableCell
                  align="center"
                  sx={{
                    position: "sticky",
                    right: 0,
                    zIndex: 20,
                    minWidth: 80,
                    whiteSpace: "nowrap",
                    backgroundColor: "#1976d2",
                    color: "white",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Action
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          {/* ===== BODY ===== */}
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                hover
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                }}
              >
                {headers.map((header) => {
                  const lowerHeader = header.toLowerCase();
                  const isId = lowerHeader === "id";
                  return (
                    <TableCell
                      key={header}
                      sx={{
                        position: isId ? "sticky" : "static",
                        left: isId ? 0 : "auto",
                        backgroundColor: isId ? "#f3f6fb" : "white",
                        zIndex: isId ? 10 : "auto",
                        whiteSpace: "nowrap",
                        minWidth: isId ? 60 : 150,
                        borderRight: "1px solid rgba(224,224,224,0.4)",
                      }}
                    >
                      {editRowId === row.id &&
                      editableFields.includes(header) ? (
                        <input
                          type="text"
                          value={editedData[header] || ""}
                          onChange={(e) => handleChange(e, header)}
                          onKeyUp={(e) => e.key === "Enter" && handleSave()}
                          style={{
                            width: "100%",
                            padding: "3px 4px",
                            border: "1px solid #ccc",
                            borderRadius: 3,
                            fontSize: "0.7rem",
                          }}
                        />
                      ) : row[header] === true ? (
                        <Check size={14} color="green" />
                      ) : row[header] === false ? (
                        <X size={14} color="red" />
                      ) : (
                        String(row[header])
                      )}
                    </TableCell>
                  );
                })}

                {!hideAction && (
                  <TableCell
                    align="center"
                    sx={{
                      position: "sticky",
                      right: 0,
                      backgroundColor: "#fff",
                      zIndex: 15,
                      whiteSpace: "nowrap",
                      minWidth: 80,
                      borderLeft: "1px solid rgba(224,224,224,0.4)",
                    }}
                  >
                    {editRowId === row.id ? (
                      <>
                        <IconButton
                          color="success"
                          onClick={handleSave}
                          size="small"
                        >
                          <Save size={14} />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={handleCancel}
                          size="small"
                        >
                          <X size={14} />
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
                            <Edit size={14} />
                          </IconButton>
                        )}
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(row.id)}
                          size="small"
                        >
                          <Trash2 size={14} />
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
