import orgEmoji from "@/public/img/home/orgEmoji1.svg";
import AngleLeft from "@/public/img/icon/AngleLeft";
import ImageSvg from "@/public/img/icon/ImageSvg";
import LinkSvg from "@/public/img/icon/Linksvg";
import PlusIcon from "@/public/img/icon/PlusIcon";
import SendSvg from "@/public/img/icon/SendSvg";
import SmileIcon from "@/public/img/icon/SmileIcon";
import { useCreateGroupConversationMutation } from "@/src/redux/services/conversationApi";
import { useSendMessageMutation } from "@/src/redux/services/messageApi";
import { useUploadImageMutation } from "@/src/redux/services/upload.service";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import { setReplyMessage } from "@/src/redux/slices/chatSlice";
import { setgroupConversations } from "@/src/redux/slices/groupConversationsSlice";
import { getSocket } from "@/src/socket";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { simulateUploadProgress } from "@/src/utils/UploadProgress";
import EmojiPicker from "emoji-picker-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ChatInput({
  receiverId,
  isNewGroup,
  conversationId,
  conversationType,
  setLatestMsg,
  isNewChat,
  data,
}) {
  const inputRef = useRef(null);
  const router = useRouter();
  const emojiPickerRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const [mentions, setMentions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [chapterModal, setChapterModal] = useState(false);
  const { data: userInfo } = useUserInfoQuery();
  const socket = getSocket();
  const typingTimeoutRef = useRef(null);
  const params = useParams();

  // Uploads queue
  const [uploads, setUploads] = useState([]);
  const [sendMsg, sendMsgRes] = useSendMessageMutation();
  const [uploadImage] = useUploadImageMutation();
  const [createGrp] = useCreateGroupConversationMutation();
  const replyMsg = useSelector((state) => state?.chat?.replyMessage);
  const dispatch = useDispatch();
  const participant = useSelector((state) => state.conversation.participants);

  // ONLY CHANGE: Fixed rate limiting with functional update + ref
  const [lastMstData, setLastMstData] = useState({
    msgCount: 0,
    expireDate: Date.now() + 30000,
    totalMsg: 20,
  });

  const lastMstDataRef = useRef(lastMstData);
  useEffect(() => {
    lastMstDataRef.current = lastMstData;
  }, [lastMstData]);

  const checkAndConsumeSlot = () => {
    const now = Date.now();
    const current = lastMstDataRef.current;

    if (current.expireDate < now) {
      // Window expired → reset
      setLastMstData({
        msgCount: 1,
        expireDate: now + 30000,
        totalMsg: 5,
      });
      return true;
    }

    if (current.msgCount >= current.totalMsg) {
      ErrorAlert("Maximum message limit reached");
      return false;
    }

    // Increment count
    setLastMstData((prev) => ({
      ...prev,
      msgCount: prev.msgCount + 1,
    }));
    return true;
  };

  const toAttachment = (file, url) => {
    const type = file.type.startsWith("image")
      ? "IMAGE"
      : file.type.startsWith("video")
      ? "VIDEO"
      : "DOCUMENT";
    return {
      fileName: file.name,
      url,
      type,
      mimeType: file.type,
      fileSize: file.size,
    };
  };

  const onFilesSelected = (fileList) => {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);
    const items = files.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${
        crypto?.randomUUID?.() || Math.random().toString(36)
      }`,
      file,
      progress: 0,
      status: "pending",
      url: undefined,
      error: undefined,
    }));
    setUploads((prev) => [...prev, ...items]);
    items.forEach((item) => startUpload(item.id, item.file));
  };

  const startUpload = async (id, file) => {
    setUploads((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: "uploading", progress: 0 } : u
      )
    );
    try {
      const formData = new FormData();
      formData.append("file", file);
      const url = await simulateUploadProgress(
        () =>
          uploadImage(formData)
            .unwrap()
            .then((r) => r?.message?.data),
        (p) => {
          setUploads((prev) =>
            prev.map((u) => (u.id === id ? { ...u, progress: p } : u))
          );
        }
      );
      setUploads((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, status: "done", progress: 100, url } : u
        )
      );
    } catch (err) {
      setUploads((prev) =>
        prev.map((u) =>
          u.id === id
            ? {
                ...u,
                status: "error",
                progress: 0,
                error:
                  err?.data?.message ||
                  err?.message ||
                  "Upload failed: The file size cannot exceed 5 MB",
              }
            : u
        )
      );
    }
  };

  const removeUpload = (id) => {
    setUploads((prev) => prev.filter((u) => u.id !== id));
  };

  const hasPendingUploads = useMemo(
    () =>
      uploads.some((u) => u.status === "pending" || u.status === "uploading"),
    [uploads]
  );

  const completedAttachments = useMemo(
    () =>
      uploads
        .filter((u) => u.status === "done" && u.url)
        .map((u) => toAttachment(u.file, u.url)),
    [uploads]
  );

  const handleGroupMsg = async () => {
    if (!conversationId) {
      const conversation = await createGrp(data);
      const newMsg = {
        conversationId: conversation?.data?.data?.conversation?.id,
        content: newMessage,
        conversationType,
        parentId: replyMsg?.messageId ? replyMsg?.messageId : null,
      };
      if (newMessage.length > 1200) {
        ErrorAlert("You reached the maximum character limit (1200).");
      } else {
        try {
          const res = await sendMsg(newMsg).unwrap();
          if (res?.data) {
            setNewMessage("");
            setShowEmojiPicker(false);
            router.push(
              `/chat/${conversation?.data?.data?.conversation?.id}?type=${conversation?.data?.data?.conversation?.type}`
            );
          }
        } catch (error) {
          ErrorAlert(error?.data?.data?.message);
        }
      }
    }
  };

  const handleSend = async () => {
    if (hasPendingUploads) return;
    const firstFember = localStorage.getItem("firstFember");
    const enterChapter = localStorage.getItem("enterChapter");

    if (firstFember === "true") {
      setShowModal(true);
      return;
    }
    // if (enterChapter === "true") {
    //   setChapterModal(true);
    //   return;
    // }

    setUploads([]);

    if (inputRef.current) {
      inputRef.current.focus(); // Prevent keyboard from hiding
    }

    const hasText = !!newMessage.trim();
    const hasFiles = completedAttachments.length > 0;
    if (!hasText && !hasFiles) return;

    // ONLY THIS PART WAS BROKEN — NOW FIXED
    if (!checkAndConsumeSlot()) return;

    let validMentions = [];
    if (mentions) {
      validMentions = mentions.filter((m) =>
        newMessage.includes(`@${m.fullName}`)
      );
    }

    if (hasFiles) {
      const type = completedAttachments[0].mimeType?.startsWith("image")
        ? "IMAGE"
        : "FILE";
      const newMsg = {
        receiverId: receiverId || "",
        conversationType,
        conversationId: conversationId || "",
        content: newMessage,
        attachments: completedAttachments,
        type,
        parentId: replyMsg?.messageId ? replyMsg?.messageId : null,
        mentions: validMentions.map((m) => ({ userId: m.id })),
      };
      if (newMessage.length > 1200) {
        ErrorAlert("You reached the maximum character limit (1200).");
      } else {
        setLatestMsg(newMsg);
        try {
          await sendMsg(newMsg).unwrap();
        } catch (error) {
          ErrorAlert(error?.data?.data?.message);
        }
      }
      setShowEmojiPicker(false);
      dispatch(setReplyMessage(null));
      dispatch(setgroupConversations([]));
      return;
    }

    if (isNewGroup) {
      await handleGroupMsg();
    } else {
      const newMsg = {
        receiverId,
        conversationId,
        content: newMessage,
        conversationType,
        parentId: replyMsg?.messageId ? replyMsg?.messageId : null,
        type: "TEXT",
        mentions: validMentions.map((m) => ({ userId: m.id })),
      };
      if (newMessage.length > 1200) {
        ErrorAlert("You reached the maximum character limit (1200).");
        return;
      } else {
        setLatestMsg(newMsg);
        setNewMessage("");
        try {
          // await sendMsg(newMsg);
          await sendMsg(newMsg).unwrap();
        } catch (error) {
          ErrorAlert(error?.data?.data?.message);
        }
      }
      setShowEmojiPicker(false);
      dispatch(setgroupConversations([]));
      dispatch(setReplyMessage(null));
    }
  };

  const onEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.scrollLeft = inputRef.current.scrollWidth;
      }
    });
  };

  const handleLike = () => {
    if (!checkAndConsumeSlot()) return;

    const newMsg = {
      receiverId,
      attachments: [
        {
          fileName: "like",
          url: "/img/home/orgEmoji1.svg",
          type: "IMAGE",
          mimeType: "image/svg",
          fileSize: 10,
        },
      ],
      type: "EMOJI",
    };

    setNewMessage("");
    setLatestMsg(newMsg);
    sendMsg({ ...newMsg, conversationType, conversationId });
    setShowEmojiPicker(false);
  };

  // ... rest of your code (typing, emoji picker, etc.) — 100% unchanged

  const handleTyping = () => {
    if (!conversationId && !params.id) return;
    const data = {
      conversationId: conversationId || params.id,
      fullName: userInfo?.user?.fullName,
      avatar: userInfo?.user?.avatar,
      id: userInfo?.user?.id,
    };
    socket.emit("USER_TYPING", data);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("USER_STOP_TYPING", data);
    }, 2000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (sendMsgRes?.data && isNewChat) {
      router.push(
        `/chat/${sendMsgRes?.data?.data?.conversation?.id}?type=${sendMsgRes?.data?.data?.conversation?.type}`
      );
    }
  }, [sendMsgRes, isNewChat, router]);

  const placeholderText =
    uploads.length > 0
      ? uploads.map((u) => u.file.name).join(", ")
      : "Type a message...";

  const canSend =
    (!!newMessage.trim() || completedAttachments.length > 0) &&
    !hasPendingUploads;

  return (
    <div className="px-0 py-2 sm:rounded-[16px] rounded-none shadow-lg sm:px-4 sm:py-[10px] bg-black">
      {/* Reply Preview */}
      {/* {replyMsg && (
        <div className="relative flex items-start gap-2 px-3 py-2 mb-2 rounded-lg bg-white/10">
          <div className="w-full pl-2 text-sm text-white border-l-4 border-blue-400">
            <p className="text-xs text-gray-300">Replying to:</p>
            <p className="text-white truncate">{replyMsg?.message}</p>
          </div>
          <button
            onClick={() => dispatch(setReplyMessage(null))}
            className="absolute text-gray-400 top-1 right-1 hover:text-white"
          >
            ✕
          </button>
        </div>
      )} */}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-[300px] text-center">
            <p className="mb-4 font-medium">
              You can't send messages, please do <b>Submit for Review</b>
            </p>
            <button
              className="px-4 py-2 text-white bg-black rounded"
              onClick={() => setShowModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
      {/* {chapterModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-[300px] text-center">
            <p className="mb-4 font-medium">
              You can't send or see any messages, please do{" "}
              <b>Enter Chapter Chat</b>
            </p>
            <button
              className="px-4 py-2 text-white bg-black rounded"
              onClick={() => setChapterModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )} */}

      <div className="flex items-center gap-2 px-2 py-0 sm:px-0">
        {/* File Upload Section */}
        <div className="relative flex p-[9px] items-center bg-white/10 rounded-[12px]">
          <div className="mr-2">
            <label
              htmlFor="imageUpload"
              className="flex items-center justify-center rounded-full cursor-pointer"
            >
              <ImageSvg />
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                onFilesSelected(e.target.files);
                e.target.value = "";
              }}
            />
          </div>
          <button
            onClick={() => setOpen(!open)}
            className={`transition-all duration-300 ease-in-out transform overflow-hidden ${
              open
                ? "opacity-0 scale-0 w-0 h-0 p-0 pointer-events-none"
                : "opacity-100 scale-100 pointer-events-auto"
            }`}
          >
            <PlusIcon />
          </button>

          <div
            className={`flex items-center rounded-full overflow-hidden transform origin-left transition-all duration-500 ease-in-out
          ${
            open
              ? "opacity-100 w-[50px] pointer-events-auto visible"
              : "opacity-0 w-0 px-0 py-0 pointer-events-none invisible"
          }`}
          >
            <div className="flex items-center">
              <div>
                <label htmlFor="fileUpload" className={`cursor-pointer`}>
                  <LinkSvg className="text-white" />
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  accept="video/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    onFilesSelected(e.target.files);
                    e.target.value = "";
                  }}
                />
              </div>
              <button onClick={() => setOpen(!open)}>
                <AngleLeft />
              </button>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="relative flex items-center flex-grow">
          <textarea
            ref={inputRef}
            type="text"
            placeholder={"Type a message..."}
            className="bg-white/10 rounded-[12px] h-12 w-full font-normal leading-5 placeholder:text-white px-4 pr-10 text-white py-3 outline-none text-base placeholder:text-base 
              scrollbar-hide [&::-webkit-scrollbar]:hidden scrollbar-hide resize-none"
            value={newMessage}
            onChange={(e) => {
              const value = e.target.value;
              setNewMessage(value);
              handleTyping();

              // Detect @mention
              const cursorPos = e.target.selectionStart;
              const textUpToCursor = value.slice(0, cursorPos);
              const match = textUpToCursor.match(/(?:^|\s)@([^\s@]*)$/);

              if (match) {
                setMentionQuery(match[1]); // query after "@"
                setShowMentions(true);
              } else {
                setMentionQuery("");
                setShowMentions(false);
              }

              if (inputRef.current) {
                inputRef.current.scrollLeft = inputRef.current.scrollWidth;
              }
            }}
            onFocus={() => setOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // prevent newline
                handleSend();
              }
            }}
          />

          {showMentions && (
            <div className="absolute z-50 p-2 overflow-auto bg-gray-800 rounded-lg shadow-lg bottom-14 left-4 max-h-40 scrollbar-hide">
              {participant
                .filter((p) =>
                  p.fullName.toLowerCase().includes(mentionQuery.toLowerCase())
                )
                .map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center px-3 py-2 text-white cursor-pointer hover:bg-gray-700"
                    onClick={() => {
                      // Replace @query with @fullName
                      const cursorPos = inputRef.current.selectionStart;
                      const before = newMessage
                        .slice(0, cursorPos)
                        .replace(/@(\w*)$/, `@${p.fullName} `);
                      const after = newMessage.slice(cursorPos);

                      setNewMessage(before + after);

                      if (!mentions.some((m) => m.id === p.id)) {
                        setMentions([
                          ...mentions,
                          { id: p.id, fullName: p.fullName },
                        ]);
                      }
                      setMentionQuery("");
                      setShowMentions(false);

                      requestAnimationFrame(() => {
                        inputRef.current.focus();
                      });
                    }}
                  >
                    <Image
                      src={p.avatar}
                      alt={p.fullName}
                      width={25}
                      height={30}
                      className="mr-2 rounded-full"
                    />
                    {p.fullName}
                  </div>
                ))}
            </div>
          )}

          <div className="absolute sm:right-0 right-2 text-[#333333] transition">
            <div className="relative" ref={emojiPickerRef}>
              <button
                className="grid place-content-center sm:w-[45px] w-[30px] sm:h-[45px] h-[30px] bg-transparent rounded-full text-white transition"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                aria-label="Toggle emoji picker"
              >
                <SmileIcon className="text-white size-7" />
              </button>
              {showEmojiPicker && (
                <div
                  className="absolute z-50 sm:right-2 -right-12 bottom-12 
               w-[290px] xs:w-[320px] sm:w-[300px] md:w-[350px] lg:w-[400px]
               h-[370px] sm:h-[350px] md:h-[400px] lg:h-[450px]"
                >
                  <div className="w-full h-full overflow-hidden rounded-xl">
                    <EmojiPicker
                      onEmojiClick={onEmojiClick}
                      width="100%"
                      height="100%"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Send / Like Button */}
        <div className="flex justify-end p-0 sm:p-2">
          {canSend ? (
            <button
              className={`flex items-center justify-center sm:w-[45px] w-[34px] sm:h-[45px] h-[30px] sm:bg-white/10 bg-transparent rounded-full text-white transition hover:scale-110 ${
                hasPendingUploads ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSend}
              aria-label="Send message"
              disabled={hasPendingUploads}
            >
              <SendSvg className="text-white size-6" />
            </button>
          ) : (
            <button
              className="flex items-center justify-center sm:w-[45px] w-[34px] sm:h-[45px] h-[30px] sm:bg-white/10 bg-transparent rounded-full text-white transition hover:scale-110"
              onClick={handleLike}
              aria-label="Send like"
            >
              <Image className="size-7" src={orgEmoji} alt="orgEmoji" />
            </button>
          )}
        </div>
      </div>

      {/* Uploads Preview + Simple Progress */}
      {uploads.length > 0 && (
        <div className="mt-2 max-h-[200px] overflow-y-auto space-y-2 px-2 sm:px-0">
          {uploads.map((u) => (
            <div
              key={u.id}
              className="flex items-center gap-3 px-3 py-2 text-white rounded-lg bg-white/10"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm truncate">{u.file.name}</span>
                  <span className="text-xs text-gray-300">
                    {u.status === "uploading" && `${u.progress}%`}
                    {u.status === "done" && "Ready"}
                    {u.status === "pending" && "Queued"}
                    {u.status === "error" && "Failed"}
                  </span>
                </div>
                <div className="mt-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-200 ${
                      u.status === "error" ? "bg-red-500" : "bg-blue-500"
                    }`}
                    style={{
                      width: `${u.status === "done" ? 100 : u.progress}%`,
                    }}
                  />
                </div>
                {u.status === "error" && (
                  <div className="mt-1 text-xs text-red-400">
                    {u.error ||
                      "Upload failed: The file size cannot exceed 5 MB"}
                  </div>
                )}
              </div>
              <button
                onClick={() => removeUpload(u.id)}
                className="px-2 text-lg leading-none text-gray-300 hover:text-white"
                aria-label="Remove file"
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
