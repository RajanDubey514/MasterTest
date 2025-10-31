import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
} from "@mui/material";
import {Grid} from "@mui/material"; // ✅ New Grid2 import (MUI v6)
import { alertSuccess } from "../../../../component/alert/Alert";

// ✅ Helper for red (*) required mark
const RequiredLabel = ({ label }) => (
  <Typography
    component="span"
    sx={{ color: "text.primary",  fontWeight: 500 }}
  >
    {label}
    <Typography component="span" sx={{ color: "red", ml: 0.3 }}>
      (*)
    </Typography>
  </Typography>
);

// ✅ Yup validation
const validationSchema = Yup.object({
  branchName: Yup.string().required("Branch Name is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  address: Yup.string().required("Address is required"),
});

const BranchsDetail = ({ dataList, setDataList }) => {
  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const formData = { ...values, id: Date.now() };
      if (setDataList) setDataList((prev) => [...prev, formData]);
      alertSuccess("Branch details saved successfully!");
      resetForm();
    },
  });

  return (
    <Box
      sx={{
        maxHeight: 380,
        overflowY: "auto",
        backgroundColor: "#e9ebeeff",
        p: 2,
        borderRadius: 2,
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} sx={{p:2 , px:8}}>
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
            <Grid key={field.name} size={{ xs: 12, sm: 6, md: 6 }}>
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

          {/* ✅ Select Fields */}
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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

          {/* ✅ Submit */}
          <Grid size={{ xs: 12 }}>
            <Box display="flex" justifyContent="center" pt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                sx={{ px: 4, textTransform: "none" }}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default BranchsDetail;
