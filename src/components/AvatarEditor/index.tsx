import { useRef, useState } from 'react';

import AvatarEditorComp, { type Position } from 'react-avatar-editor';
import Dropzone from 'react-dropzone';

import Button from 'components/Button';


import styles from './AvatarEditor.module.scss';

interface Props {
  value: Blob | null;
  onChange: (image: Blob | null) => void;
}

export default function AvatarEditor(props: Props) {
  const [image, setImage] = useState<File|undefined>(undefined);
  const [position, setPosition] = useState<Position>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);

  const editorRef = useRef<AvatarEditorComp>(null);

  const handleChange = () => {
    const image = editorRef.current?.getImageScaledToCanvas();
    image?.toBlob((blob) => {
      props.onChange(blob);
    });
  }

  return (
    <div className={styles.base}>
      <Dropzone
        accept={{
          'image/*': ['.png', '.gif', '.jpeg', '.jpg']
        }}
        onDropAccepted={(dropped) => {
          setImage(dropped[0]);
        }}
        noClick
        noKeyboard
      >
        {({ getRootProps, getInputProps, open }) => (
          <>
            <div {...getRootProps()}>
              {image ? (
                <AvatarEditorComp
                  className={styles.editor}
                  ref={editorRef}
                  image={image || ''}
                  border={12}
                  borderRadius={8}
                  color={[255, 255, 255, 0.6]}
                  width={250}
                  height={250}
                  position={position}
                  onPositionChange={setPosition}
                  onImageChange={handleChange}
                  onImageReady={handleChange}
                  scale={scale}
                  rotate={rotate}
                />
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  icon="Upload"
                  title="buttons.upload"
                  onPress={open}
                />
              )}
              <input {...getInputProps()} />
            </div>
            {image ? (
              <div className={styles.tools}>
                <input
                  name="scale"
                  type="range"
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  min="1"
                  max="2"
                  step="0.01"
                  defaultValue="1"
                />
                <Button
                  variant="gray-light"
                  size="sm"
                  icon="Rotate2"
                  onPress={() => setRotate((rotate - 90) % 360)}
                />
                <Button
                  variant="gray-light"
                  size="sm"
                  icon="RotateClockwise2"
                  onPress={() => setRotate((rotate + 90) % 360)}
                />
                <Button
                  variant="gray-light"
                  size="sm"
                  icon="Upload"
                  onPress={open}
                />
              </div>
            ) : null}
          </>
        )}
      </Dropzone>
    </div>
  );
}
