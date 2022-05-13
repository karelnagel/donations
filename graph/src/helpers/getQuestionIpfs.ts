import { BigInt, JSONValueKind, log } from "@graphprotocol/graph-ts"
import { ipfs, json } from '@graphprotocol/graph-ts'
import { getAnswer, getContent, getQuestion } from "./initializers";

export function getQuestionIpfs(title: string, questionId: string, ipfsHash: string): void {

    const question = getQuestion(title, questionId)

    const data = ipfs.cat(ipfsHash)
    if (!data) {
        log.error("Cat error on hash: {}", [ipfsHash])
        return
    }
    const tryValue = json.try_fromBytes(data)
    if (tryValue.isError) {
        log.error("Try from bytes error, hash: {}", [ipfsHash])
        return
    }

    const object = tryValue.value.toObject()

    const que = object.get("question")
    if (que && que.kind === JSONValueKind.STRING) question.question = que.toString();



    const answers = object.get("answers")
    if (answers) {
        const answersArray = answers.toArray();

        for (let i = 0; i < answersArray.length; i++) {
            if (answersArray[i].kind === JSONValueKind.STRING) {
                const answer = getAnswer(title, questionId, i.toString())
                answer.answer = answersArray[i].toString()
                answer.save()
            }
        }
    }
    question.save()
}