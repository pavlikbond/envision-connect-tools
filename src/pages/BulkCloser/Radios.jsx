import { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Radios = ({ setEnvironment, setVersion, setState, environment, version, state }) => {
  const [allowProd, setAllowProd] = useState(false);
  const { role } = useUser();
  const [open, setOpen] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [confirmValue, setConfirmValue] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setAllowProd(role === "developer");
  }, [role]);

  function openModal(e) {
    if (environment === "Prod") {
      return;
    }
    e.preventDefault();
    handleClickOpen();
  }

  function handleConfirmInput() {
    setConfirmError(false);
    if (confirmValue.toLocaleLowerCase() !== "confirm") {
      setConfirmError(true);
    } else {
      handleClose();
      setEnvironment("Prod");
      setConfirmValue("");
    }
  }
  return (
    <div className={`radios-container flex justify-between`}>
      {/* <Modal setEnvironment={setEnvironment} modalState={modalState} setModalState={setModalState} /> */}
      <ToggleButtonGroup value={environment} exclusive onChange={(e) => setEnvironment(e.target.value)} color="primary">
        <ToggleButton value="Test" aria-label="left aligned">
          Test
        </ToggleButton>
        <ToggleButton value="Prod" aria-label="centered" onClick={openModal} disabled={!allowProd}>
          Prod
        </ToggleButton>
      </ToggleButtonGroup>

      <ToggleButtonGroup value={version} exclusive onChange={(e) => setVersion(e.target.value)} color="primary">
        <ToggleButton value="V1" aria-label="left aligned">
          v1
        </ToggleButton>
        <ToggleButton value="V2" aria-label="centered">
          v2
        </ToggleButton>
      </ToggleButtonGroup>

      <ToggleButtonGroup value={state} exclusive onChange={(e) => setState(e.target.value)} color="primary">
        <ToggleButton value="resolve" aria-label="left aligned">
          Resolve
        </ToggleButton>
        <ToggleButton value="cancel" aria-label="centered">
          Cancel
        </ToggleButton>
      </ToggleButtonGroup>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-red-500 !text-3xl">Stop!</DialogTitle>
        <DialogContent>
          <div className="grid gap-4">
            <DialogContentText>
              You selected the <span className="inline-block bg-red-100 px-2 rounded">production </span> environment.
            </DialogContentText>
            <DialogContentText>
              Type <span className="inline-block px-2 rounded bg-slate-200">confirm</span> and click{" "}
              <span className="font-bold">Ok</span> to proceed.
            </DialogContentText>
            <input
              onChange={(e) => {
                setConfirmValue(e.target.value);
                setConfirmError(false);
              }}
              type="text"
              value={confirmValue}
              placeholder="Type here..."
              className={`input input-bordered w-full max-w-xs mt-2 ${confirmError && "input-error"}`}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button className="btn" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn bg-green-300" onClick={handleConfirmInput}>
            OK
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Radios;
