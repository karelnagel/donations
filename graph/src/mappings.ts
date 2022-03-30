import { BigInt, log,ipfs,json } from "@graphprotocol/graph-ts"
import {
  Donations,
  NewProject
} from "../generated/Donations/Donations"

import {
  NewDonation,
  End,
  Edit,
  OwnershipTransferred
} from "../generated/templates/DonationsToken/DonationsToken"
import { Project, Donation } from "../generated/schema"
import { DonationsToken } from '../generated/templates'

export function handleNewProject(event: NewProject): void {
  let project = new Project(event.params.token.toHexString())

  project.title = event.params.title
  project.token = event.params.token;
  project.goal = event.params.goal
  project.owner = event.params.owner
  project.styling = event.params.styling
  project.image = event.params.image
  project.active = true;
  project.balance = new BigInt(0);
  // Todo get data from ipfs
  project.save()
  DonationsToken.create(event.params.token)
  log.info("Project with id {} created! ", [event.params.token.toHexString()])
}

export function handleEnd(event: End): void {
  const project = Project.load(event.address.toHexString())
  if (!project) log.error("No project with {}", [event.address.toHexString()])
  else {
    project.active = false;
    project.save()
  }
}

export function handleEdit(event: Edit): void {
  const project = Project.load(event.address.toHexString())
  if (!project) log.error("No project with {}", [event.address.toHexString()])
  else {
    project.goal = event.params.goal;
    project.styling = event.params.styling;
    project.image = event.params.image;
    project.save()
  }
}

export function handleDonation(event: NewDonation): void {
  const project = Project.load(event.address.toHexString())
  if (!project) log.error("No project with {}", [event.address.toHexString()])
  else {
    const donation = new Donation(event.transaction.hash.toHexString())
    donation.amount = event.params.amount
    donation.message = event.params.message
    donation.sender = event.params.sender
    donation.project = event.address.toHexString()
    donation.save()

    project.donations.push(donation.id) //Todo not working rn
    project.balance = project.balance.plus(event.params.amount)

    project.save()
  }
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void { }
