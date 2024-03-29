import { React, useState, useEffect, useRef } from "react";
// import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillStopFill, BsFillPlayFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

const QueueReaderPage = ({ data }) => {
  const [queueReaderCards, setQueueReaderCards] = useState([0]);
  const [companyDataList, setCompanyDataList] = useState([]);

  useEffect(() => {
    if (data.length) {
      setCompanyDataList(data);
    }
  }, [data]);

  function addCard() {
    if (queueReaderCards.length === 4) {
      return;
    }
    setQueueReaderCards([...queueReaderCards, queueReaderCards.length]);
  }

  function deleteQueueCard(id) {
    let cards = queueReaderCards.filter((item) => {
      return item !== id;
    });

    setQueueReaderCards(cards);
  }
  return (
    <div className="flex flex-col gap-8 m-6 ml-[128px]">
      <button className="btn btn-info w-36 text-slate-700" onClick={() => addCard()}>
        Add
      </button>
      <div className="flex flex-wrap gap-12">
        {queueReaderCards.map((id) => {
          return (
            <QueueReaderCard key={id} id={id} deleteQueueCard={deleteQueueCard} companyDataList={companyDataList} />
          );
        })}
      </div>
    </div>
  );
};

const QueueReaderCard = ({ id, deleteQueueCard, companyDataList }) => {
  const [company, setCompany] = useState({});
  const [inQueue, setInQueue] = useState(0);
  const inQueueRef = useRef(0);
  const [inFlight, setInFlight] = useState(0);
  const [alignment, setAlignment] = useState("Dev");
  const [readQueue, setReadQueue] = useState(false);
  const [interval, updateInterval] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timeLeftInterval, setTimeLeftInterval] = useState(60);
  const [inCountDown, setInCountDown] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const [error, setError] = useState("");
  const startTime = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    function fitText() {
      const containerWidth = containerRef.current.offsetWidth;
      const fitTextElement = containerRef.current.querySelector(".fit-text");
      const originalFontSize = parseFloat(getComputedStyle(fitTextElement).fontSize);
      let fontSize = originalFontSize;
      let textWidth = fitTextElement.scrollWidth;

      while (textWidth > containerWidth) {
        console.log(textWidth, containerWidth);
        fontSize -= 1;
        fitTextElement.style.fontSize = `${fontSize}px`;
        textWidth = fitTextElement.scrollWidth;
      }

      // Optional: Reset font size to original if text becomes shorter
      if (textWidth < containerWidth && fontSize < originalFontSize) {
        fitTextElement.style.fontSize = `${originalFontSize}px`;
      }
    }

    fitText();
  }, [inQueue]);

  let stopInterval = () => {
    if (interval) {
      clearInterval(interval);
    }
  };

  function updateTimeLeft(qty) {
    if (qty < inQueueRef.current) {
      setTimeLeft(timeLeftInterval);
    }
  }

  function checkStop() {
    let now = Date.now();
    let minSinceStart = (now - startTime.current) / 1000;
    //stop reading queue after 30 minutes in case someone forgot
    if (minSinceStart > 30 * 60) {
      setReadQueue(false);
      setError("Stopped reading queue after 30 minutes");
      setInQueue(0);
      setInFlight(0);
    }
  }

  useEffect(() => {
    setTimeLeft(timeLeftInterval);
    if (readQueue) {
      startTime.current = Date.now();
      let interval = setInterval(() => {
        setTimeLeft((timeLeft) => {
          return timeLeft > 0 ? timeLeft - 1 : timeLeftInterval;
        });
        checkStop();
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [readQueue]);

  useEffect(() => {
    stopInterval();

    if (readQueue) {
      if (Object.keys(company).length === 0) {
        setError("Please select a company");
        setCompanyError(true);
        setReadQueue(false);
        return;
      }
      if (error) {
        setError("");
        setCompanyError(false);
      }
      let url;
      switch (alignment) {
        case "Prod":
          url = company.prod;
          break;
        case "Dev":
          url = company.dev;
          break;
        case "Cert":
          url = company.cert;
          break;

        default:
          url = company.dev;
          break;
      }

      let i = setInterval(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/queueMessages?queueUrl=${url}`, {
          headers: {
            "x-api-key": import.meta.env.VITE_REACT_APP_API_KEY,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            updateTimeLeft(data.available);
            setInQueue(data.available);
            inQueueRef.current = data.available;
            setInFlight(data.inFlight);
          })
          .catch((err) => {
            setError("Error connecting to API");
          });
      }, 1000);
      updateInterval(i);
    }
  }, [readQueue, company, alignment]);

  const handleChange = (event) => {
    stopInterval();
    let companyObject = companyDataList.find((data) => {
      return data.company === event.target.value;
    });
    setCompany(companyObject);
  };

  return (
    <div className=" bg-white shadow-lg rounded-xl h-fit p-8 flex flex-col gap-5 relative">
      {id !== 0 && (
        <AiFillCloseCircle
          className="absolute right-2 top-2 hover:scale-110 transition-all cursor-pointer text-slate-600"
          size={36}
          onClick={() => deleteQueueCard(id)}
        ></AiFillCloseCircle>
      )}
      <div className="flex gap-3">
        {/* <Box sx={{ minWidth: 120, background: "white", borderRadius: "5px" }}> */}
        <div className="bg-white rounded min-w-[120px]">
          <FormControl fullWidth error={companyError}>
            <InputLabel id="company-label">Company</InputLabel>
            <Select labelId="company-label" value={company?.company || ""} label="Companies" onChange={handleChange}>
              {companyDataList.length === 0 && <ImSpinner2 className="animate-spin text-4xl mx-auto text-purple-600" />}
              {companyDataList.length > 0 &&
                companyDataList.map((company) => {
                  return (
                    <MenuItem value={company?.company} key={company?.company}>
                      {company?.company}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </div>
        {/* </Box> */}
        <ColorToggleButton alignment={alignment} setAlignment={setAlignment} company={company} />
      </div>
      <div className="flex gap-3">
        <div className={(inQueue > 0 ? "queue-card-red" : "queue-card-green") + " container"} ref={containerRef}>
          <h2 className="text-2xl font-bold text-slate-700">In Queue</h2>
          <p className="text-6xl font-bold text-slate-700 fit-text whitespace-nowrap">{inQueue}</p>
        </div>
        <div className={inFlight > 0 ? "queue-card-red" : "queue-card-green"}>
          <h2 className="text-2xl font-bold text-slate-700">In Flight</h2>
          <div className="text-6xl font-bold text-slate-700">{inFlight}</div>
        </div>
        <div className="queue-card flex flex-col justify-between">
          <h2 className="text-2xl font-bold text-slate-700">Time Left</h2>
          <div className="text-4xl font-bold text-slate-700 mb-2">{timeLeft}s</div>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          className="btn btn-info shadow-md text-slate-600"
          onClick={() => {
            setReadQueue(true);
            if (!inCountDown) {
              setInCountDown(true);
            }
          }}
          disabled={readQueue}
        >
          {readQueue && <ImSpinner2 className="animate-spin" />}
          {!readQueue && <BsFillPlayFill size={20} className="mr-2" />}
          {readQueue ? "Reading" : "Start"}
        </button>
        <button
          className="btn btn-error text-slate-600"
          onClick={() => {
            setReadQueue(false);
            stopInterval();
            setTimeout(() => {
              setInQueue(0);
              setInFlight(0);
            }, 1000);
          }}
          disabled={!readQueue}
        >
          <BsFillStopFill size={20} className="mr-2" />
          Stop
        </button>
      </div>

      {error && <div className="bg-red-400 text-white px-2 py-1 rounded-md text-lg">{error}</div>}
    </div>
  );
};

const ColorToggleButton = ({ alignment, setAlignment, company }) => {
  //const [alignment, setAlignment] = useState("Dev");

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      className="h-14 shadow-md"
      sx={{
        background: "white",
      }}
    >
      <ToggleButton value="Prod">Prod</ToggleButton>
      <ToggleButton value="Dev">Dev</ToggleButton>
      <ToggleButton value="Cert">Cert</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default QueueReaderPage;
