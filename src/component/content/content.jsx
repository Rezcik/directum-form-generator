import React, {useState} from 'react';
import styles from "./content.module.css"

export function Content({data}) {
    return (
        Form(data.form)
    );
}

function Form(data) {
    const [state, setState] = useState(false);

    return (
        <form name={data.name} onSubmit={() => setState(true)}>
            {data.items?.map(item => (
                renderTag({item, data})
            ))}

            {
                state ?
                renderDefault(data.postmessage) : ''
            }
        </form>
    )

}
function renderText({params, text, label}) {
    return (
        <div className={styles.item}>
            {
                renderLabel(label)
            }
            {
                React.createElement('input', params, text)
            }
        </div>
    )
}

function renderCheckbox({params, text, label}) {
    return (
        <div className={styles.item}>
            {
                renderLabel(label)
            }
            {
                React.createElement('input', params, text)
            }
        </div>
    )
}


function renderRadio({params, items}) {
    return (
        <div className={styles.item}>
            {items.map(item => (
                <div key={item.id}>
                    {React.createElement('input', {name: params.name,  value: item.value, type: 'radio'})}
                    {renderLabel(item.label)}
                </div>
            ))}
        </div>
    )
}

function renderSelect({params, label, options}) {
    return (
        <div className={styles.item}>
            {
                renderLabel(label)
            }
            {
                React.createElement('select', params,
                    options.map(option => (
                        React.createElement('option', {value: option.value, key: option.id}, option.text)
                    ))
                )
            }
        </div>
    )
}

function renderTextarea({params, label}) {
    return (
        <div className={styles.item}>
            {
                renderLabel(label)
            }
            {
                React.createElement('textarea', params)
            }
        </div>
    )
}


function renderDefault(elem) {
    return <div dangerouslySetInnerHTML={{__html: elem}}/>
}

function renderButton({params, text}) {
    return React.createElement("button", {params}, text)
}

function renderLabel(label) {
    return React.createElement("label", {}, label)
}

function renderTag({item}) {

    let text = item.text;
    let label = item.label;
    let options = item.options;
    let items = item.items;

    let params = {
        name: item.name,
        type: item.type,
        required: item.required,
        placeholder: item.placeholder,
        disabled: item.disabled,
        className: item.class,
    }

    switch (item.type) {
        case "text" : return renderText({params, text, label})
        case "checkbox" : return renderCheckbox({params, text, label})
        case "select" : return renderSelect({params, text, label, options})
        case "radio" : return renderRadio({params, text, label, items})
        case "button" : return renderButton({params, text})
        case "textarea" : return renderTextarea({params, label})
        case "filler" : return  renderDefault(item.message);
    }
}
