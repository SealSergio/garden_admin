import "./Icon.scss";

interface IconsProps extends React.SVGProps<SVGSVGElement> {
    customClass?: string | null,
}

export const EditingIcon: React.FC<IconsProps> = ({ customClass = null, ...rest }) => {
    return (
        <svg
            {...rest}
            className={customClass ? `icon ${customClass}` : "icon"}
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            height="512.000000pt"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
            stroke="none">
            <path d="M3850 4935 c-36 -8 -103 -33 -149 -56 -76 -37 -103 -59 -253 -208 l-169 -166 565 -564 565 -565 140 133 c198 188 258 272 296 416 19 76 19 210
            -1 289 -33 129 -73 186 -279 394 -110 112 -217 212 -255 237 -131 87 -314 123
            -460 90z"/>
            <path d="M1869 3087 c-756 -753 -1183 -1186 -1197 -1212 -31 -62 -284 -1069
            -285 -1135 -1 -138 95 -242 240 -260 65 -8 82 -5 586 121 285 71 537 139 560
            150 42 21 1449 1416 2109 2091 l300 308 -557 552 c-307 304 -563 554 -569 555
            -6 1 -540 -525 -1187 -1170z"/>
            </g>
        </svg>
    )
}

export const DeletionIcon: React.FC<IconsProps> = ({ customClass = null, ...rest }) => {
    return (
        <svg
            {...rest}
            className={customClass ? `icon ${customClass}` : "icon"}
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
            stroke="none">
            <path d="M665 5114 c-312 -50 -558 -270 -641 -575 -27 -99 -25 -291 4 -392 26
            -89 70 -182 118 -247 18 -25 323 -335 678 -690 l646 -645 -643 -645 c-354
            -355 -660 -668 -680 -696 -47 -66 -102 -182 -124 -264 -24 -89 -24 -290 1
            -379 75 -275 282 -482 557 -557 97 -27 290 -25 392 4 95 27 196 77 262 129 28
            22 337 327 688 678 l637 638 638 -638 c350 -351 659 -656 687 -678 66 -52 167
            -102 262 -129 102 -29 295 -31 392 -4 275 75 482 282 557 557 27 97 25 290 -4
            392 -25 89 -69 180 -120 252 -20 28 -325 340 -679 695 l-643 645 646 645 c355
            355 660 665 678 690 49 65 93 158 118 247 29 102 31 295 4 392 -75 275 -282
            482 -557 557 -89 25 -290 25 -379 1 -82 -22 -198 -77 -264 -124 -28 -20 -340
            -325 -693 -677 l-643 -640 -642 640 c-354 352 -665 656 -693 676 -128 91 -266
            138 -425 143 -58 2 -118 1 -135 -1z"/>
            </g>
        </svg>
    )
}
