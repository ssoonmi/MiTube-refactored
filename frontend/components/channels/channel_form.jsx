import React, { useState } from 'react';
import Textarea from 'react-textarea-autosize';
import SubmitFile from '../shared/submit_file';
import Loader from '../shared/loader';

export default function ChannelForm({ 
  initialName, 
  initialDescription, 
  submitValue,
  submitAction
}){
  const [name, setName] = useState(initialName || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [splash, setSplash] = useState(null);
  const [icon, setIcon] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("channel[name]", name);
    formData.append("channel[description]", description);
    formData.append("channel[splash]", splash);
    formData.append("channel[icon]", icon);

    setDisabled(true);
    submitAction(formData).then(() => {
      setDisabled(false);
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <input 
        type="text" 
        value={name} 
        placeholder="Name"
        onChange={e => setName(e.target.value)}/>
      <Textarea 
        minRows={3}
        value={description} 
        placeholder="Description"
        onChange={e => setDescription(e.target.value)}/>
      <div className="flex-row">
        <SubmitFile
          file={splash}
          setFile={setSplash}
          acceptedTypes="image/*"
          label="splash"
          disabled={disabled}
        />
        <SubmitFile
          file={icon}
          setFile={setIcon}
          acceptedTypes="image/*"
          label="icon"
          disabled={disabled}
        />
      </div>
      <div className="submit">
        <Loader loading={disabled} size={26} sizeUnit={"px"} />
        <input
          type="submit"
          value={submitValue}
          disabled={disabled || name.length < 1} />
      </div>
    </form>
  );
}