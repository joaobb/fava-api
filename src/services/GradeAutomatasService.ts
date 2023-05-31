import { testQuestionAnswerRepository } from "../repositories/testQuestionAnswerRepository";
import { Test } from "../entities/Test";
import { automataRepository } from "../repositories/automataRepository";
import { ExtendsClass } from "../libs/ExtendsClass";
import { BadRequestError } from "../helpers/http-errors";
import { TestQuestionAnswer } from "../entities/TestQuestionAnswer";

import { Automata } from "automata-logics-v2";
import { TestAutomataEquivalenceService } from "./TestAutomataEquivalence";

interface GradeTestRequest {
  test: Test;
  answers: {
    [automataId: number]: Automata.Automata;
  };
}

class GradeTestService {
  async execute({ test, answers }: GradeTestRequest): Promise<any> {
    let correctAnswersCounter = 0;
    const gradedAnswers = [];

    for (const { id: questionAutomataId } of test.automatas) {
      const submittedAutomata = answers[questionAutomataId];

      const questionAutomata = await automataRepository.findOneBy({
        id: questionAutomataId,
      });

      if (!questionAutomata) throw new BadRequestError("Automata not found");

      let testQuestionAnswer: TestQuestionAnswer;

      if (submittedAutomata) {
        const questionAutomataDefinition = (
          await ExtendsClass.fetchJsonByUrl(questionAutomata.source)
        )?.payload;

        const answerAutomataSource = await ExtendsClass.uploadJson(
          submittedAutomata
        );

        const testAutomataEquivalenceService =
          new TestAutomataEquivalenceService();

        const areEquivalent = testAutomataEquivalenceService.execute({
          questionAutomataPayload: questionAutomataDefinition,
          submissionAutomataPayload: submittedAutomata,
        });

        if (areEquivalent.equivalent) correctAnswersCounter++;

        testQuestionAnswer = testQuestionAnswerRepository.create({
          // testSubmission: test,
          questionAutomata,
          answerSource: answerAutomataSource,
          correct: Boolean(areEquivalent.equivalent),
        });
      } else {
        // User did not submit the requested automata
        testQuestionAnswer = testQuestionAnswerRepository.create({
          questionAutomata,
          correct: false,
        });
      }

      gradedAnswers.push(testQuestionAnswer);

      await testQuestionAnswerRepository.save(testQuestionAnswer);
    }

    const grade = (correctAnswersCounter * 10) / test.automatas.length;

    return { gradedAnswers, grade };
  }
}

export { GradeTestService };
