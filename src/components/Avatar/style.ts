import styled from 'styled-components';
import { rem } from '../../utils/rem';
import { Colors } from '../../themes/colors';

const Avatar = styled.div`
  height: ${rem(32)};
  width: ${rem(32)};
  min-height: ${rem(32)};
  min-width: ${rem(32)};
  border-radius: 50%;
  background-color: ${Colors.lightGreen};
  overflow: hidden;

  img {
    object-fit: cover;
    height: ${rem(32)};
    width: ${rem(32)};
  }
`;

export const Styles = {
  Avatar,
};
