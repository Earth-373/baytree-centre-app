import express, { Router } from "express";
import { isLoggedIn, isAdmin, login } from "../Middleware/middleWare";
import QuestionnaireController from "../Controllers/questionnairetemplate.controller";

const router: Router = express.Router();

//Admin only endpoint to migrate Questionnaire
router
  .route("/migrate-questionnaires")
  .get(
    isLoggedIn,
    isAdmin,
    QuestionnaireController.migrateQuestionnaireTemplate
  );
router
  .route("/all-questionnaires")
  .get(isLoggedIn, QuestionnaireController.getQuestionnaireTemplateList);
router
  .route("/questionnaire-template/:id")
  .get(isLoggedIn, QuestionnaireController.getQuestionnaireTemplateById);

router
  .route("/associations/:assid/assign-questionnaire/:tempid")
  .post(QuestionnaireController.assignQuestionnaireToAssociation);

router
  .route("/associations/questionnaire/:id")
  .put(QuestionnaireController.updateQuestionnaireValues);

router
  .route("/all-questionnaires/:assid")
  .get(isLoggedIn, QuestionnaireController.getQuestionnairesForAssociation);

router
  .route("/get-questionnaire/:questid")
  .get(isLoggedIn, QuestionnaireController.openQuestionnaireById);

export default router;
