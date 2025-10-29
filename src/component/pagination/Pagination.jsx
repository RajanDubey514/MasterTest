import React from "react";
import { Button, Stack, Typography } from "@mui/material";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const renderPagination = () => {
    const isTooManyPages = totalPages > 5;
    const startPage = Math.max(currentPage - 1, 1);
    const endPage = Math.min(currentPage + 1, totalPages);

    return (
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
        sx={{ flexWrap: "wrap", mt: 2 }}
      >
        {/* Prev Button */}
        <Button
          variant="outlined"
          size="small"
          sx={{fontSize : "10px"}}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </Button>

        {/* Always show first page */}
        <Button
          variant={currentPage === 1 ? "contained" : "outlined"}
          color={currentPage === 1 ? "primary" : "inherit"}
          size="small"
          sx={{fontSize : "10px"}}
          onClick={() => handlePageChange(1)}
        >
          1
        </Button>

        {/* Ellipsis (if far from start) */}
        {isTooManyPages && currentPage > 3 && (
          <Typography variant="body2">...</Typography>
        )}

        {/* Middle Pages */}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i
        ).map((page) => {
          if (page > 1 && page < totalPages) {
            return (
              <Button
                key={page}
                variant={currentPage === page ? "contained" : "outlined"}
                color={currentPage === page ? "primary" : "inherit"}
                size="small"
                sx={{fontSize : "10px"}}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            );
          }
          return null;
        })}

        {/* Ellipsis (if far from end) */}
        {isTooManyPages && currentPage < totalPages - 2 && (
          <Typography variant="body2">...</Typography>
        )}

        {/* Always show last page */}
        {totalPages > 1 && (
          <Button
            variant={currentPage === totalPages ? "contained" : "outlined"}
            color={currentPage === totalPages ? "success" : "inherit"}
            size="small"
            sx={{fontSize : "10px"}}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Button>
        )}

        {/* Next Button */}
        <Button
          variant="outlined"
          size="small"
          sx={{fontSize : "10px" }}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </Stack>
    );
  };

  return renderPagination();
};

export default Pagination;
