import React, {ChangeEvent, useState,KeyboardEvent} from 'react';

type AddItemFormType = {
    addItem: (title: string) => void
}

export  const AddItemForm = (props: AddItemFormType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle)
        }else{
            setError(true)
        }
        setTitle('')
    }
    const onEnterAddItem = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            addItem()
        }
    }

    return (
        <div>
            {error
                ? <input value={''} onChange={setLocalTitle} onKeyDown={onEnterAddItem}/>
                : <input value={title} onChange={setLocalTitle} onKeyDown={onEnterAddItem}/>}
            <button onClick={addItem}>Add</button>
        </div>
    );
};
