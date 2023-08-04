import cx from "classnames";
import moment from "moment";

export type MessageProps = {
  from: string;
  fromMe?: boolean;
  avatarUrl: string;
  text: string;
  userId: string;
};
export const Message = ({ text, fromMe, from, avatarUrl }: MessageProps) => {
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
            <img src={avatarUrl} />
          </div>
        </div>
        <div className="chat-header">
          {from}{" "}
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
