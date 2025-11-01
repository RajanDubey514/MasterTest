import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";
import { alertSuccess } from "../../../../component/alert/Alert";

// ✅ Red * mark helper
const RequiredLabel = ({ label }) => (
  <Typography component="span" sx={{ color: "text.primary", fontWeight: 500 }}>
    {label}
    <Typography component="span" sx={{ color: "red", ml: 0.3 }}>
      *
    </Typography>
  </Typography>
);

// ✅ Validation schema
const validationSchema = Yup.object({
  branchName: Yup.string().required("Branch Name is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  address: Yup.string().required("Address is required"),
});

const AddBranchsDetail = ({ dataList, setDataList }) => {
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
      const formData = { ...values, id: Date.now() };
      if (setDataList) setDataList((prev) => [...prev, formData]);
      alertSuccess("Branch details saved successfully!");
      resetForm();
    },
  });

  // ✅ Fully reset form on click
  const handleReset = () => {
    formik.resetForm({ values: initialValues });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f8ff",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        height: 480, // Fixed height for modal
        overflow: "hidden",
      }}
    >
      {/* ✅ Scrollable Form Section */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        <form id="branch-form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
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
              <Grid key={field.name} size={{ xs: 12, sm: 6 }}>
                <TextField
                  size="small"
                  fullWidth
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

            {/* Country */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                size="small"
                fullWidth
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

            {/* State */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                size="small"
                fullWidth
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

      {/* ✅ Fixed Footer Buttons */}
      <Box
        sx={{
          borderTop: "1px solid #ddd",
          p: 3.5,
          display: "flex",
          justifyContent: "center",
          gap: 2,
          backgroundColor: "#fff",
          position: "sticky",
          bottom: 0,
        }}
      >
       

        <Button
          type="submit"
          form="branch-form"
          variant="contained"
          color="primary"
          size="small"
          sx={{ px: 4, textTransform: "none" }}
        >
          Submit
        </Button>
          <Button
          variant="outlined"
          color="secondary"
          size="small"
          sx={{
                    px: 4,
                    textTransform: "none",
                    borderRadius: "8px",
                    color: "#d32f2f",
                    borderColor: "#d32f2f",
                    "&:hover": { borderColor: "#b71c1c", backgroundColor: "#fff5f5" },
                  }}
          onClick={handleReset}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default AddBranchsDetail;
