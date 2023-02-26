
import { Colors } from '@styles/index';
import { body, header, title } from '@styles/typography';
import styled from 'styled-components';

const screenWidth = typeof window !== "undefined" ? window.screen.width : null;

console.log(screenWidth)

export const TitleTextStyled = styled.text`
    ${screenWidth && screenWidth > 900 && title.omerald_textStyle_monitor_Title1}
    ${screenWidth && screenWidth > 771 && screenWidth < 900 && title.omerald_textStyle_laptop_Title1}
    ${screenWidth && screenWidth > 500 && screenWidth < 770 && title.omerald_textStyle_tab_Title1}
    ${screenWidth && screenWidth > 200 && screenWidth < 500 && title.omerald_textStyle_mobile_Title1}
    ${Colors.neutral.black}
`

export const TitleTextStyled_2 = styled.text`
    ${screenWidth && screenWidth > 900 && title.omerald_textStyle_monitor_Title2}
    ${screenWidth && screenWidth > 771 && screenWidth < 900 && title.omerald_textStyle_laptop_Title1}
    ${screenWidth && screenWidth > 500 && screenWidth < 770 && title.omerald_textStyle_tab_Title2}
    ${screenWidth && screenWidth > 200 && screenWidth < 500 && title.omerald_textStyle_mobile_Title2}
    ${Colors.neutral.black}
`

export const HeaderStyled_1 = styled.text`
    ${screenWidth && screenWidth > 900 && header.omerald_textStyle_monitor_Title1}
    ${screenWidth && screenWidth > 771 && screenWidth < 900 && header.omerald_textStyle_laptop_Title1}
    ${screenWidth && screenWidth > 500 && screenWidth < 770 && header.omerald_textStyle_tab_Title1}
    ${screenWidth && screenWidth > 200 && screenWidth < 500 && header.omerald_textStyle_mobile_Title1}
    ${Colors.neutral.black}
`

export const HeaderStyled_2 = styled.text`
    ${screenWidth && screenWidth > 900 && header.omerald_textStyle_monitor_Title2}
    ${screenWidth && screenWidth > 771 && screenWidth < 900 && header.omerald_textStyle_laptop_Title2}
    ${screenWidth && screenWidth > 500 && screenWidth < 770 && header.omerald_textStyle_tab_Title2}
    ${screenWidth && screenWidth > 200 && screenWidth < 500 && header.omerald_textStyle_mobile_Title2}
    ${Colors.neutral.black}
`

export const BodyStyled_1 = styled.text`
    ${screenWidth && screenWidth > 900 && body.omerald_textStyle_monitor_Body1}
    ${screenWidth && screenWidth > 771 && screenWidth < 900 && body.omerald_textStyle_laptop_Body1}
    ${screenWidth && screenWidth > 500 && screenWidth < 770 && body.omerald_textStyle_tab_Body1}
    ${screenWidth && screenWidth > 200 && screenWidth < 500 && body.omerald_textStyle_mobile_Body1}
    color:${Colors.neutral.omerald_color_text_info}
`

export const BodyStyled_2 = styled.text`
    ${screenWidth && screenWidth > 900 && body.omerald_textStyle_Body2}
    ${screenWidth && screenWidth > 771 && screenWidth < 900 && body.omerald_textStyle_Body2}
    ${screenWidth && screenWidth > 500 && screenWidth < 770 && body.omerald_textStyle_Body2}
    ${screenWidth && screenWidth > 200 && screenWidth < 500 && body.omerald_textStyle_Body2}
    color:${Colors.neutral.omerald_color_text_info}
`