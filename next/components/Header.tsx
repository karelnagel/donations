import Link from "next/link";
import React, { useContext } from "react";
import { short } from "../idk/helpers";
import useWeb3Modal from "../hooks/useWeb3Modal";
import { Context } from "../idk/context";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Logout } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { network } from "../config";
import Logo from "./Logo";
import Button from "./Button";

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
    <div className="absolute top-0 z-20 w-full">
      {user && network.chainId !== user?.chainId && (
        <div className="w-full py-2 bg-primary text-center text-white font-bold absolute">Wrong network, use {network.name}!</div>
      )}
      <header className="w-full mt-10">
        <div className="flex justify-between max-w-screen-lg items-center m-auto p-2">
          <Logo />
          <div
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Button onClick={handleClick}>
              <div className="mx-4">{user ? user.name ?? short(user.address) : "Connect Wallet"}</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {user?.avatar && <img src={user.avatar} className="rounded-full h-10 w-10 object-cover " alt="" />}
            </Button>
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
    </div>
  );
}
