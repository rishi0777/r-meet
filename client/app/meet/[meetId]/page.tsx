import { RMeet } from "pages/meet";

const MeetPage = (props: { params: Record<string, string> }) => {
  return <RMeet meetId={props.params["meetId"]} />;
};

export default MeetPage;
