import Link from "next/link";
import React from "react";
import { short } from "../idk/helpers";
import { CircularProgress, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Logout } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { network } from "../config";
import Logo from "./Logo";
import Button from "./Button";
import { useConnect, useDisconnect, useAccount, useNetwork, useEnsName, useEnsAvatar } from "wagmi";

export default function Header() {
  const { connect, connectors, isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: account } = useAccount();
  const { activeChain, switchNetwork } = useNetwork();
  const { data: name } = useEnsName({ address: account?.address });
  const { data: avatar } = useEnsAvatar({ addressOrName: account?.address });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="absolute top-0 z-20 w-full">
      {account && network.chainId !== activeChain?.id && (
        <div
          onClick={() => switchNetwork!(network.chainId)}
          className="cursor-pointer w-full py-2 bg-primary text-center text-white font-bold absolute"
        >
          Wrong network! Click to switch to {network.name}
        </div>
      )}
      <header className="w-full mt-10">
        <div className="flex justify-between max-w-screen-lg items-center m-auto p-2">
          <Logo />
          <div aria-controls={open ? "account-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined}>
            <Button onClick={handleClick}>
              <div className="mx-4">{account ? name ?? short(account.address) : isConnecting ? <CircularProgress /> : "Connect Wallet"}</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {avatar && <img src={avatar} className="rounded-full h-10 w-10 object-cover " alt="" />}
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
            {account ? (
              <div>
                <Link href={`/accounts/${account?.address}?tab=0`} passHref>
                  <MenuItem>My collections</MenuItem>
                </Link>
                <Link href={`/accounts/${account?.address}?tab=1`} passHref>
                  <MenuItem>My donations</MenuItem>
                </Link>
                <Link href={`/accounts/${account?.address}?tab=2`} passHref>
                  <MenuItem>My supported collections</MenuItem>
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
                <MenuItem onClick={() => disconnect()}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </div>
            ) : (
              <div>
                {connectors.map((c) => (
                  <MenuItem key={c.id} onClick={() => connect(c)}>
                    {c.name}
                  </MenuItem>
                ))}
              </div>
            )}
          </Menu>
        </div>
      </header>
    </div>
  );
}
