function EventObserver() {
    this.observers = [];
}

EventObserver.prototype = {
    subscribe: function(fn) {
        this.observers.push(fn);
        console.log(`you are now subscribed to ${fn.name}`);
    },
    unsubscribe: function(fn) {
        // filter out from the list whatever matches the callback function. If there is no match, the callback gets to stay on the list. The filter returns a nea list and reassigns the list of observers.
        this.observers = this.observers.filter(function(item) {
            if (item !== fn) {
                return item;
            }
        });
        console.log(`You are now unsubscribed from ${fn.name}`);
    },
    fire: function() {
        this.observers.forEach(element => {
            element.call();
        });
    }
}

const click = new EventObserver();

// event listeners
document.querySelector('.sub-ms').addEventListener('click', function() {
    click.subscribe(getCurMilliseconds);
});

document.querySelector('.unsub-ms').addEventListener('click', function() {
    click.unsubscribe(getCurMilliseconds);
});

document.querySelector('.fire').addEventListener('click', function() {
    click.fire();
});

// click handler
const getCurMilliseconds = function() {
    console.log(`current milliseconds: ${new Date().getMilliseconds()}`);
}