import { AppDataSource } from "../data-source";
import { TestSubmission } from "../entities/TestSubmission";

const testSubmissionRepository =
  AppDataSource.getRepository(TestSubmission);

export { testSubmissionRepository };
