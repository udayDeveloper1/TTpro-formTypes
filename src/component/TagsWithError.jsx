import React, { useState, useRef, useEffect } from "react";
import { Input, Tag, Tooltip, message } from "antd"; // Import message for error notifications
import { PlusOutlined } from "@ant-design/icons";

const TagWithError = ({ tags, setTags, name }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputValue, setEditInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);

  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (!inputValue) {
      message.error("At least one tag is required!"); // Show error if input is empty
      return;
    }

    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }

    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };

  return (
    <div>
      {tags?.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag}
              size="small"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag
            key={tag}
            closable={true}
            style={{
              userSelect: "none",
            }}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag icon={<PlusOutlined />} onClick={showInput}>
          New Tag
        </Tag>
      )}
    </div>
  );
};

export default TagWithError;
