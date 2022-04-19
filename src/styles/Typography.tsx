import React from 'react'
import { Helmet } from 'react-helmet'
import { createGlobalStyle, css } from 'styled-components'

import { BREAKPOINTS } from './constants'

const MobileH1 = css`
  font-family: 'Alfa Slab One', serif;
  font-size: 32px;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.25px;
  line-height: 40px;
`

const MobileH2 = css`
  font-family: 'Alfa Slab One', serif;
  font-size: 29px;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0;
  line-height: 40px;
`

const MobileH3 = css`
  font-family: 'Alfa Slab One', serif;
  font-size: 26px;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.15px;
  line-height: 32px;
`

const MobileH4 = css`
  font-family: 'Alfa Slab One', serif;
  font-size: 23px;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.25px;
  line-height: 32px;
`

const MobileH5 = css`
  font-family: 'Alfa Slab One', serif;
  font-size: 20px;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.35px;
  line-height: 24px;
`

const MobileH6 = css`
  font-family: 'Alfa Slab One', serif;
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.4px;
  line-height: 24px;
`

const MobileBody = css`
  font-family: 'Fira Sans', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.5px;
  line-height: 24px;
`

const MobileCaption = css`
  font-family: 'Fira Sans', sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.5px;
  line-height: 16px;
`

const MobileOverline = css`
  font-family: 'Fira Sans', sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 1.5px;
  line-height: 16px;
  text-transform: uppercase;
`

const MobileCode = css`
  font-family: 'Fira Code', monospace !important;
  font-size: 14px !important;
  line-height: 21px !important;
`

const DesktopH1 = css`
  font-family: 'Alfa Slab One', serif;
  font-size: 47px;
  font-style: normal;
  font-weight: normal;
  line-height: 56px;
`

const DesktopH2 = css`
  font-family: 'Alfa Slab One', serif;
  font-size: 39px;
  font-style: normal;
  font-weight: normal;
  line-height: 48px;
`

const DesktopH3 = css`
  font-family: 'Alfa Slab One', serif;
  font-size: 33px;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.15px;
  line-height: 40px;
`

const DesktopH4 = css`
  font-family: 'Alfa Slab One', serif;
  font-size: 27px;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.25px;
  line-height: 32px;
`

const DesktopH5 = css`
  font-family: 'Alfa Slab One', serif;
  font-size: 23px;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.35px;
  line-height: 32px;
`

const DesktopH6 = css`
  font-family: 'Alfa Slab One', serif;
  font-size: 19px;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.4px;
  line-height: 24px;
`

const DesktopBody = css`
  font-family: 'Fira Sans', sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.5px;
  line-height: 28px;
`

const DesktopCaption = css`
  font-family: 'Fira Sans', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.4px;
  line-height: 16px;
`

const DesktopOverline = css`
  font-family: 'Fira Sans', sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 1.5px;
  line-height: 16px;
  text-transform: uppercase;
`

const DesktopCode = css`
  font-family: 'Fira Code', monospace !important;
  font-size: 16px !important;
  line-height: 24px !important;
`

const H1WithStyle = css`
  ${MobileH1}
  @media (min-width: ${BREAKPOINTS.sm}) {
    ${DesktopH1}
  }
`

const H2WithStyle = css`
  ${MobileH2}
  @media (min-width: ${BREAKPOINTS.sm}) {
    ${DesktopH2}
  }
`

const H3WithStyle = css`
  ${MobileH3}
  @media (min-width: ${BREAKPOINTS.sm}) {
    ${DesktopH3}
  }
`

const H4WithStyle = css`
  ${MobileH4}
  @media (min-width: ${BREAKPOINTS.sm}) {
    ${DesktopH4}
  }
`

const H5WithStyle = css`
  ${MobileH5}
  @media (min-width: ${BREAKPOINTS.sm}) {
    ${DesktopH5}
  }
`

const H6WithStyle = css`
  ${MobileH6}
  @media (min-width: ${BREAKPOINTS.sm}) {
    ${DesktopH6}
  }
`

const BodyWithStyle = css`
  ${MobileBody}
  @media (min-width: ${BREAKPOINTS.sm}) {
    ${DesktopBody}
  }
`

const CaptionWithStyle = css`
  ${MobileCaption}
  @media (min-width: ${BREAKPOINTS.sm}) {
    ${DesktopCaption}
  }
`

const OverlineWithStyle = css`
  ${MobileOverline}
  @media (min-width: ${BREAKPOINTS.sm}) {
    ${DesktopOverline}
  }
`

const CodeWithStyle = css`
  ${MobileCode}
  @media (min-width: ${BREAKPOINTS.sm}) {
    ${DesktopCode}
  }
`

const ButtonLabelWithStyle = css`
  font-family: 'Fira Sans', sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 1.25px;
  line-height: 16px;
  text-transform: uppercase;
`

const TypographyStyles = createGlobalStyle`
	h1 {
		${H1WithStyle}
	}

	h2 {
		${H2WithStyle}
	}

	h3 {
		${H3WithStyle}
	}

	h4 {
		${H4WithStyle}
	}

	h5 {
		${H5WithStyle}
	}

	h6 {
		${H6WithStyle}
	}

	p {
		${BodyWithStyle}
	}

	button {
		${ButtonLabelWithStyle}
	}

	code {
		${CodeWithStyle}
	}
`

export const typographyStyles = {
  Body: BodyWithStyle,
  ButtonLabel: ButtonLabelWithStyle,
  Caption: CaptionWithStyle,
  Code: CodeWithStyle,
  H1: H1WithStyle,
  H2: H2WithStyle,
  H3: H3WithStyle,
  H4: H4WithStyle,
  H5: H5WithStyle,
  H6: H6WithStyle,
  Overline: OverlineWithStyle,
}

// TODO replace with preload link
export function Typography(): JSX.Element {
  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Fira+Sans:ital,wght@0,400;0,500;1,400&family=Fira+Code:wght@500&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <TypographyStyles />
    </>
  )
}
