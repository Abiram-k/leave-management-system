import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle,
  Stack,
  Button,
} from "@mui/material";
import type { EmployeeFormType } from "@/types/form.type";
import { Formik } from "formik";
import {
  employeeEditSchema,
  getAuthSchema,
} from "@/features/auth/schemas/auth.schema";

type AddOrEditEmployeeModalProp = {
  open: boolean;
  setOpen: (value: boolean) => void;
  editIndex: number | null;
  form: EmployeeFormType;
  setForm: (data: any) => void;
  onSubmit: (data: EmployeeFormType) => void;
};

const AddOrEditEmployeeModal = ({
  editIndex,
  form,
  open,
  setForm,
  setOpen,
  onSubmit,
}: AddOrEditEmployeeModalProp) => {
  const validationSchema =
    editIndex !== null ? employeeEditSchema() : getAuthSchema(false);

  console.log("Edit index: ", editIndex, "Form: ", form);

  const handleFormSubmit = (values: EmployeeFormType) => {
    setForm(values);
    onSubmit(values);
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>
        {editIndex !== null ? "Edit Employee" : "Add Employee"}
      </DialogTitle>

      <Formik
        initialValues={{
          id: form.id,
          name: form.name,
          email: form.email,
          password: form.password || "",
          confirmPassword: form.confirmPassword || "",
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          handleSubmit,
          touched,
          errors,
          values,
          handleChange,
          handleBlur,
        }) => {
          console.log("Formik Errors:", errors);

          return (
            <form action="" onSubmit={handleSubmit}>
              <DialogContent dividers>
                <Stack spacing={2}>
                  <TextField
                    label="Name"
                    fullWidth
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    type="name"
                    error={Boolean(touched["name"] && errors["name"])}
                    helperText={touched["name"] && errors["name"]}
                    onBlur={handleBlur}
                  />
                  <TextField
                    label="Email"
                    type="text"
                    fullWidth
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    error={Boolean(touched["email"] && errors["email"])}
                    helperText={touched["email"] && errors["email"]}
                    onBlur={handleBlur}
                  />

                  {editIndex == null && (
                    <>
                      <TextField
                        label="Password"
                        name="password"
                        placeholder="Enter password"
                        type="password"
                        error={Boolean(
                          touched["password"] && errors["password"]
                        )}
                        helperText={touched["password"] && errors["password"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                      />

                      <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        placeholder="Confrim password"
                        type="password"
                        error={Boolean(
                          touched["confirmPassword"] &&
                            errors["confirmPassword"]
                        )}
                        helperText={
                          touched["confirmPassword"] &&
                          errors["confirmPassword"]
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                      />
                    </>
                  )}
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" variant="contained">
                  {editIndex !== null ? "Update" : "Add"}
                </Button>
              </DialogActions>
            </form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default AddOrEditEmployeeModal;
