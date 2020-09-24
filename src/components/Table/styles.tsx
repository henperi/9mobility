// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Table as RespTable } from 'react-super-responsive-table';
import styled from 'styled-components';
import { ScreenSizes } from '../Column/styles';

// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const Table = styled(RespTable)`
  /* @import url('react-super-responsive-table/dist/SuperResponsiveTableStyle.css'); */
  /* inspired by: https://css-tricks.com/responsive-data-tables/ */
  &.responsiveTable {
    width: 100%;
  }

  &.responsiveTable td .tdBefore {
    display: none;
  }

  @media screen and (max-width: 40em) {
    /*
    Force table elements to not behave like tables anymore
    Hide table headers (but not display: none;, for accessibility)
  */

    &.responsiveTable table,
    &.responsiveTable thead,
    &.responsiveTable tbody,
    &.responsiveTable th,
    &.responsiveTable td,
    &.responsiveTable tr {
      display: block;
    }

    &.responsiveTable thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
      border-bottom: 2px solid #333;
    }

    &.responsiveTable tbody tr {
      border: 1px solid #000;
      padding: 0.25em;
    }

    &.responsiveTable td.pivoted {
      /* Behave like a "row" */
      border: none !important;
      position: relative;
      padding-left: calc(50% + 10px) !important;
      text-align: left !important;
      white-space: pre-wrap;
      overflow-wrap: break-word;
    }

    &.responsiveTable td .tdBefore {
      /* Now like a table header */
      position: absolute;
      display: block;

      /* Top/left values mimic padding */
      left: 1rem;
      width: calc(50% - 20px);
      white-space: pre-wrap;
      overflow-wrap: break-word;
      text-align: left !important;
      font-weight: 600;
    }
  }

  /** Custom Table Styling Starts Here */

  border-spacing: 0;

  tr {
    &:nth-child(even) {
      background-color: #f8f8f8;
    }

    th {
      padding: 10px 28px;
      font-weight: lighter;
      color: #627382;
      text-align: left;
    }

    td {
      padding: 10px 28px;
      font-weight: lighter;
      color: #022235;
    }
  }

  tr {
    @media screen and (max-width: ${ScreenSizes.md}px) {
      border: unset !important;
      box-shadow: 0 50px 25px 1px rgba(0, 0, 0, 0.1);
      margin-bottom: 10px;
      background-color: #fff !important;
    }
  }
`;

export const Style = { Table };
