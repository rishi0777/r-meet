"use client";

import { v4 as uuidV4 } from "uuid";
import Image from "next/image";
import { Text } from "@rms-forge/ui-text";
import { Toast } from "@rms-forge/ui-toast";
import { useRouter } from "next/navigation";
import { Header } from "@rms-forge/ui-header";
import { COLOR_SCHEME } from "@lib/constants";
import { Footer } from "@rms-forge/ui-footer";
import { Button } from "@rms-forge/ui-button";
import { Divider } from "@rms-forge/ui-divider";
import { Container } from "@rms-forge/ui-container";
import { Input } from "@rms-forge/ui-controlled-components";
import { type FormInnerFunctions } from "@rms-forge/ui-form";
import { useCallback, useEffect, useRef, useState } from "react";
import { InputFieldEntity } from "@rms-forge/ui-form/dist/components/InputField";
import {
  IconAlert,
  IconChevronLeft,
  IconChevronRight,
  IconMail,
  IconMyBrand,
  IconUser,
} from "@rms-forge/ui-icons";
import { useDeviceType } from "@rms-forge/ui-utils";
import { mockFooterData } from "@lib/Mock/footerMockApi";
import { useSocket } from "components/context/SocketProvider";

export type NewMeetData = {
  email: string;
  newMeetId: string;
};

const Lobby = () => {
  const imageSlides = [
    {
      url: "/link.svg",
      title: "Get a link you can share",
      subtitle:
        "New meeting to get a link you can send to people you want to meet with",
    },
    {
      url: "/calendar.svg",
      title: "Plan ahead",
      subtitle:
        "Click New meeting to schedule meetings in Google Calendar and send invites to participants",
    },
    {
      url: "/safe.svg",
      title: "Your meeting is safe",
      subtitle:
        "No one can join a meeting unless invited or admitted by the host",
    },
  ];

  const router = useRouter();
  const socket = useSocket();
  const { isDesktop } = useDeviceType({ breakpoint: "928px" });
  const toast = useRef<Toast | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<{
    userEmail: string;
    firstName: string;
    lastName: string;
  }>({
    userEmail: "rishimishra244@gmail.com",
    firstName: "Rishi",
    lastName: "Mishra",
  });
  const [imageSlide, setImageSlide] = useState(0);
  const [meetId, setMeetId] = useState("");
  const footerRef = useRef<FormInnerFunctions | null>(null);

  const sendGetInTouchEmail = async (inputFields?: InputFieldEntity[]) => {
    const name = inputFields?.[0]?.value || "";
    const message = inputFields?.[1]?.value || "";

    const res = await fetch("/api/users/getInTouch", {
      method: "POST",
      body: JSON.stringify({
        name,
        message,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res?.json();
    if (data.success && toast.current) {
      toast.current.createToast({
        message: `Thanks for contacting us ...`,
        mode: "custom",
        autoClose: true,
        icon: <IconMail />,
        autoCloseTime: 5000,
        customColor: { background: COLOR_SCHEME.RED },
      });
    } else if (toast.current) {
      toast.current.createToast({
        message: `Internal Server Error ...`,
        mode: "custom",
        autoClose: true,
        icon: <IconAlert />,
        autoCloseTime: 5000,
        customColor: { background: COLOR_SCHEME.RED },
      });
    }
  };

  const clickedGetInTouch = async () => {
    if (loggedInUser) {
      const inputFields = footerRef.current?.getInputFieldsData();
      await sendGetInTouchEmail(inputFields);
    } else footerRef.current?.setOnSubmitError("Login to continue");

    footerRef.current?.clearInputFieldsData();
    footerRef.current?.setIsLoading(false);
  };

  const handleNewMeetRedirect = useCallback(
    (data: NewMeetData) => {
      router.push(`/meet/${data.newMeetId}`);
    },
    [router]
  );

  const handleMeetClick = useCallback(
    (event: "New" | "Join") => {
      if (socket && loggedInUser) {
        if (event === "New") {
          socket.emit("meet:join", {
            email: loggedInUser.userEmail,
            newMeetId: uuidV4(),
          });
        } else {
          socket.emit("meet:join", {
            email: loggedInUser.userEmail,
            newMeetId: meetId,
          });
          // router.push(`/meet/${meetId}`);
        }
      } else if (!loggedInUser) {
        window.location.href = "https://nytestash.vercel.app/user/login";
      } else if (!socket) {
        console.log("Wait!!..Server Error");
      }
    },
    [socket, meetId, loggedInUser, router]
  );

  useEffect(() => {
    if (socket) {
      socket.on("meet:join", handleNewMeetRedirect);

      return () => {
        socket.off("meet:join", handleNewMeetRedirect);
      };
    }
  }, [socket, handleNewMeetRedirect]);

  return (
    <>
      <Header
        activeLink=""
        fixHeader={true}
        withSearchBar={false}
        generalHeaderStyle={{
          // maxWidth: '1600px',
          mobileCloseIconContainerTitle: "QUICK ACCESS",
          headerPadding: "var(--edge-padding)",
          entityStyle: {
            hoverColor: "#5f6368",
            activeColor: "#5f6368",
            contentHoverColor: "#5f6368",
            contentColor: "#5f6368",
          },
          backgroundColor: "#FFFFFF",
          menuDrawerBackgroundColor: "#FFFFFF",
        }}
        brandInfo={
          <>
            <IconMyBrand color="black200" />
            <Text size="b1" weight="semibold" color="#5f6368">
              R-MEET
            </Text>
          </>
        }
        menuItems={[]}
        badges={[
          {
            badgeIcon: <IconUser size="xs" />,
            badgeText: "Profile",
            href: "/user/profile",
          },
        ]}
        loggedIn={!!loggedInUser}
        onLogoutClick={async () => {}}
      />

      <Container maxContainerWidth="1800px">
        <main
          className={`flex ${
            isDesktop
              ? "flex-row mt-16 min-h-[60vh]"
              : "flex-col mt-32 min-h-[72.8vh]"
          } items-center justify-between`}
        >
          <div className="flex flex-col max-w-[600px] p-[20px]">
            <Text size={isDesktop ? "h2" : "h1"} color="black100">
              Video calls and meetings for everyone
            </Text>

            <Text
              size="b1"
              weight="regular"
              color={COLOR_SCHEME.THEME_TEXT_COLOR_DARK}
              className="mt-4"
            >
              R Meet provides secure, easy-to-use video calls and meetings for
              everyone, on any device.
            </Text>

            <div className="flex flex-row flex-wrap mt-8 items-center gap-4">
              <Button
                size="medium"
                color="danger"
                fullWidth
                onClick={() => {
                  handleMeetClick("New");
                }}
              >
                New Meet
              </Button>

              <div className="flex-1">
                <Input
                  variant="normal"
                  inputCaretColor={COLOR_SCHEME.RED}
                  inputFocusBorderColor={COLOR_SCHEME.RED}
                  placeholderProps={{
                    placeholder: "Meet ID",
                    placeholderColor: "var(--color-grey-100)",
                    placeholderBackground: "var(--color-white)",
                    placeholderActiveColor: "var(--color-grey-100)",
                    placeholderColorDropdownOpen: "var(--color-white)",
                    placeholderBackgroundDropdownOpen: COLOR_SCHEME.RED,
                  }}
                  // iconProps={{ icon: <IconAstronaut color="black100" size="sm" /> }}
                  // error={error}
                  // helperText={error ? "Error Occurred" : "Helper text"}
                  value={meetId}
                  onChange={(e) => setMeetId(e.target.value)}
                />
              </div>

              <Button
                disabled={!meetId}
                variant="hollow"
                size="medium"
                color="danger"
                onClick={() => {
                  handleMeetClick("Join");
                }}
                fullWidth
              >
                Join
              </Button>
            </div>
          </div>

          {!isDesktop && <Divider className="w-full mt-20" />}

          <div
            className={`flex flex-col mt-20 max-w-[400px] ${
              isDesktop ? "ml-16" : ""
            }`}
          >
            <div
              className={`flex flex-row justify-center items-center gap-12  `}
            >
              <IconChevronLeft
                className="cursor-pointer"
                size="sm"
                color={COLOR_SCHEME.THEME_TEXT_COLOR_DARK}
                onClick={() =>
                  setImageSlide((prev) =>
                    prev === 0 ? imageSlides.length - 1 : prev - 1
                  )
                }
              />

              {imageSlides.map((image, idx) => {
                return (
                  imageSlide === idx && (
                    <div
                      key={`image-${idx}`}
                      className="relative w-[180px] h-[180px] sm:w-[250px] sm:h-[250px]"
                    >
                      <Image src={image.url} alt="url" fill></Image>
                    </div>
                  )
                );
              })}

              <IconChevronRight
                className="cursor-pointer"
                size="sm"
                onClick={() =>
                  setImageSlide((prev) => (prev + 1) % imageSlides.length)
                }
                color={COLOR_SCHEME.THEME_TEXT_COLOR_DARK}
              />
            </div>

            <div className="flex mt-8">
              <div className="flex flex-col justify-center text-center">
                <Text size="h3" color="black100">
                  {imageSlides[imageSlide].title}
                </Text>

                <Text
                  size="b2"
                  weight="regular"
                  color={COLOR_SCHEME.THEME_TEXT_COLOR_DARK}
                  className="mt-2"
                >
                  {imageSlides[imageSlide].subtitle}
                </Text>

                <div></div>
              </div>
            </div>
          </div>
        </main>
      </Container>

      <Footer
        {...mockFooterData}
        ref={footerRef}
        onGetInTouchFormSubmit={clickedGetInTouch}
      />
    </>
  );
};

export { Lobby };
