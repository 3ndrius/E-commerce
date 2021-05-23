import * as React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { toast } from "react-toastify";
import {
  requestUpdateUserPassword,
  clearErrors,
  requestUpdateUserPasswordReset,
} from "../actions/userActions";

export default function UpdatePassword({ history }) {

  const { isUpdated, loading, error } = useSelector((state) => state.user);

  const [user, setUser] = React.useState({ oldPassword: "", password: "" });

  const handleSetPassword = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(requestUpdateUserPassword(user));
  };
  React.useEffect(() => {
    if (error) {
      toast.error(error || "Password update failed");
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Password updated successfully");
      history.push("/profile");
      dispatch(requestUpdateUserPasswordReset());
    }
  }, [dispatch, error, history, isUpdated]);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Password
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{
            width: "100%", // Fix IE11 issue.
            mt: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="oldPassword"
                required
                fullWidth
                id="oldPassword"
                onChange={handleSetPassword}
                label="Old password"
                autoFocus
                type="password"
                value={user.oldPassword}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="passowrd"
                onChange={handleSetPassword}
                id="password"
                label="password"
                name="password"
                value={user.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            onClick={handleUpdate}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading ? true : false}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
