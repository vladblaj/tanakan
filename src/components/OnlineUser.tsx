type Props = {
  name: string;
  lastSeen: string;
  message: string;
  avatar: string;
};

const toPrettyDate = (time: string) => {
  const date = new Date(time);
  return date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
};
export const OnlineUser = ({ name, lastSeen, message, avatar }: Props) => {
  return (
    <li>
      <a className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-secondary cursor-pointer hover:bg-gray-100 focus:outline-none">
        <img
          className="object-cover w-10 h-10 rounded-full"
          src={avatar}
          alt="username"
        />
        <div className="w-full pb-2">
          <div className="flex justify-between">
            <span className="block ml-2 font-semibold text-gray-600">
              {name}
            </span>
            <span className="block ml-2 text-sm text-gray-600">
              {toPrettyDate(lastSeen)}
            </span>
          </div>
          <span className="block ml-2 text-sm text-gray-600">{message}</span>
        </div>
      </a>
    </li>
  );
};
