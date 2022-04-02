import { BigInt, log } from "@graphprotocol/graph-ts"
import { NewContract, SetURI } from "../generated/Factory/Factory"
import {
  End,
  OwnershipTransferred,
  NewProject,
  NewToken
} from "../generated/templates/Donations/Donations"
import { Token, Project, Contract, Account, Title } from "../generated/schema"
import { Donations } from '../generated/templates'

export function handleNewContract(event: NewContract): void {
  const title = new Title(event.params.token.toHexString())
  title.title = event.params.title;
  title.save()

  let contract = new Contract(event.params.title)
  contract.address = event.params.token
  contract.time = event.block.timestamp
  contract.contractURI = "" // Todo get 

  const owner = new Account(event.params.owner.toHexString())
  contract.owner = owner.id
  owner.save()

  contract.save()

  const project = new Project(getProjectId(event.params.title, "0"));
  project.count = new BigInt(0);
  project.donated = new BigInt(0);
  project.donationCount = 0;
  project.coin = event.params.coin;
  project.active = true;
  project.contract = event.params.title;
  project.time = event.block.timestamp;

  const projectOwner = new Account(event.params.projectOwner.toHexString())
  project.owner = projectOwner.id
  owner.save()

  project.save()

  Donations.create(event.params.token)
}

export function handleSetURI(event: SetURI): void {
  // Todo
}

export function handleNewProject(event: NewProject): void {
  const title = Title.load(event.address.toHexString())
  if (!title) {
    log.error("No title with {}", [event.address.toHexString()])
    return;
  }

  const project = new Project(getProjectId(title.title, event.params.id.toString()))
  project.count = event.params.id;
  project.donated = new BigInt(0);
  project.coin = event.params.coin;
  project.active = true;
  project.contract = title.title;
  project.time = event.block.timestamp;
  project.donationCount = 0;

  const owner = new Account(event.params.projectOwner.toHexString())
  project.owner = owner.id
  owner.save()

  project.save()
}


export function handleEnd(event: End): void {
  const title = Title.load(event.address.toHexString())
  if (!title) {
    log.error("No title with {}", [event.address.toHexString()])
    return;
  }

  const projectId = getProjectId(title.title, event.params.id.toString())
  const project = Project.load(projectId)
  if (!project) {
    log.error("No project with {}", [projectId])
    return;
  }
  project.active = false;

  project.save()
}


export function handleNewToken(event: NewToken): void {
  const title = Title.load(event.address.toHexString())
  if (!title) {
    log.error("No title with {}", [event.address.toHexString()])
    return;
  }

  const projectId = getProjectId(title.title, event.params.projectId.toString())
  const project = Project.load(projectId)
  if (!project) {
    log.error("No project with {}", [projectId])
    return
  }
  project.donated = project.donated.plus(event.params.amount);
  project.donationCount++;
  project.save()

  const tokenId = getTokenId(title.title, event.params.id.toString())
  const token = new Token(tokenId)
  token.amount = event.params.amount
  token.message = event.params.message;
  token.owner = event.params.owner.toHexString();
  token.project = getProjectId(title.title, event.params.projectId.toString())
  token.time = event.block.timestamp;
  token.tokenURI = "" // Todo get

  const owner = new Account(event.params.owner.toHexString())
  token.owner = owner.id
  owner.save()

  token.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const title = Title.load(event.address.toHexString())
  if (!title) {
    log.error("No title with {}", [event.address.toHexString()])
    return;
  }

  const contract = Contract.load(title.title)
  if (!contract) {
    log.error("No contract with {}", [title.title])
    return;
  }

  const owner = new Account(event.params.newOwner.toHexString())
  contract.owner = owner.id
  owner.save()

  contract.save()
}

function getProjectId(title: string, projectId: string): string { return title + "_p" + projectId }
function getTokenId(title: string, tokenId: string): string { return title + "_t" + tokenId }
