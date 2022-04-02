import Link from "next/link";
import React from "react";

export function AccountObject({ account }: { account: string }) {
  return (
    <div className="box">
      <Link href={`/accounts/${account}`}>
        <a>
          <h2>{account}</h2>
        </a>
      </Link>
    </div>
  );
}
