/* eslint-disable react/sort-comp */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/sort-comp */
import React from "react";
import RcUpload from "rc-upload";
import classNames from "classnames";
import UploadList from "./uploadList";
import getFileItem from "./getFileItem";

const prefixCls = "upload";

function noop() {}

function T() {
  return true;
}

// Fix IE file.status problem
// via coping a new Object
function fileToObject(file) {
  return {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.filename || file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    response: file.response,
    error: file.error,
    percent: 0,
    originFileObj: file,
  };
}

/**
 * 生成Progress percent: 0.1 -> 0.98
 *   - for ie
 */
function genPercentAdd() {
  let k = 0.1;
  const i = 0.01;
  const end = 0.98;
  return function a(s) {
    let start = s;
    if (start >= end) {
      return start;
    }

    start += k;
    k -= i;
    if (k < 0.001) {
      k = 0.001;
    }
    return start * 100;
  };
}

function UploadDragger(props) {
  return <Upload {...props} type="drag" style={{ height: props.height }} />;
}

export default class Upload extends React.Component {
  static Dragger = UploadDragger;

  static defaultProps = {
    type: "select",
    // do not set
    // name: '',
    multiple: false,
    action: "",
    data: {},
    accept: "",
    onChange: noop,
    beforeUpload: T,
    showUploadList: true,
    listType: "text", // or pictrue
    className: "",
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      fileList: this.props.fileList || this.props.defaultFileList || [],
      dragState: "drop",
    };
  }

  onStart = (file) => {
    let targetItem;
    // eslint-disable-next-line react/destructuring-assignment
    let nextFileList = this.state.fileList.concat();
    if (file.length > 0) {
      targetItem = file.map((f) => {
        const fileObject = fileToObject(f);
        fileObject.status = "uploading";
        return fileObject;
      });
      nextFileList = nextFileList.concat(targetItem);
    } else {
      targetItem = fileToObject(file);
      targetItem.status = "uploading";
      nextFileList.push(targetItem);
    }
    this.onChange({
      file: targetItem,
      fileList: nextFileList,
    });
    // fix ie progress
    if (!window.FormData) {
      this.autoUpdateProgress(0, targetItem);
    }
  };

  autoUpdateProgress(percent, file) {
    const getPercent = genPercentAdd();
    let curPercent = 0;
    this.progressTimer = setInterval(() => {
      curPercent = getPercent(curPercent);
      this.onProgress(
        {
          percent: curPercent,
        },
        file
      );
    }, 200);
  }

  removeFile(file) {
    const { fileList } = this.state;
    const targetItem = getFileItem(file, fileList);
    const index = fileList.indexOf(targetItem);
    if (index !== -1) {
      fileList.splice(index, 1);
      return fileList;
    }
    return null;
  }

  onSuccess = (response, file) => {
    this.clearProgressTimer();
    try {
      if (typeof response === "string") {
        response = JSON.parse(response);
      }
    } catch (e) {
      /* do nothing */
    }
    const { fileList } = this.state;
    const targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.status = "done";
    targetItem.response = response;
    this.onChange({
      file: targetItem,
      fileList,
    });
  };

  onProgress = (e, file) => {
    const { fileList } = this.state;
    const targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.percent = e.percent;
    this.onChange({
      event: e,
      file: targetItem,
      fileList: this.state.fileList,
    });
  };

  onError = (error, response, file) => {
    this.clearProgressTimer();
    const { fileList } = this.state;
    const targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.error = error;
    targetItem.response = response;
    targetItem.status = "error";
    this.handleRemove(targetItem);
  };

  handleRemove(file) {
    const fileList = this.removeFile(file);
    if (fileList) {
      this.onChange({
        file,
        fileList,
      });
    }
  }

  handleManualRemove = (file) => {
    /*eslint-disable */
    file.status = "removed";
    /* eslint-enable */
    if ("onRemove" in this.props) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.onRemove(file);
    } else {
      this.handleRemove(file);
    }
  };

  onChange = (info) => {
    if (!("fileList" in this.props)) {
      this.setState({ fileList: info.fileList });
    }
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onChange(info);
  };

  // eslint-disable-next-line react/sort-comp
  // componentWillReceiveProps(nextProps) {
  //   if ("fileList" in nextProps) {
  //     this.setState({
  //       fileList: nextProps.fileList || [],
  //     });
  //   }
  // }

  // eslint-disable-next-line react/sort-comp
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && "fileList" in this.props) {
      this.setState({
        fileList: this.props.fileList || [],
      });
    }
  }

  onFileDrop = (e) => {
    this.setState({
      dragState: e.type,
    });
  };

  clearProgressTimer() {
    clearInterval(this.progressTimer);
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const type = this.props.type || "select";
    const props = {
      ...this.props,
      onStart: this.onStart,
      onError: this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
      // eslint-disable-next-line react/destructuring-assignment
      beforeUpload: this.props.beforeUpload,
    };
    let uploadList;
    // eslint-disable-next-line react/destructuring-assignment
    if (this.props.showUploadList) {
      uploadList = (
        <UploadList
          // eslint-disable-next-line react/destructuring-assignment
          listType={this.props.listType}
          // eslint-disable-next-line react/destructuring-assignment
          items={this.state.fileList}
          onPreview={props.onPreview}
          onRemove={this.handleManualRemove}
        />
      );
    }
    if (type === "drag") {
      const dragCls = classNames({
        [prefixCls]: true,
        [`${prefixCls}-drag`]: true,
        // eslint-disable-next-line react/destructuring-assignment
        [`${prefixCls}-drag-uploading`]: this.state.fileList.some(
          (file) => file.status === "uploading"
        ),
        // eslint-disable-next-line react/destructuring-assignment
        [`${prefixCls}-drag-hover`]: this.state.dragState === "dragover",
        // eslint-disable-next-line react/destructuring-assignment
        [`${prefixCls}-disabled`]: this.props.disabled,
      });
      return (
        // eslint-disable-next-line react/destructuring-assignment
        <span className={this.props.className}>
          <div
            className={dragCls}
            onDrop={this.onFileDrop}
            onDragOver={this.onFileDrop}
            onDragLeave={this.onFileDrop}
          >
            <RcUpload {...props}>
              <div className={`${prefixCls}-drag-container`}>
                {this.props.children}
              </div>
            </RcUpload>
          </div>
          {uploadList}
        </span>
      );
    }

    const uploadButtonCls = classNames({
      [prefixCls]: true,
      [`${prefixCls}-select`]: true,
      // eslint-disable-next-line react/destructuring-assignment
      [`${prefixCls}-select-${this.props.listType}`]: true,
      [`${prefixCls}-disabled`]: this.props.disabled,
    });

    const uploadButton = (display = true) => {
      return (
        <div
          className={uploadButtonCls}
          style={{ display: this.props.children && display ? "" : "none" }}
        >
          <RcUpload {...props} />
        </div>
      );
    };

    if (this.props.listType === "picture-card") {
      return (
        <span className={this.props.className}>
          {uploadList}
          {uploadButton(
            !this.props.maxCount ||
              this.state.fileList.length < this.props.maxCount
          )}
        </span>
      );
    }

    return (
      <span className={this.props.className}>
        {uploadButton()}
        {uploadList}
      </span>
    );
  }
}
