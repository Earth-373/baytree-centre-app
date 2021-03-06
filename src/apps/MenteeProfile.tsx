import { FC, useEffect, useState } from "react";
import { MenteeProfileHeader } from "../components/mentee_profile/MenteeProfileHeader";
import { Router, Route } from "react-router-dom";
import { history, Paths } from "../util/routes";
import MenteeGoals from "../components/mentee_profile/MenteeGoals";
import { TabNav } from "../components/TabNav";
import { MenteeSessionList } from "../components/mentee_profile/MenteeSessionList";
import { getFormattedDayMonthYearString } from "../util/date";
import { QuestionnaireList } from "../components/mentee_profile/QuestionnaireList";
import { QuestionnaireItemProps } from "../components/mentee_profile/QuestionnaireItem";
import { TabNavItemProps } from "../components/TabNav";
import { buildPath } from "../components/Link";
import { useParams } from "react-router";
import { Endpoints, RequestType, sendRequest } from "../util/request";

export const questionnaireList: QuestionnaireItemProps[] = [
  {
    month: "September",
    year: "2021"
  },
  {
    month: "August",
    year: "2021"
  },
  {
    month: "July",
    year: "2021"
  }
];

const MenteeProfile: FC<{}> = () => {
  const [menteeName, setMenteeName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");

  const { association_id } = useParams<{ association_id: string }>();
  const getNavPath = (path: string): string =>
    buildPath(path, [{ name: "association_id", value: association_id }]);

  const routes: TabNavItemProps[] = [
    {
      label: "Goals",
      to: getNavPath(Paths.menteeProfileGoals)
    },
    {
      label: "Sessions",
      to: getNavPath(Paths.menteeProfileSessions)
    },
    {
      label: "Questionnaires",
      to: getNavPath(Paths.menteeProfileQuestionnaires)
    }
  ];

  useEffect(() => {
    sendRequest(RequestType.GET, { endpoint: Endpoints.myMentees })
      .then(({ data: { mentees } }) => {
        const mentee = mentees.find(
          (mentee: { association_id: string }) =>
            mentee.association_id === association_id
        );
        const startDate: Date = new Date(mentee["start_date"].substring(0, 19));
        const birthday: Date = new Date(mentee["birthday"].substring(0, 15));
        setMenteeName(mentee["mentee_name"]);
        setStartDate(getFormattedDayMonthYearString(startDate));
        setBirthday(getFormattedDayMonthYearString(birthday));
      })
      .catch();
  }, [association_id]);

  return (
    <main className="mentee-profile">
      <div className="container">
        <MenteeProfileHeader
          menteeName={menteeName}
          startDate={startDate}
          birthday={birthday}
        />

        <TabNav routes={routes} />

        <Router history={history}>
          <Route path={getNavPath(Paths.menteeProfileGoals)}>
            <MenteeGoals
              menteeName={menteeName}
              startDate={startDate}
              birthday={birthday}
              association_id={association_id}
            />
          </Route>
          <Route path={getNavPath(Paths.menteeProfileSessions)}>
            <MenteeSessionList associationId={association_id} />
          </Route>
          <Route path={getNavPath(Paths.menteeProfileQuestionnaires)}>
            <QuestionnaireList
              questionnaires={questionnaireList}
              association_id={association_id}
            />
          </Route>
        </Router>
      </div>
    </main>
  );
};

export default MenteeProfile;
