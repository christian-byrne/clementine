import React, {useState} from "react";
import { MDBTabsItem, MDBTabsLink, MDBIcon } from "mdb-react-ui-kit";

function BlogTab({ index, handleFillClick, fillActive, name, clickHandler }) {
  const [haveBeenClicked, setHaveBeenClicked] = useState(false);

  const handleClick = () => {
    clickHandler(index);
    handleFillClick(`tab${index}`);
    setHaveBeenClicked(true);
  };

  return (
    <MDBTabsItem>
      <MDBTabsLink onClick={handleClick} active={fillActive === `tab${index}`}>
        {haveBeenClicked || index == 0 ? (
          <MDBIcon icon='check-circle' className='me-2 text-success' />
        ) : (
          <MDBIcon icon='circle' className='me-2 text-dark' />
        
        )}
        {name}
      </MDBTabsLink>
    </MDBTabsItem>
  );
}

export default BlogTab;
