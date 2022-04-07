import { Avatar, Chip } from "@mui/material";
import Link from "next/link";
import React from "react";
import useENS from "../hooks/useENS";

export function AccountObject({ account }: { account: string }) {
  const { name, avatar } = useENS(account);

  return (
    <Link href={`/accounts/${account}`} passHref>
    <Chip
      label={name}
      component="a"
      variant="filled"
      color="primary"
      clickable
      size="medium"
      avatar={<Avatar alt={name} src={avatar} />}
    />
    </Link>  
  );
}
