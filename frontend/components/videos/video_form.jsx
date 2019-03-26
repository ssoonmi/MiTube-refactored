import React, { useState } from 'react';
import Textarea from 'react-textarea-autosize';
import SubmitFile from '../shared/submit_file';
import { connect } from 'react-redux';
import Loader from '../shared/loader';
import { withRouter } from 'react-router-dom';

function VideoForm({
  initialTitle,
  initialDescription,
  initialChannelId,
  channelIds,
  channels,
  submitValue,
  submitAction,
  history
}) {
  const [title, setTitle] = useState(initialTitle || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [channelId, setChannelId] = useState(initialChannelId || "select");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumnail] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("video[title]", title);
    formData.append("video[description]", description);
    formData.append("video[video]", video);
    formData.append("video[thumbnail]", thumbnail);

    setDisabled(true);

    submitAction(formData, channelId).then((payload) => {
      const videoId = payload.video.id;
      setDisabled(false);
      history.push(`/videos/${videoId}`);
    });
  };

  const channelOptions = channelIds.map((id) => {
    const channel = channels[id];
    return (
      <option key={id} value={id}>{channel.name}</option>
    );
  });

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={e => setTitle(e.target.value)} 
        disabled={disabled}/>
      <Textarea
        minRows={3}
        value={description}
        placeholder="Description"
        onChange={e => setDescription(e.target.value)}
        disabled={disabled} />
      <select disabled={disabled} value={channelId} onChange={e => setChannelId(e.target.value)}>
        <option disabled value="select">-- SELECT CHANNEL TO UPLOAD TO (required) --</option>
        {channelOptions}
      </select>
      <div className="flex-row">
        <SubmitFile
          file={video}
          setFile={setVideo}
          acceptedTypes="video/*"
          label="video"
          disabled={disabled}
          />
        <SubmitFile
          file={thumbnail}
          setFile={setThumnail}
          acceptedTypes="image/*"
          label="thumbnail"
          disabled={disabled}
          />
      </div>
      <div className="submit">
        <Loader loading={disabled} size={26} sizeUnit={"px"}/>
        <input
          type="submit"
          value={submitValue}
          disabled={disabled || title.length < 1 || channelId == "select"} />
      </div>
    </form>
  );
}

const msp = (state, ownProps) => {
  let channelIds = [];
  const history = ownProps.history;
  if (state.entities.users[state.session.id].channelIds) {
    channelIds = Array.from(state.entities.users[state.session.id].channelIds);
  }
  return {
    channels: state.entities.channels,
    channelIds,
    history
  }
}

export default withRouter(connect(msp, null)(VideoForm));