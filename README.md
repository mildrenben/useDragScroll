# useDragScroll
Adds horizontal drag scrolling with momentum

1kb minified + gzipped, no dependencies

## Usage

`yarn add use-drag-scroll` or `npm i use-drag-scroll`

! The wrapping element must have `overflow-x: scroll` and `white-space: nowrap`.

### Basic

Simple JSX setup:

[Live example](https://codesandbox.io/s/usedragscroll-basic-sgkd5)
```javascript
  import React, {useRef} from 'react'
  import useDragScroll from 'use-drag-scroll'

  const Component = () => {
    const ref = useRef(null)

    useDragScroll({
      sliderRef: ref
    })

    return (
      <div className='items' ref={ref}>
        <div className='item'></div>
        <div className='item'></div>
        <div className='item'></div>
      </div>
    )
  }
```

### Dynamic children

If the components within `.items` can change or be dynamically added/removed, pass reliants to `useDragScroll` like you would `useEffect`:

[Live example](https://codesandbox.io/s/usedragscroll-basic-vdxic?file=/src/App.js)
```javascript
  import React, {useRef, useState} from 'react'
  import useDragScroll from 'use-drag-scroll'

  const Component = () => {
    const ref = useRef(null)
    const [myFilter, setMyFilter] = useState('DESC')

    useDragScroll({
      sliderRef: ref,
      reliants: [myFilter]
    })

    return (
      <div className='items' ref={ref}>
        <div className='item'></div>
        <div className='item'></div>
        <div className='item'></div>
      </div>
    )
  }
```

### Momentum velocity

You can also alter the momentum velocity (recommended between 0.8-1.0, default 0.9):
```javascript
  import React, {useRef, useState} from 'react'
  import useDragScroll from 'use-drag-scroll'

  const Component = () => {
    const ref = useRef(null)
    const [myFilter, setMyFilter] = useState('DESC')

    useDragScroll({
      sliderRef: ref,
      reliants: [myFilter],
      momentumVelocity: 0.8 
    })

    return (
      <div className='items' ref={ref}>
        <div className='item'></div>
        <div className='item'></div>
        <div className='item'></div>
      </div>
    )
  }
```

## Arguments & Return values

### Args

```javascript
useDragScroll({
  sliderRef: ReactRef, // Wrapper/container ref (REQUIRED)
  reliants: [...], // Array
  momentumVelocity: Number
})
```

### Returns

`useDragScroll` returns `hasSwiped` only. This tells you if the user has moved the mouse more than 3px horizontally. It's handy for when your items are links. You can tell links to `preventDefault` if the user has scrolled previously.

[Live example with links](https://codesandbox.io/s/usedragscroll-links-jpc5i)

```javascript
const { hasSwiped } = useDragScroll({
  sliderRef: ReactRef
})

return (
  <div className='items' ref={ref}>
    <a className='item' href='...' onClick={(e) => {
      if (hasSwiped) {
        e.preventDefault()
      }
    }}></a>
  </div>
)
```

---

Adapted from @toddwebdev's codepen here: https://codepen.io/loxks/pen/KKpVvVW