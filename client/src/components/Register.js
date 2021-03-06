import * as React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import { requestRegisterUser } from "../actions/userActions";
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
export default function SignUp({ history }) {
  const classes = useStyles();

  const [user, setUser] = React.useState({ name: "", email: "", password: "" });
  const [avatar, setAvatar] = React.useState(null);

  const dispatch = useDispatch();
  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleForm = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", user.name);
    formData.set("email", user.email);
    formData.set("password", user.password);
    formData.set("avatar", avatar);
    dispatch(requestRegisterUser(formData));
  };
  React.useEffect(() => {
    if (error) toast.error(error);

    if (isAuthenticated) history.push("/");
  }, [dispatch, isAuthenticated, toast, error]);

  return (
    <Container component="main" maxWidth="xs">
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
          Sign up
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
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                required
                fullWidth
                id="name"
                onChange={handleForm}
                label="First Name"
                autoFocus
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={handleForm}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={handleForm}
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={6}>
              <input
                color="primary"
                accept="image/*"
                type="file"
                onChange={onChange}
                id="icon-button-file"
                style={{ display: "none" }}
              />
              <label htmlFor="icon-button-file">
                <Button
                  variant="contained"
                  component="span"
                  className={classes.button}
                  size="large"
                  color="primary"
                >
                  {" "}
                  Upload
                </Button>
              </label>
            </Grid>
            <Grid item xs={6}>
              <Avatar alt="Remy Sharp" src={avatar} className={classes.large} />
            </Grid>
          </Grid>
          <Button
            type="submit"
            onClick={handleRegister}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading ? true : false}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={"/login"} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
