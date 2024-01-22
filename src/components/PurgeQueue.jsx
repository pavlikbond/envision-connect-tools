import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CheckCircleIcon, Loader2 } from "lucide-react";
import ErrorIcon from "@mui/icons-material/Error";

const PurgeQueue = ({ apiKey, environment, clearCounts }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mutation = useMutation({
    mutationFn: () => {
      return axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/queue-attributes`, {
        apiKey,
        environment,
        purge: true,
      });
    },
    onSuccess: (response) => {
      const { data } = response;
      clearCounts();
    },
    onError: (error) => {
      const { status, data } = error.response;
      setError(data.error);
    },
    onMutate: () => {
      setError(null);
    },
  });

  const handlePurge = () => {
    handleClose();
    mutation.mutate();
  };

  return (
    <div className=" flex w-full items-center gap-4">
      <Button className="w-44 h-10" variant="contained" onClick={handleClickOpen} disabled={mutation.isPending}>
        {mutation.isPending ? <Loader2 className="animate-spin mr-2" /> : "Purge Queue"}
      </Button>
      {mutation.isSuccess && (
        <div className="text-emerald-500 text-lg font-semibold flex items-center shadow bg-white border-l-4 border-emerald-600 p-2 w-full rounded">
          <CheckCircleIcon className="mr-4 text-emerald-500" />
          Success!
        </div>
      )}

      {error && (
        <div className="flex gap-2 items-center border-l-4 border-red-500 text-red-500 shadow bg-white p-2 w-full rounded">
          <ErrorIcon />
          <span>{error}</span>
        </div>
      )}

      <AlertDialog open={open} handleClose={handleClose} handlePurge={handlePurge} />
    </div>
  );
};

function AlertDialog({ open, handleClose, handlePurge }) {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Purge Queue"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to purge the following queue permanently? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handlePurge} autoFocus>
            Purge
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PurgeQueue;
