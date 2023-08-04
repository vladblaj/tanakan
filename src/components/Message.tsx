import cx from "classnames";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

export type MessageProps = {
  text: string;
  fromMe?: boolean;
  userId: string;
};
export const Message = ({ text, fromMe }: MessageProps) => {
  const { user } = useUser();
  return (
    <li
      className={cx(
        "flex justify-start",
        fromMe && "justify-end ",
        !fromMe && "justify-start "
      )}
    >
      <div
        className={cx("chat", fromMe && "chat-end", !fromMe && "chat-start")}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={user?.imageUrl} />
          </div>
        </div>
        <div className="chat-header">
          {user?.fullName}{" "}
          <time className="text-xs opacity-50">{moment().format("h:mm")}</time>
        </div>
        <div
          className={cx(
            "chat-bubble chat-bubble-primary",
            fromMe && "chat-bubble-primary",
            !fromMe && "chat-bubble-secondary"
          )}
        >
          {text}
        </div>
      </div>
    </li>
  );
};
