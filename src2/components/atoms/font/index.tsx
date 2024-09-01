import { FontTextProp, NavTextProps } from '@utils/index';
import React, { FC } from 'react';
import {
  BodyStyled_1,
  BodyStyled_2,
  BodyStyled_3,
  HeaderStyled_1,
  HeaderStyled_2,
  HeaderStyled_3,
  TitleTextStyled,
  TitleTextStyled_2,
} from './font.style';

export const CopyRightFont: FC<NavTextProps> = ({ children }: NavTextProps) => (
  <span className={'font-md text-base leading-[26px]'}>{children}</span>
);

export const FooterHeaderFont: FC<NavTextProps> = ({
  children,
}: NavTextProps) => <span className={'font-sm text-xl'}>{children}</span>;

export const FooterLinkFont: FC<NavTextProps> = ({
  children,
}: NavTextProps) => (
  <span className={'font-sm text-md text-[#181433] my-4'}>{children}</span>
);

export const TitleText: FC<FontTextProp> = ({
  style,
  children,
}: FontTextProp) => (
  <span className={`${style}`}>
    <TitleTextStyled>{children}</TitleTextStyled>
  </span>
);

export const TitleText_2: FC<FontTextProp> = ({
  style,
  children,
}: FontTextProp) => (
  <span className={`${style}`}>
    <TitleTextStyled_2>{children}</TitleTextStyled_2>
  </span>
);

export const HeaderText_1: FC<FontTextProp> = ({
  style,
  children,
}: FontTextProp) => (
  <span className={`${style}`}>
    <HeaderStyled_1>{children}</HeaderStyled_1>
  </span>
);

export const HeaderText_2: FC<FontTextProp> = ({
  style,
  children,
}: FontTextProp) => (
  <span className={`${style}`}>
    <HeaderStyled_2>{children}</HeaderStyled_2>
  </span>
);

export const HeaderText_3: FC<FontTextProp> = ({
  style,
  children,
}: FontTextProp) => (
  <span className={`${style}`}>
    <HeaderStyled_3>{children}</HeaderStyled_3>
  </span>
);

export const BodyText_1: FC<FontTextProp> = ({
  style,
  children,
}: FontTextProp) => (
  <span className={`${style}`}>
    <BodyStyled_1>{children}</BodyStyled_1>
  </span>
);

export const BodyText_2: FC<FontTextProp> = ({
  style,
  children,
}: FontTextProp) => (
  <span className={`${style}`}>
    <BodyStyled_2>{children}</BodyStyled_2>
  </span>
);

export const BodyText_3: FC<FontTextProp> = ({
  style,
  children,
}: FontTextProp) => (
  <span className={`${style}`}>
    <BodyStyled_3>{children}</BodyStyled_3>
  </span>
);
