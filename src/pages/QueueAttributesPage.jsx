import { useState, useEffect } from "react";
import {
  Button,
  FormHelperText,
  IconButton,
  InputLabel,
  FilledInput,
  InputAdornment,
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
  Skeleton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils";
import PurgeQueue from "../components/PurgeQueue";
const QueueAttributes = () => {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [environment, setEnvironment] = useState("Dev");
  const [attributes, setAttributes] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleToggleChange = (event, newEnvironment) => {
    setEnvironment(newEnvironment);
  };
  const handleClickShowApiKey = () => setShowApiKey((show) => !show);

  const handleMouseDownApiKey = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    //get api key from local storage
    const apiKey = localStorage.getItem("apiKey");
    if (apiKey) {
      setApiKey(apiKey);
    }
  }, []);

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
    //save api key to local storage
    localStorage.setItem("apiKey", event.target.value);
  };

  const clearCounts = () => {
    setAttributes({
      ApproximateNumberOfMessages: "0",
      ApproximateNumberOfMessagesNotVisible: "0",
    });
  };

  const mutation = useMutation({
    mutationFn: () => {
      return axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/queue-attributes`, {
        apiKey,
        environment,
      });
    },
    onSuccess: (response) => {
      const { data } = response;
      setAttributes(data.attributes);
    },
    onError: (error) => {
      const { status, data } = error.response;
      setErrorMessage(data.error);
    },
    onMutate: () => {
      setErrorMessage("");
      setAttributes(null);
    },
  });

  return (
    <div className="bg-slate-50 h-fit p-8 grid gap-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h1 className="text-5xl font-bold text-slate-600 ">Queue Attributes</h1>
      <div className="flex gap-4">
        <ToggleButtonGroup
          className="h-14"
          color="primary"
          value={environment}
          exclusive
          onChange={handleToggleChange}
          aria-label="Platform"
        >
          <ToggleButton value="Dev">Dev</ToggleButton>
          <ToggleButton value="Cert">Cert</ToggleButton>
          <ToggleButton value="Prod">Prod</ToggleButton>
        </ToggleButtonGroup>
        <FormControl className="w-72" variant="filled">
          <InputLabel htmlFor="api-key-input">API Key</InputLabel>
          <FilledInput
            id="api-key-input"
            type={showApiKey ? "text" : "password"}
            onChange={handleApiKeyChange}
            value={apiKey}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle api key visibility"
                  onClick={handleClickShowApiKey}
                  onMouseDown={handleMouseDownApiKey}
                  edge="end"
                >
                  {showApiKey ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="API Key"
          />
          <FormHelperText error>{errorMessage}</FormHelperText>
        </FormControl>
        <Button className="h-14 w-32" variant="outlined" disabled={mutation.isPending} onClick={mutation.mutate}>
          {mutation.isPending && <Loader2 className="animate-spin mr-2" />}
          Submit
        </Button>
      </div>
      {attributes && !mutation.isPending && <AttributesDisplay attributes={attributes} />}
      {mutation.isPending && (
        <div className="grid gap-4">
          <Skeleton variant="rounded" className="w-full" height={42} />
          <Skeleton variant="rounded" className="w-full" height={42} />
        </div>
      )}
      {attributes && !mutation.isPending && environment !== "Prod" && (
        <PurgeQueue apiKey={apiKey} environment={environment} clearCounts={clearCounts} />
      )}
    </div>
  );
};

const StatusDisplay = ({ label, value, condition }) => {
  return (
    <div
      className={cn("rounded py-2 px-8 flex justify-between items-center border border-slate-300", {
        "bg-green-100": condition === "0",
        "bg-rose-200": condition !== "0",
      })}
    >
      <span className="font-semibold text-slate-600 text-lg">{label}</span>
      <span className="font-bold text-slate-500 text-xl">{value}</span>
    </div>
  );
};

const AttributesDisplay = ({ attributes }) => {
  return (
    <div className="grid gap-2">
      <StatusDisplay
        label="Messages in queue:"
        value={attributes.ApproximateNumberOfMessages}
        condition={attributes.ApproximateNumberOfMessages}
      />
      <StatusDisplay
        label="Messages in flight:"
        value={attributes.ApproximateNumberOfMessagesNotVisible}
        condition={attributes.ApproximateNumberOfMessagesNotVisible}
      />
      {/* Add more StatusDisplay components for other attributes */}
    </div>
  );
};
export default QueueAttributes;
