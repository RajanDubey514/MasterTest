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

// ✅ Red asterisk for required fields
const RequiredLabel = ({ label }) => (
  <Typography component="span" sx={{ color: "text.primary", fontSize: 14 }}>
    {label}
    <Typography component="span" sx={{ color: "red", ml: 0.3 }}>
      *
    </Typography>
  </Typography>
);

// ✅ Validation Schema
const validationSchema = Yup.object({
  productName: Yup.string().required("Product Name is required"),
  productCode: Yup.string().required("Product Code is required"),
  productShortDesc: Yup.string().required("Product Short Description is required"),
  productFullDesc: Yup.string().required("Product Full Description is required"),
  size: Yup.string().required("Size is required"),
  length: Yup.string().required("Length is required"),
  manufactureBrand: Yup.string().required("Manufacture/Brand is required"),
  salePrice: Yup.string().required("Sale Price is required"),
  purchasePrice: Yup.string().required("Purchase Price is required"),
  reorderQty: Yup.string().required("Reorder Qty is required"),
  minOrderQty: Yup.string().required("Minimum Order Qty is required"),
  cgst: Yup.string().required("CGST % is required"),
  sgst: Yup.string().required("SGST % is required"),
  igst: Yup.string().required("IGST % is required"),
  productType: Yup.string().required("Product Type is required"),
  productMainGroup: Yup.string().required("Product Main Group is required"),
  productSubGroup: Yup.string().required("Product Sub Group is required"),
  assemblyType: Yup.string().required("Assembly Type is required"),
  saleUOM: Yup.string().required("Sale UOM is required"),
  purchaseUOM: Yup.string().required("Purchase UOM is required"),
});

const EditIntrestedProduct = ({
  selectedData,
  dataList,
  setDataList,
  closeEditModal,
}) => {
  const formik = useFormik({
    initialValues: {
      productName: "",
      productCode: "",
      productShortDesc: "",
      productFullDesc: "",
      size: "",
      length: "",
      manufactureBrand: "",
      salePrice: "",
      purchasePrice: "",
      reorderQty: "",
      minOrderQty: "",
      cgst: "",
      sgst: "",
      igst: "",
      productType: "",
      productMainGroup: "",
      productSubGroup: "",
      assemblyType: "",
      saleUOM: "",
      purchaseUOM: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const updatedData = dataList.map((item) =>
        item.id === selectedData.id ? { ...item, ...values } : item
      );
      setDataList(updatedData);
      alertSuccess("Interested product details updated successfully!");
      closeEditModal();
      resetForm();
    },
  });

  // ✅ Prefill form when modal opens with selected data
  useEffect(() => {
    if (selectedData) {
      formik.setValues({
        productName: selectedData.productName || "",
        productCode: selectedData.productCode || "",
        productShortDesc: selectedData.productShortDesc || "",
        productFullDesc: selectedData.productFullDesc || "",
        size: selectedData.size || "",
        length: selectedData.length || "",
        manufactureBrand: selectedData.manufactureBrand || "",
        salePrice: selectedData.salePrice || "",
        purchasePrice: selectedData.purchasePrice || "",
        reorderQty: selectedData.reorderQty || "",
        minOrderQty: selectedData.minOrderQty || "",
        cgst: selectedData.cgst || "",
        sgst: selectedData.sgst || "",
        igst: selectedData.igst || "",
        productType: selectedData.productType || "",
        productMainGroup: selectedData.productMainGroup || "",
        productSubGroup: selectedData.productSubGroup || "",
        assemblyType: selectedData.assemblyType || "",
        saleUOM: selectedData.saleUOM || "",
        purchaseUOM: selectedData.purchaseUOM || "",
      });
    }
  }, [selectedData]);

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
      {/* ✅ Scrollable Form Section */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 1}}>
        <form onSubmit={formik.handleSubmit} id="editInterestedProductForm">
          <Grid container spacing={2} sx={{ }}>
            {/* ✅ Text Fields */}
            {[
              { label: "Product Name", name: "productName" },
              { label: "Product Code", name: "productCode" },
              { label: "Product Short Description", name: "productShortDesc" },
              { label: "Product Full Description", name: "productFullDesc" },
              { label: "Size", name: "size" },
              { label: "Length", name: "length" },
              { label: "Manufacture / Brand", name: "manufactureBrand" },
              { label: "Sale Price", name: "salePrice" },
              { label: "Purchase Price", name: "purchasePrice" },
              { label: "Reorder Qty", name: "reorderQty" },
              { label: "Minimum Order Qty", name: "minOrderQty" },
              { label: "CGST %", name: "cgst" },
              { label: "SGST %", name: "sgst" },
              { label: "IGST %", name: "igst" },
            ].map((field) => (
              <Grid key={field.name} item size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  size="small"
                  label={<RequiredLabel label={field.label} />}
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

            {/* ✅ Select Dropdowns */}
            {[
              {
                label: "Product Type",
                name: "productType",
                options: ["Type A", "Type B", "Type C"],
              },
              {
                label: "Product Main Group",
                name: "productMainGroup",
                options: ["Group 1", "Group 2", "Group 3"],
              },
              {
                label: "Product Sub Group",
                name: "productSubGroup",
                options: ["SubGroup 1", "SubGroup 2", "SubGroup 3"],
              },
              {
                label: "Assembly Type",
                name: "assemblyType",
                options: ["Assembled", "Non-Assembled"],
              },
              {
                label: "Sale UOM",
                name: "saleUOM",
                options: ["PCS", "KG", "LTR"],
              },
              {
                label: "Purchase UOM",
                name: "purchaseUOM",
                options: ["PCS", "KG", "LTR"],
              },
            ].map((select) => (
              <Grid key={select.name} item size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label={<RequiredLabel label={select.label} />}
                  name={select.name}
                  value={formik.values[select.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched[select.name] &&
                    Boolean(formik.errors[select.name])
                  }
                  helperText={
                    formik.touched[select.name] && formik.errors[select.name]
                  }
                >
                  {select.options.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            ))}
          </Grid>
        </form>
      </Box>

      {/* ✅ Fixed Footer Buttons */}
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
          variant="contained"
          size="small"
          sx={{
            px: 4,
            textTransform: "none",
            borderRadius: "8px",
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#125ea3" },
          }}
          form="editInterestedProductForm"
        >
          Update
        </Button>

        <Button
          type="button"
          variant="outlined"
          size="small"
          sx={{
            px: 4,
            textTransform: "none",
            borderRadius: "8px",
            color: "#d32f2f",
            borderColor: "#d32f2f",
            "&:hover": { borderColor: "#b71c1c", backgroundColor: "#fff5f5" },
          }}
          onClick={() => formik.resetForm()}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default EditIntrestedProduct;
