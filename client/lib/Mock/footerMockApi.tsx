import { COLOR_SCHEME } from "@lib/constants";
import { FooterProps } from "@rms-forge/ui-footer";

import {
  IconGithub,
  IconMail,
  IconTwitter,
  IconYoutube,
} from "@rms-forge/ui-icons";
import { Text } from "@rms-forge/ui-text";
import Image from "next/image";

export const mockFooterData: Omit<FooterProps, "onGetInTouchFormSubmit"> = {
  generalData: {
    maxWidth: "",
    dividerColor: "#4e535552",
    footerPadding: "var(--edge-padding)",
    backgroundColor: COLOR_SCHEME.WHITE,
    headingColor: COLOR_SCHEME.THEME_TEXT_COLOR_DARK,
  },

  brandData: {
    tagline: "Trending Fashion",
    brandLineColor: COLOR_SCHEME.RED,
    handleLine: "@nytec",
    brandLogo: (
      <div
        style={{
          marginTop: "0.6rem",
          marginBottom: "0.3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image width={50} height={80} src="/logo.png" alt="brandLogo" />
      </div>
    ),
  },

  additionalData: [
    {
      colValuesColor: COLOR_SCHEME.THEME_TEXT_COLOR_DARK,
      colValuesHoverColor: COLOR_SCHEME.RED,
      heading: "QUICK ACCESS",
      values: [
        { target: "Women", anchor: "/search?role=parent&gender=female" },
        {
          target: "Men",
          anchor: "/search?role=parent&gender=male",
        },
        {
          target: "Boys",
          anchor: "/search?role=kid&gender=male",
        },
        {
          target: "Girls",
          anchor: "/search?role=kid&gender=female",
        },
      ],
    },
    {
      colValuesColor: COLOR_SCHEME.THEME_TEXT_COLOR_DARK,
      colValuesHoverColor: COLOR_SCHEME.RED,
      heading: "TRENDING",
      values: [
        {
          target: "Tshirts",
          anchor: "/search?role=tshirts",
        },
        {
          target: "Shirts",
          anchor: "/search?role=shirts",
        },
        {
          target: "Jeans",
          anchor: "/search?role=jeans",
        },
        {
          target: "Kurti",
          anchor: "/search?role=kurtis",
        },
      ],
    },
    {
      colValuesColor: COLOR_SCHEME.THEME_TEXT_COLOR_DARK,
      colValuesHoverColor: COLOR_SCHEME.RED,
      heading: "LIVE PROJECTS",
      values: [
        { target: "Venom Vade Mecum", anchor: "https://vvm.netlify.app/" },
        {
          target: "Go_Fast: Typing Test",
          anchor: "https://go-fast.netlify.app/",
        },
        { target: "Snake Game", anchor: "https://snake-maniac.netlify.app/" },
        { target: "SMDB", anchor: "https://smdb-rishi0777.vercel.app/" },
      ],
    },
  ],

  getInTouchFormData: {
    bottomPadding: true,
    heading: (
      <Text
        size="b2"
        weight="semibold"
        color={COLOR_SCHEME.THEME_TEXT_COLOR_DARK}
        style={{ marginBottom: "20px" }}
      >
        GET IN TOUCH
      </Text>
    ),

    submitButtonData: {
      customButtonColor: {
        textColor: COLOR_SCHEME.WHITE,
        backgroundColor: COLOR_SCHEME.RED,
        hoverTextColor: COLOR_SCHEME.WHITE,
      },
    },

    loaderData: { loaderVariant: "default", loaderColor: COLOR_SCHEME.RED },

    placeholderData: {
      placeholderActiveColor: COLOR_SCHEME.WHITE,
      placeholderBackground: COLOR_SCHEME.THEME_TEXT_COLOR_DARK,
      placeholderColor: COLOR_SCHEME.THEME_TEXT_COLOR_DARK,
      placeholderColorDropdownOpen: COLOR_SCHEME.WHITE,
      placeholderBackgroundDropdownOpen: COLOR_SCHEME.RED,
    },

    additionalData: {
      inputCaretColor: COLOR_SCHEME.RED,
      inputFocusBorderColor: COLOR_SCHEME.RED,
    },

    inputFieldData: [
      {
        helperText: "",
        placeholder: "Name",
        errorValidation: {
          errorMessage: "Please enter name",
          validateInput(name) {
            return name !== "";
          },
        },
      },
      {
        helperText: "",
        placeholder: "Message",
        errorValidation: {
          errorMessage: "Please enter message",
          validateInput(message) {
            return message !== "";
          },
        },
      },
    ],
  },

  copyrightData: {
    showBrandIcon: true,
    headline: `Copyright © 2022 All rights reserved | R.M.`,
    brandIcon: {
      iconColor: COLOR_SCHEME.THEME_TEXT_COLOR_DARK,
      hoverColor: COLOR_SCHEME.RED,
      href: "https://rishi-mishra.netlify.app",
    },
    affiliatedIcons: [
      {
        href: "https://www.youtube.com/channel/UCWcQuLYAVIt_VTe3oCrT4PQ",
        icon: (
          <IconYoutube
            size="sm"
            hoverColor={COLOR_SCHEME.RED}
            color={COLOR_SCHEME.THEME_TEXT_COLOR_DARK}
          />
        ),
      },
      {
        href: "mailto:rishi.misra.777@gmail.com?subject=Contact",
        icon: (
          <IconMail
            size="sm"
            hoverColor={COLOR_SCHEME.RED}
            color={COLOR_SCHEME.THEME_TEXT_COLOR_DARK}
          />
        ),
      },
      {
        href: "https://github.com/rishi0777",
        icon: (
          <IconGithub
            size="sm"
            hoverColor={COLOR_SCHEME.RED}
            color={COLOR_SCHEME.THEME_TEXT_COLOR_DARK}
          />
        ),
      },
      {
        href: "https://github.com/rishi0777",
        icon: (
          <IconTwitter
            size="sm"
            hoverColor={COLOR_SCHEME.RED}
            color={COLOR_SCHEME.THEME_TEXT_COLOR_DARK}
          />
        ),
      },
    ],
  },
};
