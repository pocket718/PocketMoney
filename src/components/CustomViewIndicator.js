import React, { useState, useEffect } from 'react';

import { ScrollView, View, StyleSheet, Animated } from 'react-native';

const ScrollViewIndicator = ({
  children,
  indicatorWidth = 300,
  flexibleIndicator = true,
  shouldIndicatorHide = false,
  hideTimeout = 0,
  style = {},
  scrollViewStyle = {},
  scrollIndicatorContainerStyle = {},
  scrollIndicatorStyle = {},
  ...props
}) => {
  const { onScroll, ...propsToSpread } = props;
  const [fadeAnim] = useState(new Animated.Value(shouldIndicatorHide ? 0 : 1));
  const [fromTop, setFromTop] = useState(0);
  const [indicatorFlexibleWidth, setIndicatorFlexibleWidth] =
    useState(indicatorWidth);
  const [visibleScrollPartWidth, setVisibleScrollPartWidth] = useState(1);
  const [fullSizeContentWidth, setFullSizeContentWidth] = useState(1);
  const [isIndicatorHidden, setIsIndicatorHidden] =
    useState(shouldIndicatorHide);

  const [scrollIndicatorContainerWidth, setScrollIndicatorContainerWidth] =
    useState(1);

  const handleScroll = value => {
    const {
      nativeEvent: { contentOffset },
    } = value;
    /**
     * Propagating onScroll event upwards in case onScroll prop is provided
     */
    if (onScroll && typeof onScroll === 'function') {
      onScroll(value);
    }
    //Calculation scroll indicator position based on child width and scrollView view width)
    const movePercent =
      contentOffset.x / ((fullSizeContentWidth - visibleScrollPartWidth) / 100);
    const position =
      ((visibleScrollPartWidth -
        indicatorFlexibleWidth -
        (visibleScrollPartWidth - scrollIndicatorContainerWidth)) /
        100) *
      movePercent;
    setFromTop(position);
  };

  // useEffect(() => {
  //     //Hide / show Animation effect
  //     if (shouldIndicatorHide) {
  //         isIndicatorHidden
  //             ? Animated.timing(fadeAnim, {
  //                   toValue: 0,
  //                   duration: 1000,
  //               }).start()
  //             : Animated.timing(fadeAnim, {
  //                   toValue: 1,
  //                   duration: hideTimeout,
  //               }).start();
  //     }
  // }, [fadeAnim, hideTimeout, isIndicatorHidden, shouldIndicatorHide]);

  useEffect(() => {
    //Change indicator width effect
    flexibleIndicator &&
      setIndicatorFlexibleWidth(
        visibleScrollPartWidth *
          (visibleScrollPartWidth / fullSizeContentWidth),
      );
  }, [visibleScrollPartWidth, fullSizeContentWidth, flexibleIndicator]);

  const runHideTimer = () => {
    shouldIndicatorHide && setIsIndicatorHidden(true);
  };

  const showIndicator = () => {
    shouldIndicatorHide && setIsIndicatorHidden(false);
  };

  const isContentSmallerThanScrollView =
    fullSizeContentWidth - visibleScrollPartWidth <= 0;

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        style={[styles.scrollViewContainer, scrollViewStyle]}
        onContentSizeChange={(width, height) => {
          setFullSizeContentWidth(width);
        }}
        onLayout={e => setVisibleScrollPartWidth(e.nativeEvent.layout.width)}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={() => runHideTimer()}
        onScrollBeginDrag={() => showIndicator()}
        showsHorizontalScrollIndicator={false}
        {...propsToSpread}>
        {children}
      </ScrollView>
      {!isContentSmallerThanScrollView && (
        <Animated.View
          style={[
            styles.scrollIndicatorContainer,
            { opacity: fadeAnim },
            scrollIndicatorContainerStyle,
          ]}
          onLayout={e =>
            setScrollIndicatorContainerWidth(e.nativeEvent.layout.width)
          }>
          <View
            style={[
              styles.scrollIndicator,
              { left: fromTop, width: indicatorFlexibleWidth },
              scrollIndicatorStyle,
            ]}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollViewContainer: {
    flex: 1,
  },
  scrollIndicatorContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -10,
    overflow: 'hidden',
    borderRadius: 10,
    height: 6,
    marginHorizontal: 3,
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8AD3E3',
  },
});

export default ScrollViewIndicator;
