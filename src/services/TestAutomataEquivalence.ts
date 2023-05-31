import { Automator } from "../libs/automator";
import { testQuestionAnswerRepository } from "../repositories/testQuestionAnswerRepository";
import { Test } from "../entities/Test";
import { automataRepository } from "../repositories/automataRepository";
import { ExtendsClass } from "../libs/ExtendsClass";
import { BadRequestError } from "../helpers/http-errors";
import { TestQuestionAnswer } from "../entities/TestQuestionAnswer";

import {
  Automata,
  parseGraphToAutomata,
  testEquivalenceHCK,
} from "automata-logics-v2";
import { Transition } from "automata-logics-v2/src/definitions/Automata";

interface TestAutomataEquivalenceRequest {
  questionAutomataPayload: any;
  submissionAutomataPayload: any;
}

interface TestAutomataEquivalenceResponse {
  equivalent: Boolean;
  reason?: {
    rejector: string;
    witness?: string;
  };
}

class TestAutomataEquivalenceService {
  execute({
    questionAutomataPayload,
    submissionAutomataPayload,
  }: TestAutomataEquivalenceRequest): TestAutomataEquivalenceResponse {
    const parsedQuestionAutomata = parseGraphToAutomata(
      questionAutomataPayload
    );
    const parsedSubmittedAutomata = parseGraphToAutomata(
      submissionAutomataPayload
    );

    const questionAutomata = new Automata(
      parsedQuestionAutomata.states,
      parsedQuestionAutomata.alphabet,
      parsedQuestionAutomata.transitions,
      parsedQuestionAutomata.initialState,
      parsedQuestionAutomata.acceptanceStates
    );

    const submissionAutomata = new Automata(
      parsedSubmittedAutomata.states,
      parsedSubmittedAutomata.alphabet,
      parsedSubmittedAutomata.transitions,
      parsedSubmittedAutomata.initialState,
      parsedSubmittedAutomata.acceptanceStates
    );

    return testEquivalenceHCK(questionAutomata, submissionAutomata);
  }
}

export { TestAutomataEquivalenceService };
