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
import {Grid} from "@mui/material"; 
import { alertSuccess } from "../../../../component/alert/Alert";

// ✅ Helper: Red asterisk for required fields
const RequiredLabel = ({ label }) => (
  <Typography component="span" sx={{ color: "text.primary" }}>
    {label}
    <Typography component="span" sx={{ color: "red", ml: 0.3 }}>
      (*)
    </Typography>
  </Typography>
);

// ✅ Validation Schema
const validationSchema = Yup.object({
  customerName: Yup.string().required("Customer Name is required"),
  customerCode: Yup.string().required("Customer Code is required"),
  gstNo: Yup.string().required("GST No is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  customerType: Yup.string().required("Customer Type is required"),
});

const CustomerBasic = ({ dataList, setDataList }) => {
  const formik = useFormik({
    initialValues: {
      customerName: "",
      contactPerson: "",
      email: "",
      contactNo: "",
      customerCode: "",
      designation: "",
      mobileNo: "",
      fat: "",
      city: "",
      pincode: "",
      tinNo: "",
      panNo: "",
      cstNo: "",
      gstNo: "",
      creditLimit: "",
      creditDays: "",
      sourceEmployee: "",
      exciseNo: "",
      annualTurnover: "",
      country: "",
      state: "",
      customerType: "",
      activeStatus: false,
      gstExempt: false,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const formData = { ...values, id: Date.now() };
      if (setDataList) setDataList((prev) => [...prev, formData]);
      alertSuccess("Customer details saved successfully!");
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
          {/* ✅ TEXT FIELDS */}
          {[
            { label: "Customer Name", name: "customerName", required: true },
            { label: "Contact Person Name", name: "contactPerson" },
            { label: "Email", name: "email" },
            { label: "Contact No.", name: "contactNo" },
            { label: "Customer Code", name: "customerCode", required: true },
            { label: "Designation", name: "designation" },
            { label: "Mobile No", name: "mobileNo" },
            { label: "FAT", name: "fat" },
            { label: "City", name: "city" },
            { label: "Pincode", name: "pincode" },
            { label: "TIN No", name: "tinNo" },
            { label: "PAN No", name: "panNo" },
            { label: "CST No", name: "cstNo" },
            { label: "GST No", name: "gstNo", required: true },
            { label: "Credit Limit", name: "creditLimit" },
            { label: "Credit Days", name: "creditDays" },
            { label: "Source Employee", name: "sourceEmployee" },
            { label: "Excise No", name: "exciseNo" },
            { label: "Annual Turnover", name: "annualTurnover" },
          ].map((field) => (
            <Grid key={field.name} size={{ xs: 12, sm: 6, md: 6 }}>
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

          {/* ✅ SELECT FIELDS */}
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <TextField
              select
              fullWidth
              size="small"
              label={<RequiredLabel label="Customer Type" />}
              name="customerType"
              value={formik.values.customerType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.customerType &&
                Boolean(formik.errors.customerType)
              }
              helperText={
                formik.touched.customerType && formik.errors.customerType
              }
            >
              {["Retail", "Wholesale", "Corporate"].map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* ✅ CHECKBOXES */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.activeStatus}
                  onChange={formik.handleChange}
                  name="activeStatus"
                  color="primary"
                />
              }
              label="Active Status"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.gstExempt}
                  onChange={formik.handleChange}
                  name="gstExempt"
                  color="primary"
                />
              }
              label="GST Exempt"
            />
          </Grid>

          {/* ✅ SUBMIT BUTTON */}
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

export default CustomerBasic;
