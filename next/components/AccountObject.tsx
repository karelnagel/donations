import { Avatar, Chip } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useEnsName, useEnsAvatar } from "wagmi";

export function AccountObject({ account }: { account: string }) {
  const { data: name } = useEnsName({ address: account });
  const { data: avatar } = useEnsAvatar({ addressOrName: account });

  return (
    <Link href={`/accounts/${account}`} passHref>
      <Chip
        label={name}
        component="a"
        variant="filled"
        color="primary"
        clickable
        size="medium"
        avatar={avatar ? <Avatar alt={name ?? account} src={avatar} /> : undefined}
      />
    </Link>
  );
}
