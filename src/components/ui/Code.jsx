import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyButton from "./CopyButton";
const Code = ({ children, ...rest }) => {
  let clipBoardData = children["props"]["children"];

  //detect the language type
  const language = children["props"]["className"]?.replace("lang-", "");
  if ("type" in children && children["type"] === "code") {
    return (
      <div className="mb-4">
        <CopyButton data={clipBoardData} />
        <SyntaxHighlighter className="rounded-lg overflow-hidden" language={language} style={coldarkDark}>
          {children["props"]["children"]}
        </SyntaxHighlighter>
      </div>
    );
  }
  return <pre {...rest}>{children}</pre>;
};

export default Code;
