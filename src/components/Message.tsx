import cx from "classnames";

export type MessageProps = {
  text: string;
  fromMe?: boolean;
  userId: string;
};
export const Message = ({ text, fromMe }: MessageProps) => {
  return (
    <li
      className={cx(
        "flex justify-start",
        fromMe && "justify-end",
        !fromMe && "justify-start"
      )}
    >
      <div
        className={cx(
          "relative max-w-xl px-4 py-2 text-gray-700 rounded shadow",
          fromMe && "bg-gray-100"
        )}
      >
        <span className="block">{text}</span>
      </div>
    </li>
  );
};
