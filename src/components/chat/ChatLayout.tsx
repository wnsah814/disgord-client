import { userIdAtom } from "@/atoms/AuthAtom";
import { CamOnAtom, mutedAtom, soundOnAtom } from "@/atoms/ParticipantAtom";
import { curRoomIdAtom } from "@/atoms/WebSocketAtom";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useAtom, useAtomValue } from "jotai";
import { ImPhoneHangUp } from "react-icons/im";
import {
  IoHeadset,
  IoMic,
  IoMicOff,
  IoPerson,
  IoVideocam,
  IoVideocamOff,
  IoHeadsetOutline,
} from "react-icons/io5";
import { MdHeadset, MdHeadsetOff } from "react-icons/md";

const ChatLayout = () => {
  const {
    sendMessage,
    localStream,
    remoteStreams,
    endCall,
    audioOn,
    videoOn,
    handleAudioMute,
    handleVideoMute,
  } = useWebSocket();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [camOn, setCamOn] = useAtom(CamOnAtom);
  const [muted, setMuted] = useAtom(mutedAtom);
  const [soundOn, setSoundOn] = useAtom(soundOnAtom);
  const userId = useAtomValue(userIdAtom);
  const [curRoomId, setCurRoomId] = useAtom(curRoomIdAtom);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    remoteStreams.forEach((stream, index) => {
      const videoElement = remoteVideoRefs.current[index];
      if (videoElement) {
        videoElement.srcObject = stream;
      }
    });
  }, [remoteStreams]);

  useEffect(() => {
    const refs = remoteVideoRefs.current;
    return () => {
      refs.forEach((ref) => {
        if (ref) {
          ref.srcObject = null;
        }
      });
    };
  }, []);

  const handleExit = () => {
    if (!userId) return;

    sendMessage({
      chatroomId: curRoomId,
      senderId: userId,
      action: "LEAVE_ROOM",
      content: "",
    });
    endCall();
    setCurRoomId(0);
  };

  const handleMuted = () => setMuted((prev: boolean) => !prev);
  const handleCamOn = () => setCamOn((prev: boolean) => !prev);
  const handleSoundOn = () => setSoundOn((prev: boolean) => !prev);

  return (
    <div className="bg-gray-200 rounded-lg w-full flex flex-col gap-4 p-4">
      <div className="flex flex-row justify-between mt-8 mx-8">
        <div className="flex items-center">
          <h1 className="font-semibold text-2xl">디스고드 만들기#1</h1>
        </div>
        <div className="flex">
          <div className="flex items-center gap-2 bg-white rounded-full py-2 px-4">
            <IoPerson color="gray" />
            <p className="text-gray-400">4</p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center overflow-y-auto">
        <div className="flex flex-wrap gap-4 overflow-y-auto justify-center">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className="h-64 rounded-xl transform scale-x-[-1]"
          ></video>
          {remoteStreams.map((_, index) => (
            <video
              key={index}
              ref={(el) => {
                remoteVideoRefs.current[index] = el;
              }}
              autoPlay
              className="h-64 rounded-xl transform scale-x-[-1]"
            ></video>
          ))}
        </div>
      </div>
      <div className="flex gap-8 justify-center">
        <div
          onClick={handleAudioMute}
          className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
        >
          {audioOn ? <IoMic /> : <IoMicOff />}
        </div>
        <div
          onClick={handleVideoMute}
          className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
        >
          {videoOn ? <IoVideocam /> : <IoVideocamOff />}
        </div>
        <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
          {soundOn ? (
            <MdHeadset onClick={handleSoundOn} />
          ) : (
            <MdHeadsetOff onClick={handleSoundOn} />
          )}
        </div>
        <div
          onClick={handleExit}
          className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
        >
          <ImPhoneHangUp />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
