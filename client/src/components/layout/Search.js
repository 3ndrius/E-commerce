import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const useStyle = makeStyles((theme) => ({
  search: {
    position: "relative",
    height: 38,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.black, 0.05),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    paddingLeft: 43,
    fontSize: 26,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    left: "0",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

const Search = ({ history }) => {
  const classes = useStyle();
  const [keyword, setKeyword] = React.useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) history.push(`/search/${keyword}`);
    else history.push("/");
  };
  return (
    <form className={classes.search}>
      <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
      <InputBase
        placeholder="Search…"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
      />
      <Button
        color="secondary"
        type="submit"
        onClick={handleSearch}
        variant="outlined"
      >
        Search
      </Button>
    </form>
  );
};

export default Search;
