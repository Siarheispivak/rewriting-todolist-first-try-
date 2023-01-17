import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const setLocalTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value)
    }
    const switchOnEditMode = () => {
        setIsEditMode(true)
    }
    const switchOffEditMode = () => {
        setIsEditMode(false)
        props.changeTitle(title)
    }
    const onKeyDownSwitchOffEditMode = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        e.key === 'Enter' && switchOffEditMode()
    }
    return (
        isEditMode
            ? <textarea value={title}
                        onChange={setLocalTitle}
                        onBlur={switchOffEditMode}
                        onKeyDown={onKeyDownSwitchOffEditMode}
                        autoFocus
            /> :
            <span onDoubleClick={switchOnEditMode}>{props.title}</span>
    );
};

