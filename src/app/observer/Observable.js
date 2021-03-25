const vetorObservers = []

class Observable{    
    subscribe(observers) {
        observers.forEach(observer => {
            if (!vetorObservers.includes(observer)) {
                vetorObservers.push(observer);
            }
        });
    }

    unsubscribe(observer) {
        const observerIndex = this.vetorObservers.indexOf(observer);
        if (observerIndex !== -1) {
            vetorObservers.splice(observerIndex, 1);
        }
    }
    
    notify() {
        vetorObservers.forEach(observer => {
            observer.chamaObserver(observer)
        });
    }
}
export default Observable;