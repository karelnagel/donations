import Link from "next/link";
import React from "react";
import { Contract } from "../graphql/generated";
import { AccountObject } from "./AccountObject";

export function ContractObject({ contract }: { contract: Contract }) {
  return (
    <div className="box">
      <Link href={`/projects/${contract.id}`}>
        <a>
          <h2>{contract.id}</h2>
          <AccountObject account={contract.owner.id} />
        </a>
      </Link>
    </div>
  );
}
