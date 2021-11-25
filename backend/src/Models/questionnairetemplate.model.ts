import mongoose, { Model, Schema } from "mongoose";
import QuestionnaireTemplateInterface from "../Interfaces/questionnairetemplate.interface";

//These are all the input types for making questions on Views
export enum FieldType {
  Text = "text",
  TextArea = "textarea",
  Date = "date",
  Time = "time",
  Number = "number",
  DropdownSingle = "select",
  DropdownSingleOrText = "selectother",
  MultiSelect = "checkselect",
  Radio = "radio",
  PhoneNumber = "phone_number",
  Other = "other",
}

const questionnaireTemplateSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    views_id: { type: Number, required: true },
    fields: [
      {
        id: { type: Number, required: true, auto: true },
        label: { type: String, required: true },
        is_required: { type: Boolean, required: true, default: false },
        field_type: {
          type: String,
          enum: Object.values(FieldType),
          required: true,
          default: FieldType.Other,
        },
        validation: [String],
        options: [String],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const QuestionnaireTemplate = mongoose.model<QuestionnaireTemplateInterface>(
  "Questionnaire Template",
  questionnaireTemplateSchema
);
export default QuestionnaireTemplate;
