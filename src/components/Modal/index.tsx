import React, { HtmlHTMLAttributes, useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import { Button } from '../Button';
import { Card } from '../Card';
import { Column } from '../Column';
import { Row } from '../Row';
import { SizedBox } from '../SizedBox';
import { Text } from '../Text';
import { Styles, IModalProps } from './styles';

const modalRoot = document.getElementById('modal-portal');

export const Modal: React.FC<
  HtmlHTMLAttributes<HTMLDivElement> & IModalProps
> = (props) => {
  const {
    children,
    header,
    defaultFooter = { actionText: 'ok', closeText: 'cancel' },
    showDefaultFooter,
    onClose = () => null,
    isVisible,
    showCloseButton,
    ...rest
  } = props;

  const [state, setstate] = useState({
    isVisible,
  });

  useEffect(() => {
    setstate({
      isVisible,
    });
  }, [isVisible]);

  const closeModal = () => {
    onClose();

    return setstate({
      ...state,
      isVisible: false,
    });
  };

  const el = document.createElement('div');

  useEffect(() => {
    // append to root when the children of Modal are mounted
    modalRoot && modalRoot.appendChild(el);

    // do a cleanup
    return () => {
      modalRoot && modalRoot.removeChild(el);
    };
  }, [el]);

  return state.isVisible
    ? createPortal(
        <Styles.Modal {...rest}>
          <Card className="child">
            {showCloseButton && (
              <Button onClick={closeModal} type="button" className="x-close">
                x
              </Button>
            )}

            {header && (
              <Column>
                {header.title && (
                  <Text size={16} weight={500}>
                    {header.title}
                  </Text>
                )}
                {header.subtitle && <Text>{header.subtitle}</Text>}
                <SizedBox height={10} />
              </Column>
            )}

            {children}
            {showDefaultFooter && (
              <>
                <SizedBox height={10} />
                <Row useAppMargin>
                  <Column xs={6} useAppMargin>
                    <Button onClick={closeModal} fullWidth>
                      {defaultFooter?.actionText}
                    </Button>
                  </Column>
                  <Column xs={6} useAppMargin>
                    <Button onClick={closeModal} outline fullWidth>
                      {defaultFooter?.closeText}
                    </Button>
                  </Column>
                </Row>
              </>
            )}
          </Card>
        </Styles.Modal>,
        modalRoot as HTMLElement,
      )
    : null;
};

Modal.defaultProps = {
  showCloseButton: true,
};
