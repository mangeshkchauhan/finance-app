import ContentLoader, { Rect } from 'react-content-loader/native'
import { Dimensions } from 'react-native'
const WIDTH = Dimensions.get('screen').width - 32
const HEIGHT = 480
const numberOfItems = 3

const SheetListLoader = () => (
  <ContentLoader
    speed={2}
    width={WIDTH}
    height={HEIGHT}
    viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
    foregroundColor="white"
    backgroundColor="#f3f3f3"
  >
    <Rect x="4" y="0" rx="3" ry="3" width={WIDTH} height="152" />
    <Rect x="4" y="160" rx="3" ry="3" width={WIDTH} height="152" />
    <Rect x="4" y="320" rx="3" ry="3" width={WIDTH} height="152" />
  </ContentLoader>
)

export default SheetListLoader
