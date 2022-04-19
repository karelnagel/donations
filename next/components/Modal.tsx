import { CircularProgress, IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function Modal({ children, onClose, visible }: { children: any; onClose: any; visible: boolean }) {
  return !visible ? (
    <div></div>
  ) : (
    <div className={`fixed top-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-black z-10`}>
      <div className="bg-white rounded-lg p-10 flex flex-col items-center max-w-md relative">
        <IconButton aria-label="close" onClick={onClose} className="!absolute right-0 top-0">
          <CloseIcon />
        </IconButton>
        {children}
      </div>
    </div>
  );
}
