import React, { PropTypes } from 'react';

const style = {
  flexGrow: 1,
  overflow: 'none',
};

export default function GroupsList(props) {
  /* const channels = this.props.channels.map((item, index) => {
    return (
      <Channel
        key={index}
      />
    );
  }); */
  const channels = props.channels || null;
  return (
    <div style={style}>
      {channels}
    </div>
  );
}
GroupsList.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.object),
};
