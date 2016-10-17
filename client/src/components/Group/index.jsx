import React, { PropTypes } from 'react';

export default function Group(props) {
  return (
    <div className="">
      <img src="" alt="" className="" />
      <p className="">{props.picture}</p>
    </div>
  );
}

Group.propTypes = {
  picture: PropTypes.string,
};
