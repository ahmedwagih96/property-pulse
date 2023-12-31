import { useState } from "react";
import { FaShare } from "react-icons/fa";
function ShareButton() {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <div
        className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        }}
      >
        <FaShare className="text-slate-500" />
      </div>
      {copied && (
        <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
          Link copied!
        </p>
      )}
    </>
  );
}

export default ShareButton;
