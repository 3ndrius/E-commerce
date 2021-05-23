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
import { requestPasswordReset, clearErrors } from "../actions/userActions";

export default function PasswordReset({ history, match }) {
  const { error, message } = useSelector((state) => state.forgotPassword);

  const [user, setUser] = React.useState({
    password: "",
    confirmPassword: ""
  });
  const handleSetPassword = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();

  const handleReset = (e) => {
    e.preventDefault();
    dispatch(requestPasswordReset(user));
  };
  React.useEffect(() => {
      setUser({...user, token: match.params.token})
    if (error) {
      toast.error(error || "Password reset failed");
      dispatch(clearErrors());
    }
    if (message) {
      toast.success("Password reset successfully");
      history.push("/login");
    }
  }, [dispatch, error, message, history, match, user]);

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
          New Password
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
                name="password"
                required
                fullWidth
                id="password"
                onChange={handleSetPassword}
                label="Password"
                autoFocus
                type="password"
                value={user.password}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="password"
                onChange={handleSetPassword}
                id="confirmPassword"
                label="confirmPassword"
                name="confirmPassword"
                value={user.confirmPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            onClick={handleReset}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Set password
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
