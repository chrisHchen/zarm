import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class ModalFooter extends PureComponent {
  render() {
    const { prefixCls, className, children, ...others } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
    });

    return (
      <div className={cls} {...others}>
        {children}
      </div>
    );
  }
}

ModalFooter.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
};

ModalFooter.defaultProps = {
  prefixCls: 'ui-modal-footer',
  className: null,
};

export default ModalFooter;

