import styled, { css } from 'styled-components';

export interface IColumn extends React.HTMLAttributes<HTMLDivElement> {
  xs?: IResponsive['size'];
  sm?: IResponsive['size'];
  md?: IResponsive['size'];
  lg?: IResponsive['size'];
  xl?: IResponsive['size'];
  useAppMargin?: boolean;
  fullHeight?: boolean;
  alignItems?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-envenly'
    | 'space-around';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-envenly'
    | 'space-around';
}

export enum ScreenSizes {
  xs = 0,
  sm = 420,
  md = 750,
  lg = 1124,
  xl = 1400,
}

enum Type {
  'up',
  'down',
}

interface IResponsive {
  size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  media?: ScreenSizes;
  type?: Type;
  useAppMargin?: boolean;
}

export const appMargin = 1;

const makeResponsive = ({
  size,
  media = ScreenSizes.xs,
  type = Type.up,
  useAppMargin = false,
}: IResponsive) => {
  const getBoundary = () => {
    if (type === Type.up) {
      return `min-width: ${media}px`;
    }

    if (type === Type.down) {
      return `max-width: ${media}px`;
    }

    return `min-width: ${media}px`;
  };

  const widthDeduction = useAppMargin ? appMargin * 2 : 0;

  return css`
    @media (${getBoundary()}) {
      margin: ${`0 ${Boolean(useAppMargin) && appMargin}% ${
        Boolean(useAppMargin) && appMargin * 2
      }%`};
      width: calc((${size} / 12 * 100%) - ${widthDeduction}%);
    }
  `;
};

const Column = styled.div.attrs(() => ({}))<IColumn>`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: fit-content; */
  height: ${({ fullHeight }) => (fullHeight ? 'inherit' : 'fit-content')};
  min-height: ${({ fullHeight }) => (fullHeight ? 'inherit' : 'fit-content')};

  ${({ alignItems }) =>
    alignItems &&
    css`
      justify-content: ${alignItems};
    `};

  ${({ justifyContent }) =>
    justifyContent &&
    css`
      align-items: ${justifyContent};
    `};

  ${({ xs, useAppMargin }) =>
    xs &&
    makeResponsive({
      size: xs,
      media: ScreenSizes.xs,
      useAppMargin,
    })}
  ${({ sm, useAppMargin }) =>
    sm &&
    makeResponsive({
      size: sm,
      media: ScreenSizes.sm,
      useAppMargin,
    })}
    ${({ md, useAppMargin }) =>
    md &&
    makeResponsive({
      size: md,
      media: ScreenSizes.md,
      useAppMargin,
    })}
    ${({ lg, useAppMargin }) =>
    lg &&
    makeResponsive({
      size: lg,
      media: ScreenSizes.lg,
      useAppMargin,
    })}
    ${({ xl, useAppMargin }) =>
    xl &&
    makeResponsive({
      size: xl,
      media: ScreenSizes.xl,
      useAppMargin,
    })};
`;

const Styles = {
  Column,
};

export { Styles };
