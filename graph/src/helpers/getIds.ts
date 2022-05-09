
export function getSupporterId(title: string, address: string): string { return title + "_s" + address }
export function getDonationId(title: string, tokenId: string): string { return title + "_t" + tokenId }
export function getContentId(title: string, ipfs: string): string { return title + "_c" + ipfs }
export function getQuestionId(title: string, questionId: string): string { return title + "_q" + questionId }
export function getAnswerId(title: string, questionId: string, answerId: string): string {
    return title + "_q" + questionId + "_a" + answerId
}
export function getVoteId(title: string, questionId: string, account: string): string {
    return title + "_q" + questionId + "_a" + account
}
