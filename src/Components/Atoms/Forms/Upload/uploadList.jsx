/* eslint-disable consistent-return */
/* eslint-disable react/sort-comp */
/* eslint-disable react/static-property-placement */
import classNames from "classnames";
import { LoadingUpload } from "Components/Atoms/Icons";
import TrashIcon from "Components/Atoms/Icons/trash";
import Progress from "Components/Atoms/Progress/Progress";

import React from "react";

const prefixCls = "upload";

// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
const previewFile = (file, callback) => {
  const reader = new FileReader();
  reader.onloadend = () => callback(reader.result);
  reader.readAsDataURL(file);
};

export default class UploadList extends React.Component {
  static defaultProps = {
    listType: "text", // or picture
    items: [],
    progressAttr: {
      strokeWidth: 3,
      showInfo: false,
    },
  };

  handleClose = (file) => {
    this.props.onRemove(file);
  };

  handlePreview = (file, e) => {
    if (this.props.onPreview) {
      e.preventDefault();
      return this.props.onPreview(file);
    }
  };

  componentDidUpdate() {
    if (
      this.props.listType !== "picture" &&
      this.props.listType !== "picture-card"
    ) {
      return;
    }
    this.props.items.forEach((file) => {
      if (
        typeof document === "undefined" ||
        typeof window === "undefined" ||
        !window.FileReader ||
        !window.File ||
        !(file.originFileObj instanceof File) ||
        file.thumbUrl !== undefined
      ) {
        return;
      }
      /*eslint-disable */
      file.thumbUrl = "";
      /* eslint-enable */
      previewFile(file.originFileObj, (previewDataUrl) => {
        /*eslint-disable */
        file.thumbUrl = previewDataUrl;
        /* eslint-enable */
        this.forceUpdate();
      });
    });
  }

  render() {
    const list = this.props.items.map((file) => {
      let progress;
      let icon = "";
      if (
        this.props.listType === "picture" ||
        this.props.listType === "picture-card"
      ) {
        if (file.status === "uploading" || (!file.thumbUrl && !file.url)) {
          if (this.props.listType === "picture-card") {
            icon = (
              <div className={`${prefixCls}-list-item-uploading-text`}>
                <LoadingUpload />
              </div>
            );
          } else {
            icon = "";
          }
        } else {
          icon = (
            <a
              className={`${prefixCls}-list-item-thumbnail`}
              onClick={(e) => this.handlePreview(file, e)}
              href={file.url}
              target="_blank"
              rel="noreferrer"
            >
              <img src={file.thumbUrl || file.url} alt={file.name} />
            </a>
          );
        }
      }

      if (file.status === "uploading") {
        progress = (
          <div className={`${prefixCls}-list-item-progress`}>
            <Progress
              type="line"
              {...this.props.progressAttr}
              percent={file.percent}
            />
          </div>
        );
      }
      const infoUploadingClass = classNames({
        [`${prefixCls}-list-item`]: true,
        [`${prefixCls}-list-item-${file.status}`]: true,
      });
      return (
        <div className={infoUploadingClass} key={file.uid}>
          <div className={`${prefixCls}-list-item-info`}>
            {icon}
            {file.url ? (
              <a
                href={file.url}
                target="_blank"
                className={`${prefixCls}-list-item-name`}
                onClick={(e) => this.handlePreview(file, e)}
                rel="noreferrer"
              >
                {file.name}
              </a>
            ) : (
              <span
                className={`${prefixCls}-list-item-name`}
                onClick={(e) => this.handlePreview(file, e)}
                aria-hidden="true"
              >
                {file.name}
              </span>
            )}
            {this.props.listType === "picture-card" &&
            file.status !== "uploading" ? (
              <span className="absolute picture-overlay">
                <a
                  href={file.url}
                  target="_blank"
                  style={{ pointerEvents: file.url ? "" : "none" }}
                  onClick={(e) => this.handlePreview(file, e)}
                  aria-hidden="true"
                  rel="noreferrer"
                >
                  &nbsp;
                </a>
                <span aria-hidden="true" onClick={() => this.handleClose(file)}>
                  <TrashIcon type="delete" />
                </span>
              </span>
            ) : (
              <button type="button" onClick={() => this.handleClose(file)} />
            )}
          </div>
          {progress}
        </div>
      );
    });
    const listClassNames = classNames({
      [`${prefixCls}-list`]: true,
      [`${prefixCls}-list-${this.props.listType}`]: true,
    });
    return <div className={listClassNames}>{list}</div>;
  }
}
