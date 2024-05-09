import { IconSky } from "@/assets/svg";
import { IoAdd } from "react-icons/io5";
import Tooltip from "@components/common/Tooltip";
import { useState } from "react";
import RoomModal from "./RoomModal";
import { MdChevronRight } from "react-icons/md";
import { IoEllipsisHorizontalCircle } from "react-icons/io5";

const rooms = [
  {
    id: 1,
    icon: IconSky,
    name: "디스고드 만들기#1",
    focus: true,
  },
  {
    id: 2,
    icon: IconSky,
    name: "room2",
    focus: false,
  },
  {
    id: 3,
    icon: IconSky,
    name: "room3",
    focus: false,
  },
  {
    id: 4,
    icon: IconSky,
    name: "room4",
    focus: false,
  },
];

const ChatRoomList = () => {
  const [openModal, setopenModal] = useState(false);
  const [type, setType] = useState("");

  return (
    <div>
      <RoomModal type={type} open={openModal} setOpen={setopenModal} />

      <div className="flex mt-4 mb-2">
        <h2 className="text-2xl flex-auto">Channels</h2>
        <Tooltip message="Add Room">
          <button
            onClick={() => {
              setType("add");
              setopenModal(true);
            }}
          >
            <IoAdd className="h-8 w-8 text-gray-400" />
          </button>
        </Tooltip>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {rooms.map((chatRoom) => (
          <li
            key={chatRoom.id}
            className={
              "flex items-center gap-x-4 py-5 px-2 rounded-md " +
              (chatRoom.focus && "bg-gray-100")
            }
          >
            <div className="flex items-center w-40 gap-x-4">
              <img
                className="h-10 w-10 flex-none rounded-lg bg-gray-50"
                src={chatRoom.icon}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className={"text-sm font-semibold leading-6 text-gray-900"}>
                  {chatRoom.name}
                </p>
              </div>
            </div>
            <div className="flex">
              <button
                onClick={() => {
                  setType("modify");
                  setopenModal(true);
                }}
              >
                <IoEllipsisHorizontalCircle className="h-6 w-6 text-gray-400 font-thin" />
              </button>
              <Tooltip message="Enter Room">
                <button>
                  <MdChevronRight className="h-6 w-6 text-gray-400 font-thin" />
                </button>
              </Tooltip>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomList;
