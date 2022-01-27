import {render, RenderAPI} from '@testing-library/react-native'
import React from 'react'

import { TextWithFlag } from 'src/components/atoms/textWithFlag/TextWithFlag'
import { sampleTextWithFlag } from '../../../../constants/SampleData'

describe('<TextWithFlag>', () => {
  let instance: RenderAPI
  const data = sampleTextWithFlag

  beforeEach(() => {
    const component = (
        <TextWithFlag
            title={data.title} titleColor={data.titleColor}
            flag={data.flag} flagColor={data.flagColor}
            barColor={data.barColor} numberOfLines={2}
            labelType={data.labelType}
          />
    )
    instance = render(component)
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  })

//   it('should Image name is homeIcon', () => {
//     expect(instance.container.props.name).toBe('homeIcon')
//   })

//   it('should type is round', () => {
//     expect(instance.container.props.type).toBe('round')
//   })

//   it('should size is 40', () => {
//     expect(instance.container.props.size).toBe(IMAGE_SIZE)
//   })

//   describe('when Image render without type and size', () => {
//     beforeEach(() => {
//       const component = <Image name={'homeIcon'} />
//       instance = render(component)
//     })

//     it('Should render component', () => {
//       expect(instance).toBeDefined()
//     })
//   })

//   describe('when Image render with url', () => {
//     beforeEach(() => {
//       const component = <Image url={IMAGE_URL} />
//       instance = render(component)
//     })

//     it('Should render component', () => {
//       expect(instance).toBeDefined()
//     })
//   })
})
