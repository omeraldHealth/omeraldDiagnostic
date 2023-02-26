type Header = 'omerald_textStyle_Header_1'
type Title  = 'omerald_textStyle_Title1'
type Button = 'omerald_textStyle_Button1' 
type Body   = 'omerald_textStyle_Body1'

type FontType = {
    fontFamily: string,
    fontStyle: string,
    fontWeight: string,
    fontSize: number,
    lineHeight: number,
}

export const header: Record<Header, FontType> = {
  omerald_textStyle_Header_1: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
  }
}

export const title: Record<Title, FontType> = {
  omerald_textStyle_Title1: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
  },
  omerald_textStyle_Title2: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 20,
  },
  omerald_textStyle_Title4: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
  },
}

export const button : Record<Button, FontType> = {
  omerald_textStyle_Button1: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
  }
}

export const body: Record<Body, FontType> ={
  omerald_textStyle_Body1: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
  }
}
