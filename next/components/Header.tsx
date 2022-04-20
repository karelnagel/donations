import Link from "next/link";
import React, { useContext } from "react";
import { short } from "../idk/helpers";
import useWeb3Modal from "../hooks/useWeb3Modal";
import { Context } from "../idk/context";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Logout } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { network } from "../config";

export default function Header() {
  const { loadWeb3Modal, logoutOfWeb3Modal } = useWeb3Modal();
  const { user } = useContext(Context);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (user) setAnchorEl(event.currentTarget);
    else loadWeb3Modal();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <header className="w-full shadow-md hover:bg-gray-50 duration-300">
        <div className="flex justify-between max-w-screen-lg items-center m-auto p-2 ">
          <h3 className="logo">
            <Link href="/">Streamint</Link>
          </h3>
          <div
            className="bg-primary flex px-1 items-center rounded-3xl hover:bg-primaryDark shadow-xl duration-300 text-white font-bold h-12 cursor-pointer"
            onClick={handleClick}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <div className="mx-4">{user ? user.name ?? short(user.address) : "Connect Wallet"}</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {user?.avatar && <img src={user.avatar} className="rounded-full h-10 w-10 object-cover " alt="" />}
          </div>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Link href={`/accounts/${user?.address}?tab=0`} passHref>
              <MenuItem>My collections</MenuItem>
            </Link>
            <Link href={`/accounts/${user?.address}?tab=1`} passHref>
              <MenuItem>My projects</MenuItem>
            </Link>
            <Link href={`/accounts/${user?.address}?tab=2`} passHref>
              <MenuItem>My donations</MenuItem>
            </Link>
            <Divider />

            <Link href={`/new`} passHref>
              <MenuItem>
                <ListItemIcon>
                  <AddIcon fontSize="small" />
                </ListItemIcon>
                Start new collection
              </MenuItem>
            </Link>
            <MenuItem onClick={() => logoutOfWeb3Modal()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </header>
      {user && network.chainId !== user?.chainId && (
        <div className="w-full py-2 bg-primary text-center text-white font-bold">Wrong network, use {network.name}!</div>
      )}
    </div>
  );
}
