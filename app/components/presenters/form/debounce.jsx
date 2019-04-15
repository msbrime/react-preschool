import React from 'react';
import { debounce } from 'util.js';

function debounceHandlers(handlers, timeouts){
    for(let handler in handlers){
        let timeout = timeouts[handler] || 500;
        handlers[handler] = applyDebounce(handlers[handler], timeout)
    }    

    return handlers;
}

function applyDebounce(handler,timeout){
    let debouncedHandler = debounce(handler, timeout);
    return event => {
        event.persist();
        debouncedHandler(event);
    }
}

export default function DebounceInput(props){
    let 
        {timeouts={}, ...handlers} = props,
        newHandlers = debounceHandlers(handlers, timeouts);
    
    return React.Children.map(props.children, child => {
       return React.cloneElement(child,newHandlers,null);
    });
}