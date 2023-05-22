import type { Direction, Config } from '../types'
// 对象或者方法 最后返回的是对象
export const preset = () => {
  interface Direction1 {
    [key: string]: string
    t: 'top'
    b: 'bottom'
    l: 'left'
    r: 'right'
  }
  let direction: Direction1 = { t: 'top', b: 'bottom', l: 'left', r: 'right' }
  let dic = { bg: 'background-color', c: 'color', color: 'color' }
  let globalValues = ['inherit', 'initial', 'revert', 'revert-layer', 'unset']

  let radiusFun = (match: RegExpMatchArray, { unit }: Config) => {
    let direction: Direction = {
      t: 'top',
      b: 'bottom',
      l: 'left',
      r: 'right',
      tr: 'top-right',
      tl: 'top-left',
      bl: 'bottom-left',
      br: 'bottom-right'
    }
    let radius1 = `${match[3]}${match[7] || unit}`
    let radius2 = match[4] ? ' ' + match[4] + (match[7] || unit) : ''
    let radius3 = match[5] ? ' ' + match[5] + (match[7] || unit) : ''
    let radius4 = match[6] ? ' ' + match[6] + (match[7] || unit) : ''

    return `border${
      match[2] ? '-' + direction[match[2]] : ''
    }-radius:${radius1}${radius2}${radius3}${radius4}`
  }

  let marginUnit = (match: RegExpMatchArray, { unit }: Config) => {
    if (match[1] === 'auto') return ''
    return match[2] ? match[2] : unit
  }
  // let unitOrNull = unit => {
  //   return unit ? unit : ''
  // }
  return {
    rules: [
      [
        /^line-(\d{1,2})$/,
        (match: RegExpMatchArray) =>
          `-webkit-line-clamp: ${match[1]};overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;`
      ],

      ['color-none', 'color: transparent;'],
      ['c-none', 'color: transparent;'],
      [
        /^(color|c)-#([0-9a-fA-F]{1,6})$/,
        (match: RegExpMatchArray) =>
          `color:#${
            match[2].length === 3
              ? match[2]
              : match[2].repeat(6 / match[2].length)
          };`
      ],
      [
        /^(color|c)-v-([\w-_]{1,20})$/,
        (match: RegExpMatchArray) => `color:var(--${match[2]});`
      ],
      [
        /^(color|c)-([^#][a-z]{1,20})$/,
        (match: RegExpMatchArray) =>
          `color:${match[2] == 'cur' ? 'currentcolor' : match[2]};`
      ],
      [
        /^gba-(\d{1,3})-(\d{1,3})-(\d{1,3})$/,
        (match: RegExpMatchArray) =>
          `color:gba(${match[1]}%,${match[2]}%,${match[3]}%);`
      ],
      [
        /^rgba-(\d{1,3})-(\d{1,3})-(\d{1,3})-((\d{1,4})|(?:0*\.(\d{1,4})))$/,
        (match: RegExpMatchArray) =>
          `color:rgba(${match[1]},${match[2]},${match[3]},${
            match[4].includes('.') ? match[4] : '.' + match[4]
          });`
      ],

      [
        /^bg-#([0-9a-fA-F]{1,6})$/,
        (match: RegExpMatchArray) =>
          `background-color:#${
            match[1].length === 3
              ? match[1]
              : match[1].repeat(6 / match[1].length)
          };`
      ],
      [
        /^bg-v-([\w-_]{1,20})$/,
        (match: RegExpMatchArray) => `background-color:var(--${match[1]});`
      ],
      [
        /^bg-([^#][a-z]{1,40})$/,
        (match: RegExpMatchArray) => `background-color:${match[1]};`
      ],
      [
        /^bg-rgba-(\d{1,3})-(\d{1,3})-(\d{1,3})-((\d{1,4})|(?:0*\.(\d{1,4})))$/,
        (match: RegExpMatchArray) =>
          `background-color:rgba(${match[1]},${match[2]},${match[3]},${
            match[4].includes('.') ? match[4] : '.' + match[4]
          });`
      ],
      [
        /^bg-gba-(\d{1,3})-(\d{1,3})-(\d{1,3})$/,
        (match: RegExpMatchArray) =>
          `background-color:gba(${match[1]},${match[2]},${match[3]});`
      ],
      // [/^bg-linear-(\d+)-(\d+)-(\d+)$/, (match) => `color:rgba(${match[1]},${match[2]},${match[3]});`],
      //  background: linear-gradient(to right,
      //       red, orange, yellow, green, blue, indigo, violet);
      // }
      // .radial-gradient {
      //   background: radial-gradient(red, yellow, rgb(30, 144, 255));
      // }

      [
        /^fs-(\d*\.?\d+)(rem|vh|vw|px|rpx|em)?$/,
        (match: RegExpMatchArray, { unit }: Config) =>
          `font-size: ${match[1]}${match[2] ? match[2] : unit};`
      ],
      [
        /^fw-(\d{1,4})$/,
        (match: RegExpMatchArray, { unit }: Config) =>
          `font-weight: ${match[1]};`
      ],
      [
        /^lh-(\d*\.?\d+)(rem|vh|vw|px|rpx|em)?$/,
        (match: RegExpMatchArray, { unit }: Config) =>
          `line-height: ${match[1]}${match[2] ? match[2] : ''};`
      ],

      [/^(?:f|flex)-(\d+)$/, (match: RegExpMatchArray) => `flex: ${match[1]};`],
      {
        'text-left': 'text-align: left;',
        'text-center': 'text-align: center;',
        'text-right': 'text-align: right;',
        'text-justify': 'text-align: justify;',

        underline: 'text-decoration: underline;',
        'line-through': 'text-decoration: line-through;',
        'no-decoration': 'text-decoration: none;',

        uppercase: 'text-transform: uppercase;',
        lowercase: 'text-transform: lowercase;',
        capitalize: 'text-transform: capitalize;',
        'normal-case': 'text-transform: none;',

        'align-baseline': 'vertical-align: baseline;',
        'align-top': 'vertical-align: top;',
        'align-middle': 'vertical-align: middle;',
        'align-bottom': 'vertical-align: bottom;',
        'align-text-top': 'vertical-align: text-top;',
        'align-text-bottom': 'vertical-align: text-bottom;'

        // break-normal	overflow-wrap: normal;word-break: normal;
        // break-words	overflow-wrap: break-word;
        // break-all	word-break: break-all;
      },
      [
        /^m-(-?\d*\.?\d+|auto)-(\d*\.?\d+|auto)$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          margin: `${match[1]}${match[1] === 'auto' ? '' : unit} ${match[2]}${
            match[2] === 'auto' ? '' : unit
          };`
        })
      ],
      [
        /^m-(-?\d*\.?\d+|auto)(em|rem|vh|vw|%|px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          margin: `${match[1]}${marginUnit(match, { unit })};`
        })
      ],
      [
        /^mt-(-?\d*\.?\d+|auto)(em|rem|vh|vw|%|px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          'margin-top': `${match[1]}${marginUnit(match, { unit })};`
        })
      ],
      [
        /^mb-(-?\d*\.?\d+|auto)(em|rem|vh|vw|%|px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          'margin-bottom': `${match[1]}${marginUnit(match, { unit })};`
        })
      ],
      [
        /^ml-(-?\d*\.?\d+|auto)(em|rem|vh|vw|%|px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          'margin-left': `${match[1]}${marginUnit(match, { unit })};`
        })
      ],
      [
        /^mr-(-?\d*\.?\d+|auto)(em|rem|vh|vw|%|px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          'margin-right': `${match[1]}${marginUnit(match, { unit })};`
        })
      ],
      [
        /^mlr-(-?\d*\.?\d+|auto)(em|rem|vh|vw|%|px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) =>
          `margin-left:${match[1]}${marginUnit(match, { unit })};margin-right:${
            match[1]
          }${marginUnit(match, { unit })};`
      ],
      [
        /^mtb-(-?\d*\.?\d+|auto)(em|rem|vh|vw|%|px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) =>
          `margin-top:${match[1]}${marginUnit(match, { unit })};margin-bottom:${
            match[1]
          }${marginUnit(match, { unit })};`
      ],
      [
        /^m-(\d*\.?\d+)-(\d*\.?\d+)-(\d*\.?\d+)-(\d*\.?\d+)$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          margin: `${match[1]}${unit} ${match[2]}${unit} ${match[3]}${unit} ${match[4]}${unit};`
        })
      ],

      ['p-auto', 'padding:auto;'],
      [
        /^p-(\d*\.?\d+|auto)-(\d+|auto)$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          padding: `${match[1]}${match[1] === 'auto' ? '' : unit} ${match[2]}${
            match[2] === 'auto' ? '' : unit
          };`
        })
      ],
      [
        /^p-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          padding: `${match[1]}${marginUnit(match, { unit })}`
        })
      ],
      [
        /^pt-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          'padding-top': `${match[1]}${marginUnit(match, { unit })}`
        })
      ],
      [
        /^pb-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          'padding-bottom': `${match[1]}${marginUnit(match, { unit })}`
        })
      ],
      [
        /^pl-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          'padding-left': `${match[1]}${marginUnit(match, { unit })}`
        })
      ],
      [
        /^pr-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          'padding-right': `${match[1]}${marginUnit(match, { unit })}`
        })
      ],
      [
        /^ptb-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) =>
          `padding-top:${match[1]}${marginUnit(match, {
            unit
          })};padding-bottom:${match[1]}${marginUnit(match, { unit })};`
      ],
      [
        /^plr-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) =>
          `padding-left:${match[1]}${marginUnit(match, {
            unit
          })};padding-right:${match[1]}${marginUnit(match, { unit })};`
      ],
      [
        /^p-(\d*\.?\d+)-(\d*\.?\d+)-(\d*\.?\d+)-(\d*\.?\d+)$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          padding: `${match[1]}${unit} ${match[2]}${unit} ${match[3]}${unit} ${match[4]}${unit};`
        })
      ],

      [
        /^(icon)-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) =>
          `width:${match[2]}${match[3] ? match[3] : unit};height:${match[2]}${
            match[3] ? match[3] : unit
          };`
      ],
      [
        /^(width|w)-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          width: `${match[2]}${match[3] ? match[3] : unit};`
        })
      ],
      [
        /^(height|h)-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          height: `${match[2]}${match[3] ? match[3] : unit};`
        })
      ],
      [
        /^min-w-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          'min-width': `${match[1]}${marginUnit(match, { unit })};`
        })
      ],
      [
        /^min-h-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          'min-height': `${match[1]}${marginUnit(match, { unit })};`
        })
      ],
      [
        /^max-w-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          'max-width': `${match[1]}${marginUnit(match, { unit })};`
        })
      ],
      [
        /^max-h-(\d*\.?\d+)(em|rem|vh|vw|%|px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          'max-height': `${match[1]}${marginUnit(match, { unit })};`
        })
      ],
      // {
      // 	'min-w-min': 'min-width: min-content;',
      // 	'min-w-max': 'min-width: max-content;',
      // 	'min-w-none': 'min-width: none;',
      // 	'max-w-min': 'max-width: min-content;',
      // 	'max-w-max': 'max-width: max-content;',
      // 	'max-w-none': 'max-width: none;',

      // 	'min-h-min': 'min-height: min-content;',
      // 	'min-h-max': 'min-height: max-content;',
      // 	'min-h-none': 'min-height: none;',
      // 	'max-h-min': 'max-height: min-content;',
      // 	'max-h-max': 'max-height: max-content;',
      // 	'max-h-none': 'max-height: none;',
      // },

      [
        /^order-(-?\d*\.?\d+)$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          order: `${match[1]};`
        })
      ],

      [
        /^border(?:-(\d+))?(?:-(solid|dashed|dotted|double|groove|ridge|inset|outset))?(?:-#([0-9a-fA-F]{1,6}))?$/,
        (match: RegExpMatchArray, { unit }: Config) =>
          `border:${match[1] || '1'}${unit} ${match[2] || 'solid'} #${
            match[3] && match[3].length === 3
              ? match[3]
              : (match[3] && match[3].repeat(6 / match[3].length)) || 'c1c1c1'
          };`
      ],
      [
        /^border(?:-(\d+))?(?:-#([0-9a-fA-F]{1,6}))?(?:-(solid|dashed|dotted|double|groove|ridge|inset|outset))?$/,
        (match: RegExpMatchArray, { unit }: Config) =>
          `border:${match[1] || '1'}${unit} ${match[3] || 'solid'} #${
            match[2] && match[2].length === 3
              ? match[2]
              : (match[2] && match[2].repeat(6 / match[2].length)) || 'c1c1c1'
          };`
      ],
      [
        /^border(?:-(solid|dashed|dotted|double|groove|ridge|inset|outset))?(?:-#([0-9a-fA-F]{1,6}))?(?:-(\d{1,6}))?$/,
        (match: RegExpMatchArray, { unit }: Config) =>
          `border:${match[3] || '1'}${unit} ${match[1] || 'solid'} #${
            match[2] && match[2].length === 3
              ? match[2]
              : (match[2] && match[2].repeat(6 / match[2].length)) || 'c1c1c1'
          };`
      ],
      [
        /^border(?:-(solid|dashed|dotted|double|groove|ridge|inset|outset))?(?:-(\d{1,6}))?(?:-#([0-9a-fA-F]{1,6}))?$/,
        (match: RegExpMatchArray, { unit }: Config) =>
          `border:${match[2] || '1'}${unit} ${match[1] || 'solid'} #${
            match[3] && match[3].length === 3
              ? match[3]
              : (match[3] && match[3].repeat(6 / match[3].length)) || 'c1c1c1'
          };`
      ],
      [
        /^border(?:-#([0-9a-fA-F]{1,6}))?(?:-(solid|dashed|dotted|double|groove|ridge|inset|outset))?(?:-(\d{1,6}))?$/,
        (match: RegExpMatchArray, { unit }: Config) =>
          `border:${match[3] || '1'}${unit} ${match[2] || 'solid'} #${
            match[1] && match[1].length === 3
              ? match[1]
              : (match[1] && match[1].repeat(6 / match[1].length)) || 'c1c1c1'
          };`
      ],
      [
        /^border(?:-#([0-9a-fA-F]{1,6}))?(?:-(\d{1,6}))?(?:-(solid|dashed|dotted|double|groove|ridge|inset|outset))?$/,
        (match: RegExpMatchArray, { unit }: Config) =>
          `border:${match[2] || '1'}${unit} ${match[3] || 'solid'} #${
            match[1] && match[1].length === 3
              ? match[1]
              : (match[1] && match[1].repeat(6 / match[1].length)) || 'c1c1c1'
          };`
      ],

      [
        /^(br|radius|rounded)(?:-(tr|tl|br|bl))?-?(\d+)-?(\d+)?-?(\d+)?-?(\d+)?(rem|em|px|rpx|%)?$/,
        radiusFun
      ],
      [
        /^bw-?(t|l|r|b)?-(\d+)(px|rpx)?$/,
        (match: RegExpMatchArray, { unit }: Config) =>
          `border${match[1] ? '-' + direction[match[1]] : ''}-width:${
            match[2]
          }${unit};`
      ],
      [
        /^bc-#([\d\w]{1,6})$/,
        (match: RegExpMatchArray) =>
          `border-color:#${match[1].repeat(6 / match[1].length)};`
      ],
      ['bc-none', 'border-color: transparent;'],
      [
        /^bs-(solid|dashed|dotted|double|groove|ridge|inset|outset|none)$/,
        (match: RegExpMatchArray) => `border-style:${match[1]};`
      ],

      [
        /^(top|t)-(-?\d*\.?\d+)(rem|vh|vw|%)?$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          top: `${match[2]}${match[3] ? match[3] : unit};`
        })
      ],
      [
        /^(left|l)-(-?\d*\.?\d+)(rem|vh|vw|%)?$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          left: `${match[2]}${match[3] ? match[3] : unit};`
        })
      ],
      [
        /^(right|r)-(-?\d*\.?\d+)(rem|vh|vw|%)?$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          right: `${match[2]}${match[3] ? match[3] : unit};`
        })
      ],
      [
        /^(bottom|b)-(-?\d*\.?\d+)(rem|vh|vw|%)?$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          bottom: `${match[2]}${match[3] ? match[3] : unit};`
        })
      ],
      [
        /^inset-(-?0?\.?\d*)(rem|vh|vw|%)?$/,
        (match: RegExpMatchArray, { unit }: Config) =>
          `top: ${match[1]}${match[2] || unit};right: ${match[1]}${
            match[2] || unit
          };bottom: ${match[1]}${match[2] || unit};left: ${match[1]}${
            match[2] || unit
          };`
      ],

      [
        /^z-(-?\d+|auto)$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          'z-index': `${match[1]};`
        })
      ],

      [
        /^shadow-?(\d+)?-?(\d+)?-?(\d+)?-?(\d+)?-?(0?\.\d+)?$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          'box-shadow': `${match[1] || '0'}px ${match[2] || '4'}px ${
            match[3] || '12'
          }px ${match[4] || '0'}px rgba(0, 0, 0, ${match[5] || '0.1'});`
        })
      ],
      [
        /^opacity-(0?\.?\d+)$/,
        (match: RegExpMatchArray, { unit }: Config) => ({
          opacity: `${match[1]}`
        })
      ],
      [
        /^translateX-(-?0?\.?\d+)(rem|vh|vw|%)?$/,
        (match: RegExpMatchArray, { unit }: Config) =>
          `transform:translateX(${match[1]}${match[2] || unit})`
      ],
      [
        /^translateY-(-?0?\.?\d+)(rem|vh|vw|%)?$/,
        (match: RegExpMatchArray, { unit }: Config) =>
          `transform:translateY(${match[1]}${match[2] || unit})`
      ],

      {
        flex: 'display: flex;',
        grid: 'display: grid;',
        none: 'display: none;',
        block: 'display: block;',
        'inline-block': 'display: inline-block;',

        static: 'position: static;',
        fixed: 'position: fixed;',
        absolute: 'position: absolute;',
        relative: 'position: relative;',
        sticky: 'position: sticky;',

        visible: 'visibility: visible;',
        invisible: 'visibility: hidden;',

        // overflow-auto	overflow: auto;
        // overflow-hidden	overflow: hidden;
        // overflow-visible	overflow: visible;
        // overflow-scroll	overflow: scroll;
        // overflow-x-auto	overflow-x: auto;
        // overflow-y-auto	overflow-y: auto;
        // overflow-x-hidden	overflow-x: hidden;
        // overflow-y-hidden	overflow-y: hidden;
        // overflow-x-visible	overflow-x: visible;
        // overflow-y-visible	overflow-y: visible;
        // overflow-x-scroll	overflow-x: scroll;
        // overflow-y-scroll	overflow-y: scroll;

        isolate: 'isolation: isolate;',
        'isolation-auto': 'isolation: auto;',

        poiter: 'cursor: pointer;',
        'box-border': '	box-sizing: border-box;',
        'box-content': 'box-sizing: content-box;',

        wrap: 'flex-wrap:wrap;',
        row: 'flex-direction: row',
        column: 'flex-direction: column',

        'ai-c': 'align-items: center;',
        'ai-s': 'align-items: flex-start;',
        'ai-e': 'align-items: flex-end;',

        'jc-s': ' justify-content: flex-start;',
        'jc-c': 'justify-content: center;',
        'jc-e': 'justify-content: flex-end;',
        'jc-sb': 'justify-content: space-between;',
        'jc-sa': 'justify-content: space-around;',
        'jc-se': 'justify-content: sspace-evenly;',

        'as-s': 'align-self: flex-start;',
        'as-e': 'align-self: flex-end;',
        'as-c': 'align-self: center;',
        'as-b': 'align-self: baseline;',
        'as-st': 'align-self: stretch;',
        'text-l': 'text-align: left;',
        'ta-l': 'text-align: left;',
        'ta-c': 'text-align: center;',
        'ta-r': 'text-align: right;',
        'ta-j': 'text-align: justify;text-align-last: justify;',
        'text-c': 'text-align: center;',
        'text-r': 'text-align: right;',
        'text-j': 'text-align: justify;text-align-last: justify;',

        // 'line': ' border-bottom: 2px solid #CDCDCD; width: 100%;height: 2px;',
        // 'line-dark': ' border-bottom: 2px solid #797B89; width: 100%;height: 2px;',
        'td-lt': 'text-decoration: line-through;',
        'un-line': 'text-decoration: underline;',
        'fw-b': 'font-weight: bold;',
        'scroll-y': ' overflow-y: scroll;',
        'scroll-x': ' overflow-x: scroll;'
      }
    ],
    // 组合
    shortcuts: [
      // 静态规则
      // {
      // 	'card-glass': 'bg-gradient-glass c-white w-142 h-168 radius-8 col-center border-f-3',
      // 	'btn-plain': 'border-main c-main radius-2 p-14 plr-20  row-center',
      // 	'btn-main': 'bg-main c-fff radius-4 p-14 row-center',
      // }
      // 动态规则
      [
        /^(br|radius|rounded)-(t|l|r|b)-(\d+)(rem|em|px|rpx|%)?$/,
        (match: RegExpMatchArray) => {
          type Direction = {
            [key: string]: [string, string]
            t: [string, string]
            b: [string, string]
            l: [string, string]
            r: [string, string]
          }
          let direction: Direction = {
            t: ['tl', 'tr'],
            b: ['bl', 'br'],
            l: ['tl', 'bl'],
            r: ['tr', 'br']
          }
          return `radius-${direction[match[2]][0]}-${match[3]}${
            match[4] || ''
          } radius-${direction[match[2]][1]}-${match[3]}${match[4] || ''}`
        }
      ]
    ]
  }
}

export default preset
