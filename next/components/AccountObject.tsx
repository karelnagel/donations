import { Avatar, Chip } from "@mui/material";
import React from "react";
import useENS from "../hooks/useENS";

export function AccountObject({ account }: { account: string }) {
  const { name, avatar } = useENS(account);

  return (
    <Chip
      label={name}
      component="a"
      href={`/accounts/${account}`}
      variant="filled"
      color="primary"
      clickable
      size="medium"
      avatar={<Avatar alt={name} src={avatar} />}
    />
  );
}
