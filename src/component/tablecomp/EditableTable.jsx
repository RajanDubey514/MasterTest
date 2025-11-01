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
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Helper for icon size based on screen
  const iconSize = isMobile ? 14 : isTablet ? 15 : 16;

  const getSortIcon = (header) => {
    if (!sortConfig || sortConfig.key !== header)
      return <ChevronDown size={iconSize} className="ml-1 text-gray-300" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={iconSize} className="ml-1 text-white" />
    ) : (
      <ChevronDown size={iconSize} className="ml-1 text-white" />
    );
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: "0px 4px 15px rgba(0,0,0,0.12)",
        p: { xs: 0.5, sm: 1, md: 1.5 },
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
              padding: { xs: "3px 4px", },
              fontSize: {
                xs: "0.6rem",
                sm: "0.7rem",
                md: "0.8rem",
              },
              lineHeight: 1.3,
            },
            "& .MuiTableCell-head": {
              fontWeight: 600,
              fontSize: {
                xs: "0.65rem",
                sm: "0.75rem",
                md: "0.85rem",
              },
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
                      minWidth: isId || isAction ? 70 : { xs: 100, sm: 130, md: 150 },
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
                    minWidth: { xs: 70, sm: 80, md: 90 },
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
                        minWidth: isId ? 50 : { xs: 100, sm: 130, md: 150 },
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
                            padding: isMobile ? "2px 3px" : "3px 5px",
                            border: "1px solid #ccc",
                            borderRadius: 3,
                            fontSize: isMobile ? "0.6rem" : "0.75rem",
                          }}
                        />
                      ) : row[header] === true ? (
                        <Check size={iconSize} color="green" />
                      ) : row[header] === false ? (
                        <X size={iconSize} color="red" />
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
                      minWidth: { xs: 70, sm: 80, md: 90 },
                      borderLeft: "1px solid rgba(224,224,224,0.4)",
                    }}
                  >
                    {editRowId === row.id ? (
                      <>
                        <IconButton
                          color="success"
                          onClick={handleSave}
                          size={isMobile ? "small" : "medium"}
                        >
                          <Save size={iconSize} />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={handleCancel}
                          size={isMobile ? "small" : "medium"}
                        >
                          <X size={iconSize} />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        {!hideEdit && (
                          <IconButton
                            color="primary"
                            onClick={() => handleEdit(row.id)}
                            size={isMobile ? "small" : "medium"}
                          >
                            <Edit size={iconSize} />
                          </IconButton>
                        )}
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(row.id)}
                          size={isMobile ? "small" : "medium"}
                        >
                          <Trash2 size={iconSize} />
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
