import React, { useRef, useState, useLayoutEffect } from 'react';

import { ReactComponent as ArrowComponent } from '../../assets/images/arrowDown.svg';
import { Styles } from './style';
import { IFlex } from '../Row';
import { Styles as StackStyles } from '../Stack/style';

export const Scrollable: React.FC<
  {
    hideScrollBar?: boolean;
    hideScrollArrows?: boolean;
    arrowContainerStyle?: React.CSSProperties;
    arrowStyles?: React.CSSProperties;
    style?: React.CSSProperties;
    Arrow?: React.FC<React.SVGProps<SVGSVGElement>>;
  } & IFlex
> = (props) => {
  const {
    children,
    hideScrollBar,
    hideScrollArrows,
    arrowStyles,
    style,
    arrowContainerStyle,
    Arrow = ArrowComponent,
  } = props;

  const scrollableRef = useRef<
    React.RefObject<HTMLDivElement> | HTMLDivElement
  >(null);

  let scrollWidth: any;

  const [currentChildPosition, setcurrentChildPosition] = useState(0);
  const [lastItemInView, setlastItemInView] = useState(false);

  const [scrollableContainer, setScrollableContainer] = useState<
    HTMLDivElement
  >();

  useLayoutEffect(() => {
    setScrollableContainer(scrollableRef.current as HTMLDivElement);
  }, []);

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.intersectionRatio === 1) {
        return setlastItemInView(true);
      }
      return setlastItemInView(false);
    },
    {
      root: scrollableContainer,
      rootMargin: '0px',
      threshold: 1,
    },
  );

  if (scrollableContainer) {
    if (scrollableContainer.children.length > 0) {
      scrollableContainer?.lastChild &&
        observer.observe(scrollableContainer.lastChild as HTMLDivElement);

      scrollWidth = scrollableContainer.children[0].scrollWidth;
    }
  }

  const handleArrowClick = (direction: string) => {
    if (scrollableContainer) {
      if (direction === 'forward') {
        if (lastItemInView) {
          return;
        }
        if (currentChildPosition < scrollableContainer?.children.length - 1) {
          const newPosition = currentChildPosition + 1;
          setcurrentChildPosition(newPosition);

          scrollableContainer.scrollTo(newPosition * scrollWidth, 0);
          return;
        }
      }

      if (direction === 'backward') {
        if (currentChildPosition > 0) {
          const newPosition = currentChildPosition - 1;
          setcurrentChildPosition(newPosition);
          scrollableContainer.scrollTo(newPosition * scrollWidth, 0);
        }
      }
    }
  };

  return (
    <StackStyles.Stack>
      <Styles.ScrollableArrowsContainer
        hideScrollArrows={hideScrollArrows}
        style={arrowContainerStyle}
      >
        <Arrow
          className={`arrow ${currentChildPosition === 0 ? 'fade-2' : ''}`}
          onClick={() => handleArrowClick('backward')}
          style={arrowStyles}
        />
        <Arrow
          className={`arrow ${
            currentChildPosition ===
              (scrollableContainer as HTMLDivElement)?.children.length - 1 ||
            lastItemInView
              ? 'fade-2'
              : ''
          }`}
          onClick={() => handleArrowClick('forward')}
          style={arrowStyles}
        />
      </Styles.ScrollableArrowsContainer>
      <Styles.Scrollable
        hideScrollBar={hideScrollBar}
        ref={scrollableRef as React.RefObject<HTMLDivElement>}
        style={style}
      >
        {children}
      </Styles.Scrollable>
    </StackStyles.Stack>
  );
};

Scrollable.defaultProps = {
  hideScrollBar: true,
  hideScrollArrows: false,
  Arrow: ArrowComponent,
};
