import { Automator } from "../libs/automator";
import { testQuestionAnswerRepository } from "../repositories/testQuestionAnswerRepository";
import { Test } from "../entities/Test";
import { automataRepository } from "../repositories/automataRepository";
import { ExtendsClass } from "../libs/ExtendsClass";

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
      const answerAutomataDefinition = answers[questionAutomataId];

      if (!answerAutomataDefinition) continue;

      const questionAutomata = await automataRepository.findOneBy({
        id: questionAutomataId,
      });

      if (!questionAutomata) throw new Error("Automata not found");
      const questionAutomataDefinition = await ExtendsClass.fetchJsonByUrl(
        questionAutomata.source
      );

      const areEquivalent = Automator.testEquivalence(
        questionAutomataDefinition,
        answerAutomataDefinition
      );

      const answerAutomataSource = await ExtendsClass.uploadJson(
        answerAutomataDefinition
      );

      const testQuestionAnswer = testQuestionAnswerRepository.create({
        test,
        questionAutomata,
        answerSource: answerAutomataSource,
        correct: areEquivalent.equivalent,
      });

      gradedAnswers.push(testQuestionAnswer);

      await testQuestionAnswerRepository.save(testQuestionAnswer);

      if (areEquivalent.equivalent) correctAnswersCounter++;
    }

    const grade = (correctAnswersCounter * 10) / test.automatas.length;

    return { gradedAnswers, grade };
  }
}

export { GradeTestService };
