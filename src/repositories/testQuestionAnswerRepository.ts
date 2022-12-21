import { AppDataSource } from "../data-source";
import { TestQuestionAnswer } from "../entities/TestQuestionAnswer";

const testQuestionAnswerRepository =
  AppDataSource.getRepository(TestQuestionAnswer);

export { testQuestionAnswerRepository };
