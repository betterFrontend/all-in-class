const t = () => {
	let t = { t: "top", b: "bottom", l: "left", r: "right" };
	// 'Aqua,Black,Blue,Fuchsia,Gray,Grey,Green,Lime,Maroon,Navy,Olive,Orange,Purple,Red,Silver,Teal,White,Yellow,'
	return {
		rules: [
			// /#[A-Fa-f0-9]{3}([A-Fa-f0-9]{3})?/
			[/^line-(\d+)$/, t =>
				`-webkit-line-clamp: ${t[1]};overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;`
			],
			[/^(color|c)-#([A-Fa-f0-9]{1,3}|[A-Fa-f0-9]{6})$/, t => `color:#${3===t[2].length?t[2]:t[2].repeat(6/t[2].length)};`],
			[/^(color|c)-v-([\w-_]+)$/, t => `color:var(--${t[2]});`],
			[/^(color|c)-([^#][a-z]+)$/, t => `color:${"cur"==t[2]?"currentcolor":t[2]};`],
			[/^gba-(\d+)-(\d+)-(\d+)$/, t => `color:gba(${t[1]},${t[2]},${t[3]});`],
			[/^rgba-(\d+)-(\d+)-(\d+)-((\d+)|(?:0*\.(\d+)))$/, t =>
				`color:rgba(${t[1]},${t[2]},${t[3]},${t[4].includes(".")?t[4]:"."+t[4]});`
			],
			[/^bg-#([\d\w]+)$/, t => `background-color:#${3===t[1].length?t[1]:t[1].repeat(6/t[1].length)};`],
			[/^bg-v-([\w-_]+)$/, t => `background-color:var(--${t[1]});`],
			[/^bg-([^#][a-z]+)$/, t => `background-color:${t[1]};`],
			[/^bg-rgba-(\d+)-(\d+)-(\d+)-((\d+)|(?:0*\.(\d+)))$/, t =>
				`background-color:rgba(${t[1]},${t[2]},${t[3]},${t[4].includes(".")?t[4]:"."+t[4]});`
			],
			[/^bg-gba-(\d+)-(\d+)-(\d+)$/, t => `background-color:gba(${t[1]},${t[2]},${t[3]});`],
			[/^bg-linear-(\d+)-(\d+)-(\d+)$/, t => `color:rgba(${t[1]},${t[2]},${t[3]});`],
			[/^fs-(\d*\.?\d+)(rem|vh|vw|px|rpx|em)?$/, (t, { unit: e }) => `font-size: ${t[1]}${t[2]?t[2]:e};`],
			[/^fw-(\d+)$/, (t, { unit: e }) => `font-weight: ${t[1]};`],
			[/^lh-(\d*\.?\d+)(rem|vh|vw|px|rpx|em)?$/, (t, { unit: e }) =>
				`line-height: ${t[1]}${t[2]?t[2]:""};`
			],
			[/^(?:f|flex)-(\d+)$/, t => `flex: ${t[1]};`],
			[/^m-(-?\d*\.?\d+|auto)-(\d*\.?\d+|auto)$/, (t, { unit: e }) =>
				({ margin: `${t[1]}${"auto"===t[1]?"":e} ${t[2]}${"auto"===t[2]?"":e};` })
			],
			[/^m-(-?\d*\.?\d+)(rem|vh|vw|%|px|rpx)?$/, (t, { unit: e }) =>
				({ margin: `${t[1]}${t[2]?t[2]:e};` })
			],
			[/^mt-(-?\d*\.?\d+)(rem|vh|vw|%|px|rpx)?$/, (t, { unit: e }) =>
				({ "margin-top": `${t[1]}${t[2]?t[2]:e};` })
			],
			[/^mb-(-?\d*\.?\d+)(rem|vh|vw|%|px|rpx)?$/, (t, { unit: e }) =>
				({ "margin-bottom": `${t[1]}${t[2]?t[2]:e};` })
			],
			[/^ml-(-?\d*\.?\d+)(rem|vh|vw|%|px|rpx)?$/, (t, { unit: e }) =>
				({ "margin-left": `${t[1]}${t[2]?t[2]:e};` })
			],
			[/^mr-(-?\d*\.?\d+)(rem|vh|vw|%|px|rpx)?$/, (t, { unit: e }) =>
				({ "margin-right": `${t[1]}${t[2]?t[2]:e};` })
			],
			[/^mlr-(-?\d*\.?\d+)(rem|vh|vw|%|px|rpx)?$/, (t, { unit: e }) =>
				`margin-left:${t[1]}${t[2]?t[2]:e};margin-right:${t[1]}${t[2]?t[2]:e};`
			],
			[/^mtb-(-?\d*\.?\d+)(rem|vh|vw|%|px|rpx)?$/, (t, { unit: e }) =>
				`margin-top:${t[1]}${t[2]?t[2]:e};margin-bottom:${t[1]}${t[2]?t[2]:e};`
			],
			[/^m-(\d*\.?\d+)-(\d*\.?\d+)-(\d*\.?\d+)-(\d*\.?\d+)$/, (t, { unit: e }) =>
				({ margin: `${t[1]}${e} ${t[2]}${e} ${t[3]}${e} ${t[4]}${e};` })
			],
			[/^p-(\d*\.?\d+|auto)-(\d+|auto)$/, (t, { unit: e }) =>
				({ padding: `${t[1]}${"auto"===t[1]?"":e} ${t[2]}${"auto"===t[2]?"":e};` })
			],
			[/^p-(\d*\.?\d+)(rem|vh|vw|%|px|rpx)?$/, (t, { unit: e }) =>
				({ padding: `${t[1]}${t[2]?t[2]:e}` })
			],
			[/^pt-(\d*\.?\d+)(rem|vh|vw|%|px|rpx)?$/, (t, { unit: e }) =>
				({ "padding-top": `${t[1]}${t[2]?t[2]:e}` })
			],
			[/^pb-(\d*\.?\d+)(rem|vh|vw|%|px|rpx)?$/, (t, { unit: e }) =>
				({ "padding-bottom": `${t[1]}${t[2]?t[2]:e}` })
			],
			[/^pl-(\d*\.?\d+)(rem|vh|vw|%|px|rpx)?$/, (t, { unit: e }) =>
				({ "padding-left": `${t[1]}${t[2]?t[2]:e}` })
			],
			[/^pr-(\d*\.?\d+)(rem|vh|vw|%|px|rpx)?$/, (t, { unit: e }) =>
				({ "padding-right": `${t[1]}${t[2]?t[2]:e}` })
			],
			[/^ptb-(\d*\.?\d+)(rem|vh|vw|%|px|rpx)?$/, (t, { unit: e }) =>
				`padding-top:${t[1]}${t[2]?t[2]:e};padding-bottom:${t[1]}${t[2]?t[2]:e};`
			],
			[/^plr-(\d*\.?\d+)(rem|vh|vw|%|px|rpx)?$/, (t, { unit: e }) =>
				`padding-left:${t[1]}${t[2]?t[2]:e};padding-right:${t[1]}${t[2]?t[2]:e};`
			],
			[/^p-(\d*\.?\d+)-(\d*\.?\d+)-(\d*\.?\d+)-(\d*\.?\d+)$/, (t, { unit: e }) =>
				({ padding: `${t[1]}${e} ${t[2]}${e} ${t[3]}${e} ${t[4]}${e};` })
			],
			[/^(icon)-(\d*\.?\d+)(rem|vh|vw|%|px|rpx)?$/, (t, { unit: e }) =>
				`width:${t[2]}${t[3]?t[3]:e};height:${t[2]}${t[3]?t[3]:e};`
			],
			[/^(width|w)-(\d*\.?\d+)(rem|vh|vw|%|px|rpx)?$/, (t, { unit: e }) =>
				({ width: `${t[2]}${t[3]?t[3]:e};` })
			],
			[/^(height|h)-(\d*\.?\d+)(rem|vh|vw|%|px|rpx)?$/, (t, { unit: e }) =>
				({ height: `${t[2]}${t[3]?t[3]:e};` })
			],
			[/^min-w-(\d*\.?\d+)(rem|vh|vw|%|px|rpx)?$/, (t, { unit: e }) =>
				({ "min-width": `${t[1]}${t[2]?t[2]:e};` })
			],
			[/^min-h-(\d*\.?\d+)(rem|vh|vw|%|px|rpx)?$/, (t, { unit: e }) =>
				({ "min-height": `${t[1]}${t[2]?t[2]:e};` })
			],
			[/^max-w-(\d*\.?\d+)(rem|vh|vw|%|px|rpx)?$/, (t, { unit: e }) =>
				({ "max-width": `${t[1]}${t[2]?t[2]:e};` })
			],
			[/^max-h-(\d*\.?\d+)(rem|vh|vw|%|px|rpx)?$/, (t, { unit: e }) =>
				({ "max-height": `${t[1]}${t[2]?t[2]:e};` })
			],
			[/^order-(-?\d*\.?\d+)$/, (t, { unit: e }) => ({ order: `${t[1]};` })],
			[/^border(?:-(\d+))?(?:-(solid|dashed|dotted|double|groove|ridge|inset|outset))?(?:-#(\w+))?$/, (
					t, { unit: e }) =>
				`border:${t[1]||"1"}${e} ${t[2]||"solid"} #${t[3]&&3===t[3].length?t[3]:t[3]&&t[3].repeat(6/t[3].length)||"c1c1c1"};`
			],
			[/^border(?:-(\d+))?(?:-#(\w+))?(?:-(solid|dashed|dotted|double|groove|ridge|inset|outset))?$/, (
					t, { unit: e }) =>
				`border:${t[1]||"1"}${e} ${t[3]||"solid"} #${t[2]&&3===t[2].length?t[2]:t[2]&&t[2].repeat(6/t[2].length)||"c1c1c1"};`
			],
			[/^border(?:-(solid|dashed|dotted|double|groove|ridge|inset|outset))?(?:-#(\w+))?(?:-(\d+))?$/, (
					t, { unit: e }) =>
				`border:${t[3]||"1"}${e} ${t[1]||"solid"} #${t[2]&&3===t[2].length?t[2]:t[2]&&t[2].repeat(6/t[2].length)||"c1c1c1"};`
			],
			[/^border(?:-(solid|dashed|dotted|double|groove|ridge|inset|outset))?(?:-(\d+))?(?:-#(\w+))?$/, (
					t, { unit: e }) =>
				`border:${t[2]||"1"}${e} ${t[1]||"solid"} #${t[3]&&3===t[3].length?t[3]:t[3]&&t[3].repeat(6/t[3].length)||"c1c1c1"};`
			],
			[/^border(?:-#(\w+))?(?:-(solid|dashed|dotted|double|groove|ridge|inset|outset))?(?:-(\d+))?$/, (
					t, { unit: e }) =>
				`border:${t[3]||"1"}${e} ${t[2]||"solid"} #${t[1]&&3===t[1].length?t[1]:t[1]&&t[1].repeat(6/t[1].length)||"c1c1c1"};`
			],
			[/^border(?:-#(\w+))?(?:-(\d+))?(?:-(solid|dashed|dotted|double|groove|ridge|inset|outset))?$/, (
					t, { unit: e }) =>
				`border:${t[2]||"1"}${e} ${t[3]||"solid"} #${t[1]&&3===t[1].length?t[1]:t[1]&&t[1].repeat(6/t[1].length)||"c1c1c1"};`
			],
			[/^(br|radius|rounded)(?:-(tr|tl|br|bl))?-?(\d+)-?(\d+)?-?(\d+)?-?(\d+)?(rem|em|px|rpx|%)?$/, (
				t, { unit: e }) => {
				let r = `${t[3]}${t[7]||e}`,
					i = t[4] ? " " + t[4] + (t[7] || e) : "",
					d = t[5] ? " " + t[5] + (t[7] || e) : "",
					o = t[6] ? " " + t[6] + (t[7] || e) :
					"";
				return `border${t[2]?"-"+{t:"top",b:"bottom",l:"left",r:"right",tr:"top-right",tl:"top-left",bl:"bottom-left",br:"bottom-right"}[t[2]]:""}-radius:${r}${i}${d}${o}`
			}],
			[/^bw-?(t|l|r|b)?-(\d+)(px|rpx)?$/, (e, { unit: r }) =>
				`border${e[1]?"-"+t[e[1]]:""}-width:${e[2]}${r};`
			],
			[/^bc-#([\d\w]+)$/, t => `border-color:#${t[1].repeat(6/t[1].length)};`],
			["bc-none", "border-color: transparent;"],
			[/^bs-(solid|dashed|dotted|double|groove|ridge|inset|outset|none)$/, t => `border-style:${t[1]};`],
			[/^(top|t)-(-?\d*\.?\d+)(rem|vh|vw|%)?$/, (t, { unit: e }) => ({ top: `${t[2]}${t[3]?t[3]:e};` })],
			[/^(left|l)-(-?\d*\.?\d+)(rem|vh|vw|%)?$/, (t, { unit: e }) =>
				({ left: `${t[2]}${t[3]?t[3]:e};` })
			],
			[/^(right|r)-(-?\d*\.?\d+)(rem|vh|vw|%)?$/, (t, { unit: e }) =>
				({ right: `${t[2]}${t[3]?t[3]:e};` })
			],
			[/^(bottom|b)-(-?\d*\.?\d+)(rem|vh|vw|%)?$/, (t, { unit: e }) =>
				({ bottom: `${t[2]}${t[3]?t[3]:e};` })
			],
			[/^inset-(-?0?\.?\d+)(rem|vh|vw|%)?$/, (t, { unit: e }) =>
				`top: ${t[1]}${t[2]||e};right: ${t[1]}${t[2]||e};bottom: ${t[1]}${t[2]||e};left: ${t[1]}${t[2]||e};`
			],
			[/^z-(-?\d+|auto)$/, (t, { unit: e }) => ({ "z-index": `${t[1]};` })],
			[/^shadow-?(\d+)?-?(\d+)?-?(\d+)?-?(\d+)?-?(0?\.\d+)?$/, (t, { unit: e }) =>
				({ "box-shadow": `${t[1]||"0"}px ${t[2]||"4"}px ${t[3]||"12"}px ${t[4]||"0"}px rgba(0, 0, 0, ${t[5]||"0.1"});` })
			],
			[/^opacity-(0?\.?\d+)$/, (t, { unit: e }) => ({ opacity: `${t[1]}` })],
			[/^translateX-(0?\.?\d+)(rem|vh|vw|%)?$/, (t, { unit: e }) =>
				`transform:translateX(${t[1]}${t[2]||e})`
			],
			[/^translateY-(0?\.?\d+)(rem|vh|vw|%)?$/, (t, { unit: e }) =>
				`transform:translateY(${t[1]}${t[2]||e})`
			],
		],
		shortcuts: [
			[/^(radius|rounded)-(t|l|r|b)-(\d+)(rem|em|px|rpx|%)?$/, t => {
				let e = {
					t: ["tl", "tr"],
					b: ["bl",
						"br"
					],
					l: ["tl", "bl"],
					r: ["tr",
						"br"
					]
				};
				return `radius-${e[t[2]][0]}-${t[3]}${t[4]||""} radius-${e[t[2]][1]}-${t[3]}${t[4]||""}`
			}]
		]
	}
};
export { t as default, t as preset };
