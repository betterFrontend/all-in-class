// 一些常见的动态class情况 例如   :class="{ 'active': orderType === 'order' }"
{ 'active': orderType === 'order' }
{ 'active': orderType === 'pending' }
{ 'active': active.id && active.id === e.id }
{ 'custom-style-cach-no': carList.length === 0 }
{ 'custom-style-money-no': carList.length === 0 }
{ 'active': tabIndex === index }
{ 'active': active.id && active.id === e.id }
{ 'custom-style-cach-no': carList.length === 0 }
{ 'custom-style-money-no': carList.length === 0 }
{ 'active': tabIndex === index }
[oldParams.refundState == item.value ? 'active' : '',]
[oldParams.cashierPayState == item.value ? 'active' : '',]
[oldParams.payType == item.value ? 'active' : '']
{ active: tabIndex === index }
[oldParams.state == item.value ? 'active' : '']
[oldParams.payType == item.value ? 'active' : '']
{ active: chosedItem.id == item.id }
{ 'code-view-dis': codeTips.includes('秒') }
{ 'btn-disable': disable }
{ 'active': number === item }
{ 'active': currindex === index }
isFixed && 'fixed'
[addClassBg(day, item.month, item.year)]
[addClassName(day, item.month, item.year)]
{ 'active': number === item }
{ 'uni-stat__actived': current }
{ 'uni-select--disabled': disabled }
{ 'uni-select__selector__disabled': item.disable }
{ 'active': currindex === index }
['uniui-' + type, customPrefix, customPrefix ? type : '']
['u-icon--' + labelPos]
uClasses
[disabled && 'u-switch--disabled']
[value && 'u-switch__node--on']
[(showActionBtn || show) && 'u-search__action--active']
['u-type-' + tmpConfig.type, (tmpConfig.type === 'loading' || tmpConfig.loading) ? 'u-toast__content--loading' : '']
['u-toast__content__text--' + tmpConfig.type]
bemClass
bemClass
[plain && `u-button__text--plain--${type}`]
[plain && `u-button__text--plain--${type}`]
['u-popup__content__close--' + closeIconPos]
[showCancelButton && !showConfirmButton && 'u-modal__button-group__wrapper--only-cancel']
[!showCancelButton && showConfirmButton && 'u-modal__button-group__wrapper--only-confirm']
[]
['u-text__price', type && `u-text__value--${type}`]
[
  type && `u-text__value--${type}`,
  lines && `u-line-${lines}`
]
inputClass
[`u-checkbox-label--${parentData.iconPlacement}`, parentData.borderBottom && parentData.placement === 'column' && 'u-border-bottom']
bemClass
[`u-radio-label--${parentData.iconPlacement}`, parentData.borderBottom && parentData.placement === 'column' && 'u-border-bottom']
iconClasses
bemClass
textareaClass
{
  'm-l-r-b': [2, 5].includes(e), 'm-l-r': [8].includes(e),
    'm-r': [3, 6, 9].includes(e), 'comfig': e === 'comfig'
}
{
  'm-l-r-b': [2, 5].includes(e), 'm-l-r': [8].includes(e),
    'm-r': [3, 6, 9].includes(e), 'comfig': e === 'comfig'
}
sysMode.mode === item.mode ? 'border-#FB7302 c-#FB7302' : 'border-E6'
[vertical && 'u-loading-icon--vertical']
[`u-loading-icon__spinner--${mode}`]
[!isNvue && 'u-safe-area-inset-bottom']
[`u-swiper-indicator__wrapper--${indicatorMode}`]
[index === current && 'u-swiper-indicator__wrapper__dot--active']

