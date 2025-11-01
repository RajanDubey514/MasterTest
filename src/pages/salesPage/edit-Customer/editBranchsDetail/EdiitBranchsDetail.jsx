import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { alertSuccess } from "../../../../component/alert/Alert";

// ✅ Helper: Red * mark for required fields
const RequiredLabel = ({ label }) => (
  <Typography component="span" sx={{ color: "text.primary", fontWeight: 500 }}>
    {label}
    <Typography component="span" sx={{ color: "red", ml: 0.3 }}>
      *
    </Typography>
  </Typography>
);

// ✅ Validation Schema
const validationSchema = Yup.object({
  branchName: Yup.string().required("Branch Name is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  address: Yup.string().required("Address is required"),
});

const EdiitBranchsDetail = ({
  dataList,
  setDataList,
  selectedData,
  closeEditModal,
}) => {
  const initialValues = {
    branchName: "",
    contactPerson: "",
    email: "",
    designation: "",
    mobileNo: "",
    address: "",
    fax: "",
    contactNo: "",
    pincode: "",
    cstNo: "",
    tinNo: "",
    panNo: "",
    gstNo: "",
    annualTurnover: "",
    city: "",
    country: "",
    state: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (selectedData && selectedData.id) {
        // ✅ Update existing record
        const updatedList = dataList.map((item) =>
          item.id === selectedData.id ? { ...item, ...values } : item
        );
        setDataList(updatedList);
        alertSuccess("Branch details updated successfully!");
      } else {
        // ✅ Add new record
        const newData = { ...values, id: Date.now() };
        setDataList((prev) => [...prev, newData]);
        alertSuccess("Branch details added successfully!");
      }

      resetForm();
      if (closeEditModal) closeEditModal();
    },
  });

  // ✅ Prefill data when editing
  useEffect(() => {
    if (selectedData) {
      formik.setValues(selectedData);
    }
  }, [selectedData]);

  // ✅ Reset to blank state
  const handleReset = () => {
    formik.resetForm({ values: initialValues });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f3f4f6",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        height: "75vh",
      }}
    >
      {/* ✅ Scrollable Form */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 1 }}>
        <form onSubmit={formik.handleSubmit} id="branchForm">
          <Grid container spacing={2} sx={{  }}>
            {/* ✅ Text Fields */}
            {[
              { label: "Branch Name", name: "branchName", required: true },
              { label: "Contact Person", name: "contactPerson" },
              { label: "Email", name: "email" },
              { label: "Designation", name: "designation" },
              { label: "Mobile No", name: "mobileNo" },
              { label: "Address", name: "address", required: true },
              { label: "Fax", name: "fax" },
              { label: "Contact No", name: "contactNo" },
              { label: "Pincode", name: "pincode" },
              { label: "CST No", name: "cstNo" },
              { label: "TIN No", name: "tinNo" },
              { label: "PAN No", name: "panNo" },
              { label: "GST No", name: "gstNo" },
              { label: "Annual Turnover", name: "annualTurnover" },
              { label: "City", name: "city", required: true },
            ].map((field) => (
              <Grid key={field.name} item size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label={
                    field.required ? (
                      <RequiredLabel label={field.label} />
                    ) : (
                      field.label
                    )
                  }
                  name={field.name}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched[field.name] &&
                    Boolean(formik.errors[field.name])
                  }
                  helperText={
                    formik.touched[field.name] && formik.errors[field.name]
                  }
                />
              </Grid>
            ))}

            {/* ✅ Select Fields */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                fullWidth
                size="small"
                label={<RequiredLabel label="Country" />}
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              >
                {["India", "USA", "UK"].map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                fullWidth
                size="small"
                label={<RequiredLabel label="State" />}
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              >
                {["Maharashtra", "Delhi", "Uttar Pradesh"].map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* ✅ Sticky Footer Buttons */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid #ddd",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          gap: 2,
          position: "sticky",
          bottom: 0,
          zIndex: 10,
        }}
      >
        <Button
          type="submit"
          form="branchForm"
          variant="contained"
          color="primary"
          size="small"
          sx={{ px: 4, textTransform: "none" }}
        >
          {selectedData ? "Update" : "Submit"}
        </Button>

        <Button
          variant="outlined"
          color="error"
          size="small"
          sx={{
            px: 4,
            textTransform: "none",
            borderRadius: "8px",
            color: "#d32f2f",
            borderColor: "#d32f2f",
            "&:hover": {
              borderColor: "#b71c1c",
              backgroundColor: "#fff5f5",
            },
          }}
          onClick={handleReset}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default EdiitBranchsDetail;
