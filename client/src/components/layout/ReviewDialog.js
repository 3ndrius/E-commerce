import * as React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Rating from "@material-ui/core/Rating";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { useDispatch } from "react-redux";
import { submitReviewRequest } from "../../actions/productActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  rate: {
    height: 10,
  },
}));
export default function ReviewDialog({productId}) {

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(2);
  const [reviews, setReviews] = React.useState({productId, ratings: value, comment: "" });
  const dispatch = useDispatch();

  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    
    dispatch(submitReviewRequest({...reviews, ratings:value}));
    setOpen(false);
    console.log(reviews)
  };

  const handleChange = (e) => {
    setReviews({ ...reviews, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Submit review
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <Box
            component="fieldset"
            mb={1}
            borderColor="transparent"
            className={classes.rate}
          >
             <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
          </Box>
        </DialogTitle>
        <DialogContent style={{ width: "400px" }}>
          <FormControl
            style={{
              padding: "0 15px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <TextField
              id="comment"
              label="Post your review"
              multiline
              maxRows={4}
              value={reviews.comment}
              onChange={handleChange}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            style={{ margin: "10px 30px 20px 0" }}
          >
            Add review
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
