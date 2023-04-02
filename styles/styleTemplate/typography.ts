import { useEffect } from "react"


export type FontType = {
    fontFamily: string,
    fontStyle: string,
    fontWeight: string,
    fontSize: string,
    lineHeight: string,
}

type Header = 
'omerald_textStyle_monitor_Title1' | 'omerald_textStyle_mobile_Title2' | 'omerald_textStyle_tab_Title2' 
| 'omerald_textStyle_laptop_Title2' | 'omerald_textStyle_monitor_Title2' | 'omerald_textStyle_laptop_Title1' | 'omerald_textStyle_tab_Title1' 
| 'omerald_textStyle_mobile_Title1' 
| 'omerald_textStyle_monitor_Title3' | 'omerald_textStyle_mobile_Title3' | 'omerald_textStyle_tab_Title3' | 'omerald_textStyle_laptop_Title3'
export const header: Record<Header, FontType> = {
  omerald_textStyle_monitor_Title1: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: '60px',
    lineHeight: '80px',
  },
  omerald_textStyle_laptop_Title1: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '30px',
    lineHeight: '40px',
  },
  omerald_textStyle_tab_Title1: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '30px',
    lineHeight: '40px',
  },
  omerald_textStyle_mobile_Title1: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '30px',
    lineHeight: '40px',
  },
  omerald_textStyle_monitor_Title2: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: '32px',
    lineHeight: '60px',
  },
  omerald_textStyle_laptop_Title2: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '24px',
    lineHeight: '30px',
  },
  omerald_textStyle_tab_Title2: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '23px',
    lineHeight: '24px',
  },
  omerald_textStyle_mobile_Title2: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '20px',
  },
  omerald_textStyle_monitor_Title3: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '27px',
    lineHeight: '60px',
  },
  omerald_textStyle_laptop_Title3: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '20px',
    lineHeight: '30px',
  },
  omerald_textStyle_tab_Title3: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '24px',
  },
  omerald_textStyle_mobile_Title3: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '17px',
    lineHeight: '20px',
  },
}


type Title  = 'omerald_textStyle_monitor_Title1' | 'omerald_textStyle_tab_Title2' | 'omerald_textStyle_mobile_Title2' | 'omerald_textStyle_monitor_Title2' | 'omerald_textStyle_laptop_Title1' | 'omerald_textStyle_tab_Title1' | 'omerald_textStyle_mobile_Title1'
export const title: Record<Title, FontType> = {
  omerald_textStyle_monitor_Title1: {
    fontFamily: 'Arial Narrow',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '22px',
    lineHeight: '25px'
  },
  omerald_textStyle_laptop_Title1: {
    fontFamily: 'Arial Narrow',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '20px'
  },
  omerald_textStyle_tab_Title1: {
    fontFamily: 'Arial Narrow',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '22px',
    lineHeight: '25px'
  },
  omerald_textStyle_mobile_Title1:{
    fontFamily: 'Arial Narrow',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '16px'
  },
  omerald_textStyle_monitor_Title2: {
    fontFamily: 'Arial Narrow',
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: '20px',
    lineHeight: '30px'
  },
  omerald_textStyle_tab_Title2: {
    fontFamily: 'Arial Narrow',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '30px'
  },
  omerald_textStyle_mobile_Title2: {
    fontFamily: 'Arial Narrow',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '30px'
  },
}

type Button = 'omerald_textStyle_Button1' 
export const button : Record<Button, FontType> = {
  omerald_textStyle_Button1: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '12px',
    lineHeight: '16px',
  }
}

type Body   = 'omerald_textStyle_monitor_Body1' | 'omerald_textStyle_tab_Body1' | 'omerald_textStyle_laptop_Body1' | 'omerald_textStyle_mobile_Body1' | 'omerald_textStyle_Body2'
export const body: Record<Body, FontType> ={
  omerald_textStyle_monitor_Body1: {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '20px',
    lineHeight: '35px',
  },
  omerald_textStyle_laptop_Body1: {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '20px',
    lineHeight: '35px',
  },
  omerald_textStyle_tab_Body1:{
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '20px',
    lineHeight: '30px',
  },
  omerald_textStyle_mobile_Body1: {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '35px',
  },
  omerald_textStyle_Body2: {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '17px',
    lineHeight: '30px',
  }
}

