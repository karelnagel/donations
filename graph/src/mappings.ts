import { BigInt, log, ipfs, json, TypedMap, JSONValue } from "@graphprotocol/graph-ts"
import {
  Donations,
  NewToken
} from "../generated/Donations/Donations"

import {
  NewDonation,
  End,
  OwnershipTransferred,
  CashOut,
  SetContractURI,
  NewProject
} from "../generated/templates/DonationsToken/DonationsToken"
import { Token, Donation, Project } from "../generated/schema"
import { DonationsToken } from '../generated/templates'

export function handleNewToken(event: NewToken): void {
  const tokenId = event.params.token.toHexString()
  let token = new Token(tokenId)

  token.title = event.params.title
  token.token = event.params.token;
  token.coin = event.params.coin;
  token.owner = event.params.owner
  token.contractURI = event.params.contractURI
  token.active = true;
  token.donated = new BigInt(0);
  token.withdrawn = new BigInt(0);
  token.currentProject = 0
  token.time = event.block.timestamp;

  const project = new Project(getProjectId(tokenId, "0"));
  project.image = event.params.image;
  project.order = 0;
  project.token = tokenId
  project.time = event.block.timestamp

  project.save()
  token.save()
  DonationsToken.create(event.params.token)
  log.info("Project with id {} created! ", [event.params.token.toHexString()])
}

export function handleSetContractURI(event: SetContractURI): void {
  const token = getToken(event.address.toHexString())
  if (!token) return

  token.contractURI = event.params.contractURI

  token.save()
}

export function handleNewProject(event: NewProject): void {
  const token = getToken(event.address.toHexString())
  if (!token) return

  token.currentProject++;
  const project = new Project(getProjectId(token.id, token.currentProject.toString()))
  project.image = event.params.image;
  project.order = token.currentProject;
  project.token = token.id;
  project.time = event.block.timestamp;

  token.save()
  project.save()
}

export function handleCashOut(event: CashOut): void {
  const token = getToken(event.address.toHexString())
  if (!token) return

  token.withdrawn = token.withdrawn.plus(event.params.amount);

  token.save()
}
export function handleEnd(event: End): void {
  const token = getToken(event.address.toHexString())
  if (!token) return

  token.active = false;

  token.save()
}


export function handleDonation(event: NewDonation): void {
  const token = getToken(event.address.toHexString())
  if (!token) return

  const project = getProject(getProjectId(token.id, event.params.projectId.toString()))
  if (!project) return

  const donation = new Donation(event.transaction.hash.toHexString())
  donation.amount = event.params.amount
  donation.message = event.params.message
  donation.sender = event.params.sender
  donation.project = project.id
  donation.time = event.block.timestamp
  donation.save()

  project.donated = project.donated.plus(event.params.amount)
  project.save()
  
  token.donated = token.donated.plus(event.params.amount)
  token.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const token = getToken(event.address.toHexString())
  if (!token) return

  token.owner = event.params.newOwner

  token.save();
}

function getToken(id: string): Token | null {
  const token = Token.load(id)
  if (!token) {
    log.error("No token with {}", [id])
    return null;
  }
  return token;
}
function getProjectId(tokenId: string, projectId: string): string {
  return tokenId + "_" + projectId;
}

function getProject(id: string): Project | null {
  const project = Project.load(id)
  if (!project) {
    log.error("No project with {}", [id])
    return null;
  }
  return project;
}