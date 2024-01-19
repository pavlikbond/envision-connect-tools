import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Markdown from "react-markdown";
import md1 from "/part1.md?url";
import md2 from "/part2.md?url";
import md3 from "/part3.md?url";
import md4 from "/part4.md?url";
const Overview = () => {
  const [data1, setData1] = useState("");
  const [data2, setData2] = useState("");
  const [data3, setData3] = useState("");
  const [data4, setData4] = useState("");

  useEffect(() => {
    fetch("https://public-client-guide.s3.us-west-1.amazonaws.com/part1.md")
      .then((res) => res.text())
      .then((data) => setData1(data));
    // fetch(md1)
    //   .then((res) => res.text())
    //   .then((data) => setData1(data));
    // fetch(md2)
    //   .then((res) => res.text())
    //   .then((data) => setData2(data));
    // fetch(md3)
    //   .then((res) => res.text())
    //   .then((data) => setData3(data));
    // fetch(md4)
    //   .then((res) => res.text())
    //   .then((data) => setData4(data));
    fetch("https://public-client-guide.s3.us-west-1.amazonaws.com/part2.md")
      .then((res) => res.text())
      .then((data) => setData2(data));
    fetch("https://public-client-guide.s3.us-west-1.amazonaws.com/part3.md")
      .then((res) => res.text())
      .then((data) => setData3(data));
    fetch("https://public-client-guide.s3.us-west-1.amazonaws.com/part4.md")
      .then((res) => res.text())
      .then((data) => setData4(data));
  }, []);

  return (
    <div className="my-20 markdown mx-auto">
      <Container maxWidth="lg">
        <div className="grid gap-8">
          <div className="rounded shadow-sm bg-slate-50 p-4 grid">
            <Markdown>{data1}</Markdown>
          </div>
          <div className="rounded shadow-sm bg-slate-50 p-4 grid">
            <Markdown>{data2}</Markdown>
          </div>
          <div className="rounded shadow-sm bg-slate-50 p-4 grid">
            <Markdown>{data3}</Markdown>
          </div>
          <div className="rounded shadow-sm bg-slate-50 p-4 grid">
            <Markdown>{data4}</Markdown>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Overview;
