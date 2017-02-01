const classNames = require('classnames')

require('./style.scss')

export default {
  name: 'tooltip',
  abstract: true,

  props: {
    type: String,
    size: String,
    always: Boolean,
    noAnimate: Boolean,
    rounded: Boolean,
    label: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'bottom'
    }
  },

  render () {
    let children = this.$slots.default
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(c => c.tag)
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    const rawChild = children[0]


    rawChild.data.attrs = {
      'aria-label': this.label
    }

    rawChild.data.class = classNames(
      'tooltip',
      `tooltip--${this.placement}`,
      {
        [`tooltip--${this.type}`]: this.type,
        [`tooltip--${this.size}`]: this.size,
        'tooltip--rounded': this.rounded,
        'tooltip--always': this.always,
        'tooltip--no-animate': this.noAnimate
      }
    )

    return rawChild
  },

  watch: {
    label (val) {
      this.$el.setAttribute('aria-label', val)
    }
  }

}
