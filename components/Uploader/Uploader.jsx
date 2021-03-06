import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import handleFileInfo from './utils/handleFileInfo';

/**
 * 设置选择前的方法，获取选择文件的相关信息，需要时可以对图片进行压缩、改变图片尺寸。
 *
 * multiple: 默认为 false，设置为 true 之后一次可以选择多张，onChange 事件调用之后返回一个数组，
 *           不设置或者设置为 false，onChange 事件调用之后返回一个对象。
 * disabled: 传递之后不可以点击上传，整个选择组件会设置为半透明状态，透明度为 0.5。
 * quality: 没有默认值，不设置不会进行压缩。
 * accept: 设置选择的文件类型，默认为所有类型，只有文件类型为图片（image/*）的时候会有本地预览图。
 * onChange: () => { file, fileType, fileSize, fileName, thumbnail }。
 * onBeforeSelect: () => boolean，返回 false 的时候阻止后续的选择事件。
 */
class Uploader extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fileList: [],
    };

    this.handleDefaultInput = this.handleDefaultInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleDefaultInput(e) {
    // 防止选择同一张图片两次造成 onChange 事件不触发
    e.target.value = null;

    const { onBeforeSelect, disabled } = this.props;

    // 阻止 input onChange 默认事件
    if (onBeforeSelect() === false || disabled) {
      e.preventDefault();
    }
  }

  handleClick() {
    this.file.click();
  }

  handleChange(e) {
    const { onChange, quality, multiple } = this.props;
    const files = Array.from(e.target.files);
    const fileList = [];

    const getFileInfo = (data) => {
      if (multiple) {
        fileList.push(data);

        if (files.length === fileList.length) {
          onChange(fileList);
        }
      } else {
        onChange(data);
      }
    };

    files && files.map(file => handleFileInfo({ file, quality }, getFileInfo));
  }

  render() {
    const { prefixCls, className, multiple, accept, capture, disabled, children } = this.props;

    const compStyle = classNames(prefixCls, {
      disabled,
      [className]: !!className,
    });

    return (
      <div className={compStyle}>
        <input
          className={`${prefixCls}-input`}
          type="file"
          ref={(ele) => { this.file = ele; }}
          accept={accept}
          multiple={multiple}
          capture={capture}
          onClick={this.handleDefaultInput}
          onChange={this.handleChange}
          />
        <span className={`${prefixCls}-trigger`} onClick={this.handleClick} />
        {children}
      </div>
    );
  }
}

Uploader.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  quality: PropTypes.number,
  accept: PropTypes.string,
  capture: PropTypes.string,
  onChange: PropTypes.func,
  onBeforeSelect: PropTypes.func,
};

Uploader.defaultProps = {
  prefixCls: 'za-uploader',
  className: null,
  disabled: false,
  multiple: false,
  accept: null,
  capture: null,
  // () => { file, fileType, fileSize, fileName, thumbnail }
  onChange() { },
  // () => boolean
  onBeforeSelect() { return true; },
};

export default Uploader;
