import React from "react";
import Button from "react-bootstrap/Button";

const ButtonGroupToggle = ({ buttons, color, activeId, onSelect, ...rest }) => {
  const getButtonVariant = (activeButtonId, button) => {
    color = button.color || color;
    return activeButtonId === button.id ? `${color}` : `outline-${color}`;
  };
  return (
    <div className="btn-group  m-1" role="group">
      {buttons.map((button) => {
        return (
          <Button
            variant={getButtonVariant(activeId, button)}
            onClick={() => onSelect(button.id)}
            key={button.id}
            {...rest}
          >
            {button.content}
          </Button>
        );
      })}
    </div>
  );
};

ButtonGroupToggle.defaultProps = {
  color: "dark",
  buttons: [
    {
      content: "Button 1",
      id: 1,
    },
    {
      content: "Button 2",
      id: 2,
    },
  ],
  onSelect: (id) => {
    console.log("Default onSelect method: Button " + id + " selected");
  },
  activeId: 1,
};

export default ButtonGroupToggle;
