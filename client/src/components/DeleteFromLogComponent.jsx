import React, { useContext } from "react";
import userContext from "../utils/userContext";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from "@mui/material/Typography";

// TODO: make it look like Merve's 'delete' button

// TODO: how do I refresh the movie log info on the page once item has been deleted?

const DeleteFromLogComponent = ({ movie }) => {
    const { userInfo, databaseCall, setRefetchDb, refetchDb } = useContext(userContext);
    const deleteUrl = "http://localhost:8080/log";

    const deletePayload = {
        userId: userInfo.id,
        movieId: movie.id
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteFromLog = () => {
        databaseCall.delete(deleteUrl, {
            data: deletePayload
          })
            .then((response) => {
                console.log("Response from back end: ", response);
                handleClose();
                setRefetchDb(!refetchDb);
            })
            .catch((error) => {
                console.error("Error while calling back end: ", error);
                // TODO: display error message to user? can I display this in the dialog?
                handleClose();
            });
    };


    return (
        <React.Fragment>
            <Button
            size="small"
            onClick={handleClickOpen}
            variant="contained"
            sx={{ 
                width: "5rem", 
                padding: "0",
                color: "primary",
                "&:hover": {
                    backgroundColor: "#D92F2F",
                    color: "white"
                }
            }}
            >
                <Typography sx={{ fontSize: "0.75rem"}}>Remove</Typography>
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title" align="left">
                {"Are you sure?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" align="left">
                    {movie.title} will be permanently deleted from your log.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={deleteFromLog}>Delete</Button>
                <Button onClick={handleClose} autoFocus>
                    Cancel
                </Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default DeleteFromLogComponent;