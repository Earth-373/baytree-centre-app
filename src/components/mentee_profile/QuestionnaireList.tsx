import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as BaytreeTreeGrey } from "../../assets/images/baytree-tree-grey.svg";
import { Paths } from "../../util/routes";
import { Icon, IconColors, IconName } from "../Icon";
import { Endpoints, RequestType, sendRequest } from "../../util/request";
import { QuestionnaireItem, QuestionnaireItemProps } from "./QuestionnaireItem";

interface QuestionnaireListProps {
  association_id: string;
  questionnaires: QuestionnaireItemProps[];
}

export const QuestionnaireList: React.FC<QuestionnaireListProps> = ({
  questionnaires,
  association_id
}) => {
  const isEmpty: boolean = questionnaires.length === 0;

  //NOTE: This needs to be finished to connect front-end and back-end.
  useEffect(() => {
    sendRequest(RequestType.GET, {
      endpoint: Endpoints.getQuestionnairesForAssociation,
      params: [{ name: "assid", value: association_id }]
    }).then(({ data: { arrayOfValues } }) => {
      if (arrayOfValues.length > 0) {
        //set isEmpty to false
      }
      //set isEmpty to true
    });
  });

  return (
    <div className={`mentee-list ${isEmpty ? "empty" : ""}`}>
      <div className="header">
        <h2 className="subtext">Completed </h2>
        <Link to={Paths.NewQuestionnaire}>
          <Icon name={IconName.plus} color={IconColors.black}></Icon>
        </Link>
      </div>
      {isEmpty ? (
        <div className="empty-state">
          <BaytreeTreeGrey />
          <h1 className="widget-title">
            You Currently haven't completed any Questionnaires
          </h1>
          <p>Click the + to fill out a new questionnaire</p>
        </div>
      ) : (
        questionnaires.map(
          ({ month, year }: QuestionnaireItemProps, index: number) => (
            <QuestionnaireItem key={index} month={month} year={year} />
          )
        )
      )}
    </div>
  );
};
