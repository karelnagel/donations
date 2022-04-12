import { BigInt, Bytes, log } from "@graphprotocol/graph-ts"
import { Collection, Donation, Project, Title } from "../generated/schema"


export function getProjectId(title: string, projectId: string): string { return title + "_p" + projectId }
export function getDonationId(title: string, tokenId: string): string { return title + "_t" + tokenId }


export function getTitle(address: string): Title | null {
    let title = Title.load(address)
    if (!title) {
        log.error("No title with {}", [address])
        return null
    }
    return title
}
export function getCollection(title: string): Collection {
    let collection = Collection.load(title);
    if (!collection) {
        collection = new Collection(title);
        collection.owner = ""
        collection.address = new Bytes(0)
        collection.projectsCount = 0
        collection.time = BigInt.fromU64(0)
        collection.save()
    }
    return collection
}
export function getProject(title: string, id: BigInt): Project {
    const projectId = getProjectId(title, id.toString())
    let project = Project.load(projectId);
    if (!project) {
        project = new Project(projectId);
        project.index = id
        project.donated = BigInt.fromU64(0)
        project.coin = new Bytes(0);
        project.active = true;
        project.collection = title;
        project.time = BigInt.fromU64(0);
        project.donationCount = 0;
        project.owner = "";
        project.ipfs = ""
        project.save()
    }
    return project
}
export function getDonation(title: string, id: string): Donation {
    const donationId = getDonationId(title, id)
    let donation = Donation.load(donationId);
    if (!donation) {
        donation = new Donation(donationId);
        donation.amount = BigInt.fromU64(0)
        donation.message = ""
        donation.project = ""
        donation.originalOwner = ""
        donation.owner = ""
        donation.time = BigInt.fromU64(0)

        donation.save()
    }
    return donation
}
