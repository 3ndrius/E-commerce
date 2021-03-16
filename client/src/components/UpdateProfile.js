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
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import {
  requestUpdateUserProfile,
  clearErrors,
  requestLoadUser,
  requestUpdateUserProfileReset,
} from "../actions/userActions";
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
export default function ProfileUpdate({ history }) {
  const classes = useStyles();

  const { user } = useSelector((state) => state.auth);
  const { isUpdated, loading, error } = useSelector((state) => state.user);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [prevAvatar, setPrevAvatar] = React.useState("");

  const dispatch = useDispatch();

  const onChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPrevAvatar(reader.result);
        setAvatar(reader.result)
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", avatar);
    dispatch(requestUpdateUserProfile(formData));
  };
  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPrevAvatar(user.avatar.url)
    }
    if (error) {
      toast.error("Fail to update profile");
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile updated successfully");
      dispatch(requestLoadUser());
      history.push("/profile");
      dispatch(requestUpdateUserProfileReset());
    }
  }, [dispatch, toast, error, history, isUpdated]);

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
          Update Profile
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
                name="firstName"
                required
                fullWidth
                id="name"
                onChange={(e) => setName(e.target.value)}
                label="First Name"
                autoFocus
                value={name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                label="Email Address"
                name="email"
                value={email}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <input
                color="primary"
                accept="image/*"
                type="file"
                src={prevAvatar}
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
            <Grid item xs={12} md={7}>
              <Avatar
                alt="Remy Sharp"
                src={prevAvatar}
                style={{ height: "300px", width: "300px" }}
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
