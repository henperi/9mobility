import theme from 'styled-theming';
// import { css } from 'styled-components';

export const Colors = {
  white: '#ffffff',
  black: '#022235',
  blackGrey: '#627382',
  darkGreen: '#006848',
  lightGreen: '#00987B',
  yellowGreen: '#B4C404',
  grey: '#DEDEDE',
  error: '#ff3e3ea6',
};

export const backgroundColor = theme.variants('mode', 'variant', {
  default: { light: Colors.white },
  primary: { light: Colors.darkGreen },
  secondary: { light: Colors.yellowGreen },
  Tertiary: { light: Colors.lightGreen },
  Neutral: { light: Colors.grey },
});

export const fontColor = theme.variants('mode', 'variant', {
  default: { light: Colors.blackGrey },
  darker: { light: Colors.black },
  lighter: { light: Colors.blackGrey },
  white: { light: Colors.white },
});

// export const cardStyles = theme('mode', {
//   light: css`
//     background: ${white};
//     color: ${black};
//   `,
//   dark: css`
//     background: ${black};
//     color: ${white};
//   `,
// });
